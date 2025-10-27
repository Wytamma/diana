// src/lib/stores/igvStore.ts
import { writable } from 'svelte/store';

export interface IgvConfig {
  locus?: string;
}

export const igvStore = writable<IgvConfig>({
  locus: undefined
});
