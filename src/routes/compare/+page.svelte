<script lang="ts">
    import { insertStore } from '$lib/stores/insertStore';
    import { annotationStore } from '$lib/stores/annotationStore';
    import { generateGeneInsertSites } from '$lib/utils/generateGeneInsertSites';
    import { compareGeneInsertSites, type CompareResults } from '$lib/utils/compareGeneInsertSites';
    import Plot from './Plot.svelte';
    import GeneDataTable from './GeneDataTable.svelte';
    import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

    const toastStore = getToastStore();

    let comparisonResults: CompareResults[] = [];
    let tableData: CompareResults[] = [];


    const insertEntries = Array.from($insertStore.entries());

    let controlData = insertEntries
        .filter(([_, data]) => !data.isTreatment)
        .map(([_, data]) => data.chromosomes);

    let treatmentData = insertEntries
        .filter(([_, data]) => data.isTreatment)
        .map(([_, data]) => data.chromosomes);

    $: if (controlData.length && treatmentData.length) {
        calculateComparisonResults();
    }

    async function calculateComparisonResults() {
        const controlGeneInserts = await Promise.all(
            controlData.map(data => generateGeneInsertSites($annotationStore.filteredFeatures, data))
        );

        const treatmentGeneInserts = await Promise.all(
            treatmentData.map(data => generateGeneInsertSites($annotationStore.filteredFeatures, data))
        );

        try {
            comparisonResults = await compareGeneInsertSites(controlGeneInserts, treatmentGeneInserts);
        } catch (error: any) {
            console.error(error);
            const message = `An error occurred while comparing gene insert sites. ${error.message}`;
            const t: ToastSettings = {
                message: message,
                background: 'variant-glass-error',
            };
            toastStore.trigger(t);
        }
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
    <div class="mb-4">
        <h1 class="h1 mb-1">Compare gene insert sites</h1>
        <p>Perform edgeR differential expression analysis to compare the gene insert sites between your control and treatment datasets.</p>
    </div>
    <div class="mb-4">
        <Plot {comparisonResults} {filterData} />
    </div>
    <div >
        {#if tableData.length > 0}
            <GeneDataTable comparisonResults={tableData} />
        {/if}
    </div>
</div>
