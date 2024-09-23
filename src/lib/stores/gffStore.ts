import { derived, writable } from 'svelte/store';

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

export interface GFFData {
    features: Feature[];
    chromosomes: Chromosome[];
}

export function createGffStore() {
    // Create a writable store to hold the gene data
    const { subscribe, set, update } = writable<GFFData>({features: [], chromosomes: []});

    return {
        subscribe: subscribe,
        set: set,
        update: update,
        reset: () => set({features: [], chromosomes: []}),
        addGene: (gene: Feature) => update((store) => {
            store.features.push(gene);
            return store;
        }),
        addChromosome: (chromosome: Chromosome) => update((store) => {
            store.chromosomes.push(chromosome);
            return store;
        }),
        fromText: (text: string) => {
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
            set({features, chromosomes});
        }
    };
}

// Create a writable store to hold the gene data
export const gffStore = createGffStore();

export const geneStore = derived(gffStore, ($gffStore) => {
    return {
        features: $gffStore.features.filter(feature => feature.type === 'gene'),
        chromosomes: $gffStore.chromosomes
    };
});

export const geneNames = derived(gffStore, ($gffStore) => {
    return $gffStore.features.map(feature => feature.attributes.Name).filter(name => name !== undefined);
});