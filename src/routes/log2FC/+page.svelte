<script lang="ts">
    import { insertStore } from '$lib/stores/insertStore';
    import Plot from './Plot.svelte';

    let controlData: number[][] = [];
    let conditionData: number[][] = [];

    // Map insertStore entries to controlData and conditionData based on filename
    const insertEntries = Array.from($insertStore.entries());

    controlData = insertEntries
        .filter(([name, _]) => name.toLowerCase().includes("0"))
        .map(([_, data]) => data.total);

    conditionData = insertEntries
        .filter(([name, _]) => !name.toLowerCase().includes("0"))
        .map(([_, data]) => data.total);

</script>

<div class="m-4">
    <!-- Responsive grid: 1 column on small screens, 2 columns on large screens -->
    <div class="m-4">
        <Plot controlData={controlData} conditionData={conditionData} filename="log2FC" />
    </div>
</div>
