<script lang="ts">
    import { annotationStore } from '$lib/stores/annotationStore';
    import { generateGeneInsertSites } from '$lib/utils/generateGeneInsertSites';
    import { compareGeneInsertSites } from '$lib/utils/compareGeneInsertSites';
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    import Plotly from 'plotly.js-dist';
    import { onMount, onDestroy } from 'svelte';

    export let filename: string;
    export let controlData: number[][];  // Array of control replicates
    export let conditionData: number[][]; // Array of condition replicates

    let plotId = `plotly-${filename}`;
    let isLoading = true;

    const resizePlot = () => {
        const plotElement = document.getElementById(plotId);
        if (plotElement) {
            Plotly.relayout(plotElement, {
                width: plotElement.clientWidth,
                height: plotElement.clientHeight
            });
        }
    };

    onMount(async () => {
        // Step 1: Generate Gene Insert Sites for each replicate in control and condition datasets
        const controlGeneInserts = await Promise.all(
            controlData.map((data) => generateGeneInsertSites($annotationStore.features, data, [], 0, 0))
        );

        const conditionGeneInserts = await Promise.all(
            conditionData.map((data) => generateGeneInsertSites($annotationStore.features, data, [], 0, 0))
        );

        // Step 2: Calculate log fold-change (logFC) using compareGeneInsertSites
        const comparisonResults = await compareGeneInsertSites(controlGeneInserts, conditionGeneInserts);

        const layout = {
            yaxis: { title: 'Log2 Fold Change (logFC)' },
            margin: {
                b: 25,
                t: 25
            },
        };

        const plotData = {
            x: comparisonResults.map(cr => cr.start),
            y: comparisonResults.map(cr => cr.logFC),
            text: comparisonResults.map(cr => cr.name),
            type: 'scatter',
            mode: 'markers',
            marker: { size: 8 }
        };

        Plotly.newPlot(plotId, [plotData], layout);

        // Add resize event listener
        window.addEventListener('resize', resizePlot);

        isLoading = false;
    });

    onDestroy(() => {
        // Clean up event listener on component destruction
        window.removeEventListener('resize', resizePlot);
    });
</script>

<div class="card">
    <header class="card-header">{filename}</header>
    <section class="p-4">
        <div id={plotId} style="width: 100%; height: 100%;"></div>
        {#if isLoading}
            <div class="flex items-center justify-center align-middle m-12">
                <ProgressRadial value={undefined} width='w-14' strokeLinecap="round" />
            </div>
        {/if}
    </section>
    <footer class="card-footer">
        The logFC represents the log2 fold-change between control and condition read counts for each gene.
    </footer>
</div>
