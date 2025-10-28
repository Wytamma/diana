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
  let isErrored = false;
  let errorMessage: null | string = null;

  const insertEntries = Array.from($insertStore.entries());

  let controlData = insertEntries
    .filter(([_, data]) => !data.isTreatment)
    .map(([_, data]) => data.chromosomes);

  let treatmentData = insertEntries
    .filter(([_, data]) => data.isTreatment)
    .map(([_, data]) => data.chromosomes);

  $: if (controlData.length > 1 && treatmentData.length > 1) {
    calculateComparisonResults();
  }

  async function calculateComparisonResults() {
    const controlGeneInserts = await Promise.all(
      controlData.map((data) => generateGeneInsertSites($annotationStore.filteredFeatures, data))
    );

    const treatmentGeneInserts = await Promise.all(
      treatmentData.map((data) => generateGeneInsertSites($annotationStore.filteredFeatures, data))
    );

    try {
      comparisonResults = await compareGeneInsertSites(controlGeneInserts, treatmentGeneInserts);
    } catch (error: any) {
      console.error(error);
      const message = `An error occurred while comparing gene insert sites. ${error.message}`;
      const t: ToastSettings = {
        message: message,
        background: 'variant-glass-error'
      };
      toastStore.trigger(t);
      isErrored = true;
      // check if error message contains the error message from the server
      if (error.message.includes('dispersions must be finite non-negative values')) {
        errorMessage =
          'Could not estimate dispersion for the data. Please increase the number of replicates or adjust the data.';
      }
    }
    tableData = [...comparisonResults]; // Ensures tableData updates reactively
  }

  const filterData = (data: number[]) => {
    if (data.length === 0) {
      tableData = comparisonResults;
      return;
    }
    // for each result in comparisonResults, check if the id is in the data array
    tableData = comparisonResults.filter((result) => data.includes(result.id));
  };
</script>

<div class="m-4">
  <div class="mb-4">
    <h1 class="h1 mb-1">Compare gene insert sites</h1>
    <p>
      Perform edgeR differential expression analysis to compare the gene insert sites between your
      control and treatment datasets.
    </p>
  </div>
  <div class="mb-4">
    {#if isErrored}
      <div class="block card p-4 variant-ghost-error">
        <p class="font-bold">
          An error occurred while comparing gene insert sites. Please try again.
        </p>
        <p>{errorMessage ? errorMessage : ''}</p>
      </div>
    {:else if controlData.length < 2 || treatmentData.length < 2}
      <div class="block card p-4 variant-ghost-error">
        <p class="font-bold">Insufficient replicates</p>
        <p>
          Please use the <a class="anchor" href="/">Data Panel</a> to ensure that you have at least
          two control and two treatment datasets to perform a valid comparison.
        </p>
      </div>
    {:else}
      <Plot {comparisonResults} {filterData} />
    {/if}
  </div>
  <div>
    {#if tableData.length > 0}
      <GeneDataTable comparisonResults={tableData} />
    {/if}
  </div>
</div>
