<script lang="ts">
	import { referenceStore } from "$lib/stores/refStore";
	import { annotationStore } from "$lib/stores/annotationStore";
	import { igvStore } from "$lib/stores/igvStore";
	import igv from 'igv';
    import { onMount } from "svelte";
    import { taStore } from "$lib/stores/TAStore";
	import { createBlobURL } from "$lib/utils/utils";
    import { userPlotStore } from "$lib/stores/userPlotStore";
    import { beforeNavigate } from "$app/navigation";
	
	let browser: any;
	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	$: config = {
		loadDefaultGenomes: false,
		search: false,
		locus: $igvStore.locus,
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
					color: "#34495e"
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
					autoscaleGroup: "insertPlots",
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
		const div = document.getElementById('igv_div');
		if (div === null) {
			return;
		}
		igv.createBrowser(div, config).then((browser) => {
			browser.on('locuschange', (referenceFrameList) => {
				let loc = referenceFrameList.map((rf: { getLocusString: () => any; }) => rf.getLocusString()).join('%20')
				$igvStore.locus = loc;
			});
		}).catch((e) => {
			// bad locus can cause an error
			$igvStore.locus = undefined;
		});
	}

	$: if (mounted && browser == undefined && $referenceStore.url !== undefined && $annotationStore.url !== undefined && $taStore.url !== undefined) {
		createBrowser();
	}

	beforeNavigate(() => {
		if (browser !== undefined) {
			igv.removeBrowser(browser)
		}
	});

	
</script>

{#if $referenceStore.url === undefined}
<p>Reference genome not loaded</p>
{/if}
<div id="igv_div"></div>

