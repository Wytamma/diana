<script lang="ts">
    import { insertStore } from '$lib/stores/insertStore';
    import Plot from './Plot.svelte';
</script>

<div class="m-4">
    <div class="mb-4">
        <h1 class="h1 mb-1">Chromosomal location bias</h1>   
        <p>Explore the chromosomal location bias of the insertions in your dataset. For more detailed analysis and bias correction see <a class="anchor" href="https://github.com/BarquistLab/ChromoCorrect" target="_blank">ChromoCorrect</a>.</p>
    </div>
    <!-- Responsive grid: 1 column on small screens, 2 columns on large screens -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <!-- Loop through filenames and data to generate a plot div for each -->
        {#each $insertStore as [filename, insertData], index}
            <Plot filename={filename} data={insertData.chromosomes} />
        {/each}
    </div>
</div>
