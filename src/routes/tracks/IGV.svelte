<script lang="ts">
	import { referenceStore } from "$lib/stores/refStore";
	import { annotationStore } from "$lib/stores/annotationStore";
	import igv from 'igv';
    import { onMount } from "svelte";
    import { taStore } from "$lib/stores/TAStore";
	import { createBlobURL } from "$lib/utils/utils";
    import { userPlotStore } from "$lib/stores/userPlotStore";
	let browser;
	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	$: config = {
		loadDefaultGenomes: false,
		search: false,
		reference: {
			"id": $referenceStore.name,
			"name": $referenceStore.name,
			"fastaURL": $referenceStore.url,
			"indexURL": $referenceStore.indexUrl,
			"wholeGenomeView": false,
			"tracks": [
				{
					name: 'TA Sites',
					format: "bed",
					displayMode: "expanded",
					height: 40,
					url: $taStore.url,
					indexURL: $taStore.indexUrl,
					visibilityWindow: 0,
					color: "red"
				},
				...Array.from( $userPlotStore ).map(([name, text]) => {
					return {
					type: "wig",
					name: name,
					format: "wig",
					height: 100,
					logScale: true,
					windowFunction: 'mean',
					visibilityWindow: undefined,
					url: createBlobURL(text.replace('variableStep chrom=chrom span=2', `variableStep chrom=${$taStore.raw.keys().next().value} span=2`)),
					autoscale: true,
					color: "rgb(59, 61, 145)",
					altColor: "rgb(236, 72, 153)",
					}
				}),
				{
					name: 'Annotations',
					format: "gff3",
					displayMode: "expanded",
					height: 150,
					url: $annotationStore.url,
					indexURL: $annotationStore.indexUrl,
					visibilityWindow: 0,
					color: (feature) => {						
						switch (feature.strand) {
							case "-":
								return "blueviolet"
							case "+":
								return "blue"
							case "retained_intron":
								return "rgb(0, 150, 150)"
							case "processed_transcript":
								return "purple"
							case "processed_pseudogene":
								return "#7fff00"
							case "unprocessed_pseudogene":
								return "#d2691e"
							default:
								return "black"
						}
					}
				},
			]
		},
  	};
	
	async function  createBrowser() {
		igv.removeAllBrowsers();
		const div = document.getElementById('igv_div'); 
		browser = await igv.createBrowser(div, config);
	}

	$: if (mounted && browser == undefined && $referenceStore.url !== undefined && $annotationStore.url !== undefined && $taStore.url !== undefined) {
		createBrowser();
	}

	
</script>

{#if $referenceStore.url === undefined}
<p>Reference genome not loaded</p>
{/if}
<div id="igv_div"></div>

