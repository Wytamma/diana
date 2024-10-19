import { derived, writable } from 'svelte/store';
import { createBlobURL } from '../utils/utils'
import Aioli from "@biowasm/aioli";

export interface ReferenceData {
    name?: string;
    text?: string;
    url?: string;
    indexUrl?: string;
}

export function createReferenceStore() {
    // Create a writable store to hold the gene data
    const defaultReferenceData: ReferenceData = {text: undefined, url: undefined, indexUrl: undefined, name: undefined};
    const { subscribe, set, update } = writable<ReferenceData>(defaultReferenceData);

    return {
        subscribe: subscribe,
        set: set,
        update: update,
        reset: () => set(defaultReferenceData),
        load: async (name:string, fastaText: string) => {
            const CLI = await new Aioli(["samtools/1.17"]);
            const paths = await CLI.mount([{
                name: "fasta.fa",
                data: fastaText
            }]);
            await CLI.exec(`samtools faidx --output fasta.fa --fai-idx fasta.fai ${paths[0]}`);
            const fastaFileStat = await CLI.fs.stat("fasta.fa");
            const fastaFile = await CLI.read({path:"fasta.fa", length: fastaFileStat.size});
            const url = createBlobURL(fastaFile);
            const indexFileStat = await CLI.fs.stat("fasta.fai");
            const indexFile = await CLI.read({path:"fasta.fai", length: indexFileStat.size});
            const indexUrl = createBlobURL(indexFile);
            set({name: name, text: fastaText, url: url, indexUrl: indexUrl});
        },
    };
}

// Create a writable store to hold the gene data
export const referenceStore = createReferenceStore();