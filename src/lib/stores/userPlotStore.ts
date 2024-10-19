import { createBlobURL } from '$lib/utils/utils';
import { writable } from 'svelte/store';

export interface ReadCountDataPoint {
    plus: number;
    minus: number;
}

function createUserPlotStore() {
    const { subscribe, set, update } = writable<Map<string, string>>(new Map());

    return {
        subscribe,
        set,
        update,
        reset: () => set(new Map()),
        load: async (filename: string, text: string) => {
            // Process the text in chunks to prevent freezing.
            const data = await parseTextInChunks(text);
            // Update the store once parsing is complete.
            console.log(data);
            
            update((store) => {
                store.set(filename, data);
                return store;
            });
        },
        remove: (name: string) => update((store) => {
            store.delete(name);
            return store;
        }),
    };
}

// let text = `track type=wiggle_0 visibility=full autoScale=on color=255,150,0 yLineMark=0 yLineOnOff=on
// variableStep chrom=1 span=2
// 701 10.0
// 701 -10.0
// 901 12.5
// 401 15.0
// 601 17.5
// 901 20.0
// 081 17.5
// 301 15.0
// 691 12.5
// 871 10.0`;

// Helper function to parse text in smaller chunks to avoid freezing the main thread.
async function parseTextInChunks(text: string, chunkSize: number = 50000): Promise<string> {
    const lines = text.split('\n');
    const data: string[] = [];
    data.push('track type=wiggle_0 visibility=full autoScale=on color=255,150,0 yLineMark=0 yLineOnOff=on');
    data.push('variableStep chrom=chrom span=2');
    for (let i = 0; i < lines.length; i += chunkSize) {
        // Slice a chunk of lines
        const chunk = lines.slice(i, i + chunkSize);

        // Process each chunk synchronously to avoid creating too many promises
        chunk.forEach((line, index) => {
            const [plus, minus] = line.split(/\s+/).map((x) => parseInt(x, 10));
            if (plus !== 0)
                data.push(`${i + index} ${plus}`);
            if (minus !== 0)
                data.push(`${i + index} -${minus}`);
        });
        console.log(i);
        
        // Yield control back to the main thread every chunk to keep the UI responsive.
        await new Promise((resolve) => setTimeout(resolve, 0));
    }
    return data.join('\n');
}

export const userPlotStore = createUserPlotStore();
