import { writable } from 'svelte/store';

export interface InsertCountData {
    wig: string;
    insertions: InsertCountDataPoint[];

}

export interface InsertCountDataPoint {
    loc: number;
    plus: number;
    minus: number;
}

function createInsertStore() {
    const { subscribe, set, update } = writable<Map<string, InsertCountData>>(new Map());

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
async function parseTextInChunks(text: string, chunkSize: number = 50000): Promise<InsertCountData> {
    const lines = text.split('\n');
    const wigArray: string[] = [];
    const data: InsertCountData = {
        wig: '',
        insertions: [],
    };
    wigArray.push('track type=wiggle_0 visibility=full autoScale=on color=255,150,0 yLineMark=0 yLineOnOff=on');
    wigArray.push('variableStep chrom=chrom span=2');

    for (let i = 0; i < lines.length; i += chunkSize) {
        // Slice a chunk of lines
        const chunk = lines.slice(i, i + chunkSize);

        // Process each chunk synchronously to avoid creating too many promises
        chunk.forEach((line, index) => {
            const [plus, minus] = line.split(/\s+/).map((x) => parseInt(x, 10));
            if (plus !== 0 || minus !== 0)
                data.insertions.push({ loc: i + index, plus, minus });
            if (plus !== 0)
                wigArray.push(`${i + index} ${plus}`);
            if (minus !== 0)
                wigArray.push(`${i + index} -${minus}`);
        });
        console.log(i);
        
        // Yield control back to the main thread every chunk to keep the UI responsive.
        await new Promise((resolve) => setTimeout(resolve, 0));
    }
    data.wig = wigArray.join('\n');
    return data
}

export const insertStore = createInsertStore();
