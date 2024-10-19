import { derived, writable } from 'svelte/store';

import Aioli from "@biowasm/aioli";
import { createBlobURL } from '../utils/utils';

function sortGff(gffData: string): string {
    // Split content into lines
    const lines: string[] = gffData.split('\n');

    // Separate header lines and data lines
    const headerLines: string[] = [];
    const dataLines: string[] = [];

    for (const line of lines) {
        if (line.startsWith('#')) {
            headerLines.push(line);
        } else if (line.trim() !== '') {
            dataLines.push(line);
        }
    }

    // Sort the data lines based on the first column (alphanumeric) and fourth column (numeric)
    dataLines.sort((a, b) => {
        const aCols: string[] = a.split('\t');
        const bCols: string[] = b.split('\t');
        const col1Comparison: number = aCols[0].localeCompare(bCols[0]);
        if (col1Comparison !== 0) {
            return col1Comparison;
        }
        // Ensure numeric comparison for the fourth column
        const col4Comparison: number = Number.parseInt(aCols[3], 10) - Number.parseInt(bCols[3], 10);
        return col4Comparison;
    });

    // Combine header lines and sorted data lines
    const result: string = [...headerLines, ...dataLines].join('\n');

    return result;
}

export function getAssembly(gffData: string): [string, number] {
    const lines: string[] = gffData.split('\n');
    for (const line of lines) {
        if (line.startsWith('##sequence-region')) {
            // split the line by whitespace
            const parts: string[] = line.split(/\s+/);
            const chromosome: string = parts[1];
            const chromosomeLength: number = Number.parseInt(parts[3], 10);
            return [chromosome, chromosomeLength];
        }
    }
    throw new Error('Could not find the assembly information in the GFF file');
}

function removeFasta(gffData: string): string {
    const lines: string[] = gffData.split('\n');
    const result: string[] = [];
    for (const line of lines) {
        if (line.startsWith('##FASTA')) {
            break;  
        }
        result.push(line);
    }
    return result.join('\n');
}

export interface Feature {
    seqname: string;
    source: string;
    type: string;
    start: number;
    end: number;
    score: number;
    strand: "+" | "-";
    frame: number;
    // Attributes key value pairs
    attributes: { [key: string]: string};
}

export interface Chromosome {
    name: string;
    length: number;
}

export interface AnnotationData {
    features: Feature[];
    chromosomes: Chromosome[];
    url?: string;
    indexUrl?: string;
}

export function createAnnotationStore() {
    // Create a writable store to hold the gene data
    const defaultAnnotationData: AnnotationData = {features: [], chromosomes: []};
    const { subscribe, set, update } = writable<AnnotationData>(defaultAnnotationData);

    return {
        subscribe: subscribe,
        set: set,
        update: update,
        reset: () => set(defaultAnnotationData),
        addGene: (gene: Feature) => update((store) => {
            store.features.push(gene);
            return store;
        }),
        addChromosome: (chromosome: Chromosome) => update((store) => {
            store.chromosomes.push(chromosome);
            return store;
        }),
        load: async (text: string) => {
            // Load from GFF3 text file format
            const lines = text.split('\n');
            const features: Feature[] = [];
            const chromosomes: Chromosome[] = [];
            for (const line of lines) {
                if (line.startsWith('##FASTA')) {
                    // Do nothing
                    break;
                }
                if (line.startsWith('##sequence-region')) {
                    const [ , name, , end] = line.split(/\s+/);
                    if (name === undefined || end === undefined) {
                        throw new Error(`Invalid sequence-region line: ${line}`);
                    }
                    chromosomes.push({name, length: Number.parseInt(end)});
                } else if (!line.startsWith('#')) {
                    const [seqname, source, type, start, end, score, strand, frame, attributeString] = line.split('\t');
                    const attributes: { [key: string]: string } = {};
                    for (const attr of attributeString.split(';')) {
                        const [key, value] = attr.split('=');
                        attributes[key] = value;
                    }
                    if (strand !== "+" && strand !== "-") {
                        throw new Error(`Invalid strand value: ${strand}`);
                    }
                    features.push({seqname, source, type, start: Number.parseInt(start), end: Number.parseInt(end), score: Number.parseFloat(score), strand, frame: Number.parseInt(frame), attributes: attributes});
                }
            }
            const filteredData = removeFasta(text);
            const removeCDS = filteredData.replaceAll(' CDS', '');
            const processedData = sortGff(removeCDS); 
            const CLI = await new Aioli([
            {
                tool: "tabix",
                version: "1.17",
                urlPrefix: `${window.location.origin}${import.meta.env.BASE_URL || ''}tools/tabix`
            },
            {
                tool: "bgzip",
                version: "1.17",
                urlPrefix: `${window.location.origin}${import.meta.env.BASE_URL || ''}tools/bgzip`
            }
            ]);
            const paths = await CLI.mount([{
                name: 'data.gff',
                data: processedData
            }]);
            await CLI.exec(`bgzip ${paths[0]}`);
            await CLI.exec(`tabix -p gff ${paths[0]}.gz`);
            const bgzipFileStat = await CLI.fs.stat(`${paths[0]}.gz`);
            const bgzipFile = await CLI.read({path:`${paths[0]}.gz`, length: bgzipFileStat.size});
            const url = createBlobURL(bgzipFile);
            const indexFileStat = await CLI.fs.stat(`${paths[0]}.gz.tbi`);
            const indexFile = await CLI.read({path:`${paths[0]}.gz.tbi`,  length: indexFileStat.size});
            const indexUrl = createBlobURL(indexFile);
            set({features, chromosomes, url, indexUrl});
        }
    };
}

// Create a writable store to hold the gene data
export const annotationStore = createAnnotationStore();

export const geneStore = derived(annotationStore, ($gffStore) => {
    return {
        features: $gffStore.features.filter(feature => feature.type === 'gene'),
        chromosomes: $gffStore.chromosomes
    };
});

export const geneNames = derived(annotationStore, ($gffStore) => {
    return $gffStore.features.map(feature => feature.attributes.Name).filter(name => name !== undefined);
});