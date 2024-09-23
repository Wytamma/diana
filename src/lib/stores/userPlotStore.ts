import { writable } from 'svelte/store';

export interface ReadCountDataPoint {
    plus: number;
    minus: number;
}

function createUserPlotStore() {
    const { subscribe, set, update } = writable<Map<string, ReadCountDataPoint[]>>(new Map());

    return {
        subscribe: subscribe,
        set: set,
        update: update,
        reset: () => set(new Map()),
        addData: (filename: string, data: ReadCountDataPoint[]) => update((store) => {
            store.set(filename, data);
            return store;
        }),
        addDataPoint: (filename: string, dataPoint: ReadCountDataPoint) => update((store) => {
            if (!store.has(filename)) {
                store.set(filename, []);
            }
            store.get(filename)?.push(dataPoint);
            return store;
        }),
        removeData: (filename: string) => update((store) => {
            store.delete(filename);
            return store;
        }),
    }
}


export const userPlotStore = createUserPlotStore();