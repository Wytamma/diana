import { createBlobURL } from '$lib/utils/utils';
import { derived, writable } from 'svelte/store';
import Aioli from "@biowasm/aioli";

export  interface TAData {
    raw: Map<string, number[]>,
    url?: string,
    indexUrl?: string,
}


/**
 * Converts a Map of TA sites to BED format.
 * @param taMap A Map where keys are sequence names and values are arrays of TA site indices.
 * @returns A string representing the content of a BED file.
 */
function taMapToBed(taMap: Map<string, number[]>): string {
    // Array to hold the lines of the BED file.
    const bedLines: string[] = [];
  
    // Iterate over each sequence name and its corresponding TA indices.
    taMap.forEach((indices, sequenceName) => {
      // For each index, create a BED line.
      indices.forEach((start) => {
        // BED is 0-based, so start position is used directly.
        // Since TA sites are 2 bases long, the end position is start + 2.
        const end = start + 2;
        // Create a BED line in the format: sequenceName  start  end.
        const bedLine = `${sequenceName}\t${start}\t${end}`;
        bedLines.push(bedLine);
      });
    });
  
    // Join all lines with newline characters to form the BED file content.
    return bedLines.join('\n');
  }
  

function createTAStore() {
  // Create a writable store that holds a Map where keys are sequence names and values are arrays of TA site indices.
  const defaultTAData: TAData = {raw: new Map()};
  const { subscribe, set, update } = writable<TAData>(defaultTAData);

  return {
    subscribe,
    set,
    update,
    reset: () => set(defaultTAData),

    // Function to process multiple FASTA sequences.
    load: async (fasta: string) => {
      const lines: string[] = fasta.split('\n');
      let currentSequenceName = '';
      let currentSequence = '';
      const sequenceMap = new Map<string, string>();

      // Parse the FASTA content.
      for (const line of lines) {
        if (line.startsWith('>')) {
          // If we're starting a new sequence, store the previous one.
          if (currentSequenceName && currentSequence) {
            sequenceMap.set(currentSequenceName, currentSequence);
          }
          // Start a new sequence.
          currentSequenceName = line.substring(1).trim(); // Get the sequence name from the header.
          currentSequence = '';
        } else {
          currentSequence += line.trim(); // Accumulate sequence lines.
        }
      }

      // Add the last sequence if present.
      if (currentSequenceName && currentSequence) {
        sequenceMap.set(currentSequenceName, currentSequence);
      }

      // Create a new map to store TA site indices for each sequence.
      const taMap = new Map<string, number[]>();

      // Iterate over each sequence to find TA indices.
      sequenceMap.forEach((sequence, name) => {
        const taIndices: number[] = [];
        for (let i = 0; i < sequence.length - 1; i++) {
          if (sequence[i] === 'T' && sequence[i + 1] === 'A') {
            taIndices.push(i);
          }
        }
        taMap.set(name, taIndices);
      });
      
      const bedFile = taMapToBed(taMap);
      console.log(bedFile);
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
            name: 'data.bed',
            data: bedFile
        }]);
        await CLI.exec(`bgzip ${paths[0]}`);
        await CLI.exec(`tabix -p bed ${paths[0]}.gz`);
        const bgzipFileStat = await CLI.fs.stat(`${paths[0]}.gz`);
        const bgzipFile = await CLI.read({path:`${paths[0]}.gz`, length: bgzipFileStat.size});
        const url = createBlobURL(bgzipFile);
        const indexFileStat = await CLI.fs.stat(`${paths[0]}.gz.tbi`);
        const indexFile = await CLI.read({path:`${paths[0]}.gz.tbi`,  length: indexFileStat.size});
        const indexUrl = createBlobURL(indexFile);
        // Update the store with the new map.
        set({raw: taMap, url: url, indexUrl: indexUrl});
    }
  };
}

export const taStore = createTAStore();

export const taBed = derived(taStore, ($taStore) => {
    return $taStore
});