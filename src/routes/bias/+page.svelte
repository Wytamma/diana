<script lang="ts">
    import { insertStore } from '$lib/stores/insertStore';
    import Plot from './Plot.svelte';
</script>

<div class="m-4">
    <!-- Responsive grid: 1 column on small screens, 2 columns on large screens -->
    <div class="grid grid-cols-1 2xl:grid-cols-2 gap-4">
        <!-- Loop through filenames and data to generate a plot div for each -->
        {#each $insertStore as [filename, insertData], index}
            <div class="m-4">
                <Plot filename={filename} data={insertData.chromosomes} />
            </div>
        {/each}
    </div>
</div>
