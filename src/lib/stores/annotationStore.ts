import { writable, get } from 'svelte/store';
import Aioli from "@biowasm/aioli";
import { createBlobURL } from '../utils/utils';

export interface Feature {
    _id: number;
    seqId: string;
    source: string;
    type: string;
    start: number;
    stop: number;
    score: number;
    strand: "+" | "-";
    phase: number;
    attributes: { [key: string]: string | undefined };
}

interface Chromosome {
    name: string;
    length: number;
}

export interface AnnotationData {
    filename?: string;
    features: Feature[];
    chromosomes: Map<string, Chromosome>;
    filteredFeatures: Feature[];
    // Store our computed URLs here:
    url?: string;
    indexUrl?: string;
}

/**
 * Sorts GFF (General Feature Format) data by the first column (sequence ID)
 * and the fourth column (start position). Header lines are preserved at the top.
 */
function sortGff(gffData: string): string {
    const lines = gffData.split('\n');
    const headerLines: string[] = [];
    const dataLines: string[] = [];

    for (const line of lines) {
        if (line.startsWith('#')) {
            headerLines.push(line);
        } else if (line.trim() !== '') {
            dataLines.push(line);
        }
    }

    dataLines.sort((a, b) => {
        const aCols = a.split('\t');
        const bCols = b.split('\t');
        const col1Comparison = aCols[0].localeCompare(bCols[0]);
        if (col1Comparison !== 0) return col1Comparison;
        return Number.parseInt(aCols[3], 10) - Number.parseInt(bCols[3], 10);
    });

    return [...headerLines, ...dataLines].join('\n');
}

/**
 * Removes any FASTA section from the GFF data.
 */
function removeFasta(gffData: string): string {
    const lines: string[] = gffData.split('\n');
    const result: string[] = [];
    for (const line of lines) {
        if (line.startsWith('##') && line.includes('FASTA')) {
            break;
        }
        result.push(line);
    }
    return result.join('\n');
}

/**
 * Generates URLs for the filtered features.
 */
async function generateFilteredUrls(filteredFeatures: Feature[]): Promise<{ url: string | undefined; indexUrl: string | undefined }> {
    if (!filteredFeatures.length) return { url: undefined, indexUrl: undefined };

    const CLI = await new Aioli([
        { tool: "tabix", version: "1.17", urlPrefix: `${window.location.origin}${import.meta.env.BASE_URL || ''}tools/tabix` },
        { tool: "bgzip", version: "1.17", urlPrefix: `${window.location.origin}${import.meta.env.BASE_URL || ''}tools/bgzip` }
    ]);
    console.log('Generating filtered annotation URLs...');
    console.log(filteredFeatures);

    const filteredData = filteredFeatures.map(feature =>
        `${feature.seqId}\t${feature.source}\t${feature.type}\t${feature.start}\t${feature.stop}\t${feature.score}\t${feature.strand}\t${feature.phase}\t` +
        Object.entries(feature.attributes)
              .map(([key, value]) => `${key}=${value}`)
              .join(';')
    ).join('\n');

    const paths = await CLI.mount([{ name: 'filtered_data.gff', data: filteredData }]);
    await CLI.exec(`bgzip ${paths[0]}`);
    await CLI.exec(`tabix -p gff ${paths[0]}.gz`);

    const bgzipFile = await CLI.read({
        path: `${paths[0]}.gz`,
        length: (await CLI.fs.stat(`${paths[0]}.gz`)).size
    });
    const indexFile = await CLI.read({
        path: `${paths[0]}.gz.tbi`,
        length: (await CLI.fs.stat(`${paths[0]}.gz.tbi`)).size
    });
    console.log('Done generating filtered annotation URLs');
    const url = createBlobURL(bgzipFile);
    const indexUrl = createBlobURL(indexFile);
    console.log({ url, indexUrl });
    return { url, indexUrl };
}

/**
 * Creates the annotation store.
 * We add a new async method `setFilteredFeatures` which filters the features
 * and then updates the URLs after generating them asynchronously.
 */
export function createAnnotationStore() {
    const defaultAnnotationData: AnnotationData = { features: [], chromosomes: new Map(), filteredFeatures: [] };
    // Save the writable store instance in a variable so we can call get() on it later.
    const annotationWritable = writable<AnnotationData>(defaultAnnotationData);
    const { subscribe, set, update } = annotationWritable;

    return {
        subscribe,
        set,
        update,
        reset: () => set(defaultAnnotationData),
        load: async (filename: string, text: string) => {
            text = removeFasta(text);
            text = sortGff(text);
            const lines = text.split('\n');
            const features: Feature[] = [];
            const chromosomes: Map<string, Chromosome> = new Map();
            let currentId = 0;
            for (const line of lines) {
                if (line.startsWith('##') && line.includes('FASTA')) break;
                if (!line.startsWith('#') && line.trim() !== '') {
                    const [seqId, source, type, start, stop, score, strand, phase, attributeString] = line.split('\t');
                    const attributes: { [key: string]: string | undefined } =
                        Object.fromEntries(attributeString.split(';').map(attr => attr.split('=')));
                    if (strand !== '+' && strand !== '-') throw new Error(`Invalid strand value: ${strand}`);
                    if (!chromosomes.has(seqId)) {
                        chromosomes.set(seqId, { name: seqId, length: Number.parseInt(stop) });
                    }
                    const chrom = chromosomes.get(seqId);
                    if (chrom && Number.parseInt(stop) > chrom.length) {
                        chrom.length = Number.parseInt(stop);
                    }
                    features.push({
                        _id: currentId++,
                        seqId,
                        source,
                        type,
                        start: Number.parseInt(start),
                        stop: Number.parseInt(stop),
                        score: Number.parseFloat(score),
                        strand,
                        phase: Number.parseInt(phase),
                        attributes
                    });
                }
            }
            // Generate the URLs for the full set of features.
            const { url, indexUrl } = await generateFilteredUrls(features);
            // When loading, we set filteredFeatures to all features.
            set({ features, chromosomes, filteredFeatures: features, filename, url, indexUrl });
        },
        /**
         * Filters features based on filterFn and then regenerates the URLs.
         */
        setFilteredFeatures: async (featureIds: number[]) => {
            // First, update the store with the filtered features.
            update(store => {
                store.filteredFeatures = store.features.filter(feature => featureIds.includes(feature._id));
                // Clear out the URLs before computing new ones.
                store.url = undefined;
                store.indexUrl = undefined;
                return store;
            });

            // Now, get the updated store value.
            const storeData = get(annotationWritable);

            // Generate the URLs based on the new filteredFeatures.
            const { url, indexUrl } = await generateFilteredUrls(storeData.filteredFeatures);

            // Finally, update the store with the new URLs.
            update(store => {
                store.url = url;
                store.indexUrl = indexUrl;
                return store;
            });
        },
        selectAll: () => {
            update(store => {
                if (store.features.length === store.filteredFeatures.length) {
                    store.filteredFeatures = [];
                } else {
                    store.filteredFeatures = store.features;
                }
                return store;
            });
        },
    };
}

// Create the store instance.
export const annotationStore = createAnnotationStore();
