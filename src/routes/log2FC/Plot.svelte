<script lang="ts">
  import type { CompareResults } from '$lib/utils/compareGeneInsertSites';
  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import Plotly from 'plotly.js-dist';
  import { onMount, onDestroy } from 'svelte';

  export let filename: string;
  export let comparisonResults: CompareResults[];
  export let filterData: (data: string[]) => void;

  let plotId = `plotly-${filename}`;
  let hasRendered = false;

  const resizePlot = () => {
    const plotElement = document.getElementById(plotId);
    if (plotElement) {
      Plotly.relayout(plotElement, {
        width: plotElement.clientWidth,
        height: plotElement.clientHeight
      });
    }
  };

  // Reactive variable to check if comparisonResults is loaded
  $: isLoading = comparisonResults.length === 0;

  // Reactive block to trigger the plot rendering only when comparisonResults is populated
  $: if (!isLoading && !hasRendered) {
    // Render the plot once comparisonResults is available
    const layout = {
      yaxis: { title: 'Log2 Fold Change (logFC)' },
      xaxis: { zeroline: false, rangemode: 'nonnegative' },
      margin: { b: 25, t: 25, r: 25 },
      barmode: 'overlay',
      modebar: {
        // vertical modebar button layout
        orientation: 'v',
      },
      dragmode: 'select',
    };
    const config = { 
        modeBarButtonsToRemove: ['autoScale2d'],
        responsive: true, 
        displaylogo: false, 
    };

    const plotData = {
      x: comparisonResults.map((cr) => cr.start),
      y: comparisonResults.map((cr) => cr.logFC),
      text: comparisonResults.map((cr) => cr.name),
      type: 'scatter',
      mode: 'markers'
    };

    Plotly.newPlot(plotId, [plotData], layout, config);
    window.addEventListener('resize', resizePlot);
    const plotDIV = document.getElementById(plotId);
    plotDIV?.on('plotly_selected', function (data) {
      if (data === undefined) return;
      const selectedData = data.points.map((point) => point.text);
      filterData(selectedData);
    });
    plotDIV?.on('plotly_deselect', function () {
      filterData([]);
    });

    // Mark the plot as rendered to prevent re-running on future updates
    hasRendered = true;
  }

  onDestroy(() => {
    window.removeEventListener('resize', resizePlot);
  });
</script>

<div class="card">
  <header class="card-header">{filename}</header>
  <section class="p-4">
    <!-- Plot container, which will render once loading is complete -->
    <div id={plotId} style="width: 100%; height: 100%;"></div>

    {#if isLoading}
      <!-- Display loading spinner until data is ready -->
      <div class="flex items-center justify-center align-middle m-12">
        <ProgressRadial value={undefined} width="w-14" strokeLinecap="round" />
      </div>
    {/if}
  </section>
  <footer class="card-footer">
    The logFC represents the log2 fold-change between control and condition read counts for each
    gene.
  </footer>
</div>
