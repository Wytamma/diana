<script lang="ts">
    import {tradisEssentiality} from '$lib/tradisEssentiality';
    import {generateGeneInsertSites} from '$lib/generateGeneInsertSites';
    import {gffStore} from '$lib/stores/gffStore';
    import {userPlotStore, type ReadCountDataPoint} from '$lib/stores/userPlotStore';
    import { onMount, onDestroy } from 'svelte';
    import ApexCharts from 'apexcharts';
    import { taStore } from '$lib/stores/TAStore';

    
    // read_count: number;
    // ins_index: number;
    console.log("userPlotStore", $userPlotStore)
    const data: ReadCountDataPoint[][] = Array.from($userPlotStore.values())
    console.log(data)
    const userPlotData = data[0];
    const totalReads = userPlotData.map(data => data.minus + data.plus)
    console.log("totalReads", totalReads)
    const generateGeneInsertSitesData = generateGeneInsertSites($gffStore.features, totalReads, $taStore, 0, 0)
    console.log("generateGeneInsertSitesData", generateGeneInsertSitesData)
    const essential = tradisEssentiality(generateGeneInsertSitesData)
    const plotData = essential.plotData
    
    let chart: ApexCharts | null = null;
    let chartContainer: HTMLDivElement | null = null;  // Reference to the chart div

    // ApexCharts configuration options
    const options: ApexCharts.ApexOptions = {
        chart: {
        type: 'line',
        height: 400,
        animations: {
            enabled: false,
        }
        },
        series: [
        {
            name: 'Density',
            data: plotData.density.map((density, idx) => ({
            x: idx,
            y: density
            }))
        },
        {
            name: 'Loess Fit',
            data: plotData.loess.map((loess, idx) => ({
            x: idx,
            y: loess
            }))
        },
        {
            name: 'Gamma Fit 1',
            data: plotData.gammaFits.x.map((x, idx) => ({
            x: x,
            y: plotData.gammaFits.y1[idx]
            }))
        },
        {
            name: 'Gamma Fit 2',
            data: plotData.gammaFits.x.map((x, idx) => ({
            x: x,
            y: plotData.gammaFits.y2[idx]
            }))
        }
        ],
        xaxis: {
        title: {
            text: 'Insertion Index',
            style: {
            fontWeight: 'bold'
            }
        },
        },
        yaxis: {
        title: {
            text: 'Density',
            style: {
            fontWeight: 'bold'
            }
        },
        },
        annotations: {
        xaxis: [
            {
            x: plotData.changepoints.essen,
            borderColor: '#FF4560',
            label: {
                text: 'Essential Changepoint',
                style: {
                color: '#fff',
                background: '#FF4560'
                }
            }
            },
            {
            x: plotData.changepoints.ambig,
            borderColor: '#775DD0',
            label: {
                text: 'Ambiguous Changepoint',
                style: {
                color: '#fff',
                background: '#775DD0'
                }
            }
            }
        ]
        }
    };

    // Initialize ApexCharts after the component mounts
    onMount(() => {
        if (chartContainer) {
        chart = new ApexCharts(chartContainer, options);
        chart.render();
        }
    });

    // Destroy the chart when the component is destroyed
    onDestroy(() => {
        if (chart) {
        chart.destroy();
        }
    });
</script>

<div class="card variant-filled">
    <!-- This div will hold the ApexCharts chart -->
    <div bind:this={chartContainer}></div>
</div>

<style>
  div {
    width: 100%;
  }
</style>
