<script lang="ts">
    import { annotationStore } from '$lib/stores/annotationStore';
    import { generateGeneInsertSites } from '$lib/utils/generateGeneInsertSites';
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    import Plotly from 'plotly.js-dist';
    import { onMount, onDestroy } from 'svelte';

    export let filename;
    export let data: number[];

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

    const exportAsSvg = () => {
        Plotly.downloadImage(document.getElementById(plotId), {
            format: 'svg',
            filename: filename || 'plot'
        });
    };

    onMount(async () => {
        const geneInserts = await generateGeneInsertSites($annotationStore.features, data, [], 0, 0);

        const layout = {
            yaxis: { title: 'Insert Index' },
            xaxis: { zeroline: false, rangemode: 'nonnegative' },
            margin: { b: 25, t: 25, r: 25 },
            barmode: 'overlay',
            modebar: {
                orientation: 'v',
            },
        };

        const config = { 
            modeBarButtonsToRemove: ['autoScale2d'],
            responsive: true, 
            displaylogo: false,
            modeBarButtonsToAdd: [
                {
                    name: 'Download plot as svg',
                    icon: Plotly.Icons.camera,
                    click: exportAsSvg
                }
            ]
        };

        const plotData = {
            x: geneInserts.map(gi => gi.start),
            y: geneInserts.map(gi => gi.insIndex),
            text: geneInserts.map(gi => gi.name),
            textfont: {
                family: 'Times New Roman'
            },
            textposition: 'bottom center',
            type: 'scatter',
            mode: 'markers'
        };

        Plotly.newPlot(plotId, [plotData], layout, config);

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
        The insert index is the number of inserts in a feature divided by the feature length.
    </footer>
</div>
