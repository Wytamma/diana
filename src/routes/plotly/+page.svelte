<script lang="ts">
	import { generateGeneInsertSites, type GeneInsertResult } from '$lib/utils/generateGeneInsertSites';
	import { annotationStore } from '$lib/stores/annotationStore';
	import { type ReadCountDataPoint, userPlotStore } from '$lib/stores/userPlotStore';
	import Plotly from 'plotly.js-dist';
	import { onMount, afterUpdate } from 'svelte';
  import { TabGroup, Tab } from '@skeletonlabs/skeleton';
  import { taStore } from '$lib/stores/TAStore';
  
	// Tab state
	let tabSet = 'insertIndex'; // Default active tab

	// Get the filenames and the data from the store
	const filenames: string[] = Array.from($userPlotStore.keys());
	const data: ReadCountDataPoint[][] = Array.from($userPlotStore.values());
	
	// For each userPlotData, calculate total reads and generate GeneInsertResults
	function getGeneInsertResultsForData(userPlotData: ReadCountDataPoint[]) {
		const totalReads = userPlotData.map(data => data.minus + data.plus);
		return generateGeneInsertSites($annotationStore.features, totalReads, $taStore, 0, 0);
	}

	// Function to render the plot for a given element ID
	function createPlot(plotId: string, plotData: { x: number[]; type: 'histogram' }, title: string): void {
		const layout: Partial<Plotly.Layout> = {
			title: `Histogram of ${title}`,
			xaxis: { title: `${title}` },
			yaxis: { title: 'Count' },
		};

		// Only create the plot if the target DOM element exists
		const plotElement = document.getElementById(plotId);
		if (plotElement) {
			Plotly.newPlot(plotId, [plotData], layout);
		}
	}

	// Function to render the relevant plot depending on the selected tab
	function renderPlots(plotType: string) {
		data.forEach((userPlotData, index) => {
			const geneInsertResults = getGeneInsertResultsForData(userPlotData);

			let plotData;
			if (plotType === 'readCount') {
				plotData = {
					x: geneInsertResults.map((result: GeneInsertResult) => result.readCount),
					type: 'histogram',
				};
			} else if (plotType === 'insertCount') {
				plotData = {
					x: geneInsertResults.map((result: GeneInsertResult) => result.insertCount),
					type: 'histogram',
				};
			} else if (plotType === 'insertIndex') {
				plotData = {
					x: geneInsertResults.map((result: GeneInsertResult) => result.insIndex),
					type: 'histogram',
				};
			}

			const plotId = `plotly-histogram-${plotType}-${index}`;
			const filename = filenames[index];
			createPlot(plotId, plotData, filename);
		});
	}

	// Ensure the correct plots are rendered when the DOM is ready or when the tab changes
	onMount(() => {
		renderPlots(tabSet);
	});

	// Use afterUpdate to wait until DOM elements are updated before rendering
	afterUpdate(() => {
		renderPlots(tabSet); // Re-render the plots when the tab changes and DOM updates
	});
</script>

<div class="m-4">
	<TabGroup>
		<Tab bind:group={tabSet} name="readCount" value="readCount">
			Read Counts
		</Tab>
		<Tab bind:group={tabSet} name="insertCount" value="insertCount">
			Insert Count
		</Tab>
		<Tab bind:group={tabSet} name="insertIndex" value="insertIndex">
			Insert Index
		</Tab>

		<svelte:fragment slot="panel">
			<!-- Loop through filenames and data to generate a plot div for each -->
			{#each filenames.sort() as filename, index}
				<div>
					<h3>{filename} - {tabSet}</h3>
					<!-- Each plot div has a unique id based on the plot type and index -->
					<div id={`plotly-histogram-${tabSet}-${index}`}></div>
				</div>
			{/each}
		</svelte:fragment>
	</TabGroup>
</div>
