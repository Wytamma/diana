import { derived, writable } from 'svelte/store';

export interface InsertCountData {
    isControl: boolean
    wig: string;
    total: number[];

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
            if (filename.toLowerCase().includes("0")) {
                data.isControl = true;
            }
            update((store) => {
                store.set(filename, data);
                return store;
            });
        },
        remove: (name: string) => update((store) => {
            store.delete(name);
            return store;
        }),
        setIsControl: (name: string, value: boolean) => update((store) => {
            const data = store.get(name);
            if (data) {
                data.isControl = value;
            }
            return store;
        }),
        containsControlAndCondition: () => {
            let control = false;
            let condition = false;
            subscribe((store) => {
                store.forEach((data) => {
                    console.log(data.isControl);
                    if (data.isControl) {
                        control = true;
                    } else {
                        condition = true;
                    }
                });
            });
            return control && condition;
        }
    };
}

// Helper function to parse text in smaller chunks to avoid freezing the main thread.
async function parseTextInChunks(text: string, chunkSize: number = 50000): Promise<InsertCountData> {
    const lines = text.split('\n');
    const wigArray: string[] = [];
    const data: InsertCountData = {
        wig: '',
        // preallocate the array to avoid resizing
        total: [],
        isControl: false,
    };
    wigArray.push('track type=wiggle_0 visibility=full autoScale=on color=255,150,0 yLineMark=0 yLineOnOff=on');
    wigArray.push('variableStep chrom=chrom span=2');

    for (let i = 0; i < lines.length; i += chunkSize) {
        // Slice a chunk of lines
        const chunk = lines.slice(i, i + chunkSize);

        // Process each chunk synchronously to avoid creating too many promises
        chunk.forEach((line, index) => {
            const [plus, minusValue] = line.split(/\s+/).map((x) => parseInt(x, 10));
            let minus = minusValue;
            // if minus undefined, set to 0 (some files only have one number)
            if (isNaN(minus)) minus = 0;
            data.total.push(plus + minus);
            if (plus !== 0)
                wigArray.push(`${i + index} ${plus}`);
            if (minus !== 0)
                wigArray.push(`${i + index} -${minus}`);
        });
        
        // Yield control back to the main thread every chunk to keep the UI responsive.
        await new Promise((resolve) => setTimeout(resolve, 0));
    }
    data.wig = wigArray.join('\n');
    return data
}

export const insertStore = createInsertStore();
export const containsControlAndCondition = derived(insertStore, ($insertStore) => {
    let control = false;
    let condition = false;
    $insertStore.forEach((data) => {
        if (data.isControl) {
            control = true;
        } else {
            condition = true;
        }
    });
    return control && condition; 
});