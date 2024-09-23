import { writable } from 'svelte/store';



function createTAStore() {
  const { subscribe, set, update } = writable<number[]>([])
    return {
        subscribe,
        set,
        update,
        reset: () => set([]),
        fromFasta: (fasta: string) => {
            const lines: string[] = fasta.split('\n');
            const sequences: string[] = [];
            for (const line of lines) {
                if (line.startsWith('>')) {
                    // Do nothing
                } else {
                    sequences.push(line.trim());
                }
            }
            // Convert the sequences to a single string
            const result: string = sequences.join('');
            // Find the index of all TA sites
            const taIndices: number[] = [];
            for (let i = 0; i < result.length - 1; i++) {
                if (result[i] === 'T' && result[i + 1] === 'A') {
                    taIndices.push(i);
                }
            }
            set(taIndices);
        }
    }
}

export const taStore = createTAStore();