<script lang="ts">
    import { annotationStore } from '$lib/stores/annotationStore';
    import { type InsertCountDataPoint } from '$lib/stores/insertStore';
    import { generateGeneInsertSites } from '$lib/utils/generateGeneInsertSites';
    
    import Plotly from 'plotly.js-dist';
    import { onMount, onDestroy } from 'svelte';

    export let filename;
    export let data: InsertCountDataPoint[];

    const insertTotals = data.map(d => d.minus + d.plus);
    const geneInserts = generateGeneInsertSites($annotationStore.features, insertTotals, [], 0, 0);

    console.log(geneInserts);

    let plotId = `plotly-${filename}`;

    const resizePlot = () => {
        const plotElement = document.getElementById(plotId);
        if (plotElement) {
            Plotly.relayout(plotElement, {
                width: plotElement.clientWidth,
                height: plotElement.clientHeight
            });
        }
    };

    onMount(() => {
        const layout = {
            yaxis: { title: 'Insert Index' },
            margin: {
                b: 25,  // Remove bottom margin
                t: 25   // Remove top margin
            },
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

        Plotly.newPlot(plotId, [plotData], layout);

        // Add resize event listener
        window.addEventListener('resize', resizePlot);
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
    </section>
    <footer class="card-footer">
        The insert index is the number of inserts in a locus divided by the gene length.
    </footer>
</div>
