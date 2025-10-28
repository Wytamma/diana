<script lang="ts">
  import IgvComponent from './IGV.svelte';
  import { referenceStore } from '$lib/stores/refStore';
</script>

{#if $referenceStore.url === undefined}
  <div class="m-4">
    <h1 class="h1 mb-1">Visualize insert data</h1>
    <p>To visualize your insertion data and annotations in the genome browser.</p>
  </div>
  <div class="block card p-4 m-4 variant-ghost-error">
    <p class="font-bold">No reference genome</p>
    <p>Please use the <a class="anchor" href="/">Data Panel</a> to add a reference genome.</p>
  </div>
{:else}
  <div class="h-full variant-filled-secondary !bg-white p-2">
    <IgvComponent />
  </div>
{/if}
