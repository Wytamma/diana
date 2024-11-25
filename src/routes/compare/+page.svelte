<script lang="ts">
    import { insertStore } from '$lib/stores/insertStore';
    import { annotationStore } from '$lib/stores/annotationStore';
    import { generateGeneInsertSites } from '$lib/utils/generateGeneInsertSites';
    import { compareGeneInsertSites, type CompareResults } from '$lib/utils/compareGeneInsertSites';
    import Plot from './Plot.svelte';
    import GeneDataTable from './GeneDataTable.svelte';

    let controlData: number[][] = [];
    let treatmentData: number[][] = [];
    let comparisonResults: CompareResults[] = [];
    let tableData: CompareResults[] = [];


    const insertEntries = Array.from($insertStore.entries());

    controlData = insertEntries
        .filter(([_, data]) => !data.isTreatment)
        .map(([_, data]) => data.total);

    treatmentData = insertEntries
        .filter(([_, data]) => data.isTreatment)
        .map(([_, data]) => data.total);

    $: if (controlData.length && treatmentData.length) {
        calculateComparisonResults();
    }

    async function calculateComparisonResults() {
        const controlGeneInserts = await Promise.all(
            controlData.map(data => generateGeneInsertSites($annotationStore.features, data, [], 0, 0))
        );

        const treatmentGeneInserts = await Promise.all(
            treatmentData.map(data => generateGeneInsertSites($annotationStore.features, data, [], 0, 0))
        );

        comparisonResults = await compareGeneInsertSites(controlGeneInserts, treatmentGeneInserts);

        tableData = [...comparisonResults]; // Ensures tableData updates reactively
    }

    const filterData = (data: string[]) => {
        if (data.length === 0) {
            tableData = comparisonResults;
            return;
        }
        tableData = comparisonResults.filter((result) => data.includes(result.name));
    };
</script>

<div class="m-4">
    <Plot {comparisonResults} {filterData} />
</div>
<div class="m-4">
    {#if tableData.length > 0}
        <GeneDataTable comparisonResults={tableData} />
    {/if}
</div>
