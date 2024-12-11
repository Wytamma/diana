import { derived, writable } from 'svelte/store';

export interface InsertCountData {
    isTreatment: boolean
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
        load: async (filename: string, wigFileText: string) => {
            // Process the text in chunks to prevent freezing.
            const data = await parseTextInChunks(wigFileText);
            // Update the store once parsing is complete.
            if (!filename.toLowerCase().includes("0")) {
                data.isTreatment = true;
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
        setIsTreatment: (name: string, value: boolean) => update((store) => {
            const data = store.get(name);
            if (data) {
                data.isTreatment = value;
            }
            return store;
        }),
        containsControlAndTreatment: () => {
            let control = false;
            let treatment = false;
            subscribe((store) => {
                store.forEach((data) => {
                    console.log(data.isTreatment);
                    if (data.isTreatment) {
                        control = true;
                    } else {
                        treatment = true;
                    }
                });
            });
            return control && treatment;
        }
    };
}

// Helper function to parse text in smaller chunks to avoid freezing the main thread.
async function parseTextInChunks(text: string, chunkSize: number = 50000): Promise<InsertCountData> {
    const lines = text.split('\n');
    const data: InsertCountData = {
        wig: text,
        total: [],
        isTreatment: false,
    };
    const totals: Map<number, number> = new Map();
    for (let i = 0; i < lines.length; i += chunkSize) {
        // Slice a chunk of lines
        const chunk = lines.slice(i, i + chunkSize);

        // Process each chunk synchronously to avoid creating too many promises
        chunk.forEach((line) => {
            const [position, total] = line.split(/\s+/).map((x) => parseInt(x, 10));
            totals.set(position, (totals.get(position) || 0) + Math.abs(total));
        });
        // Yield control back to the main thread every chunk to keep the UI responsive.
        await new Promise((resolve) => setTimeout(resolve, 0));
    }
    // convert totals to array where missing values are 0
    const maxPosition = Math.max(...Array.from(totals.keys()));
    for (let i = 0; i <= maxPosition; i++) {
        data.total.push(totals.get(i) || 0);
    }
    return data
}

export const insertStore = createInsertStore();
export const containsControlAndTreatment = derived(insertStore, ($insertStore) => {
    let control = false;
    let treatment = false;
    $insertStore.forEach((data) => {
        if (data.isTreatment) {
            control = true;
        } else {
            treatment = true;
        }
    });
    return control && treatment; 
});