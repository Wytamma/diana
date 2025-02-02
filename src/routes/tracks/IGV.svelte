<script lang="ts">
	import { referenceStore } from "$lib/stores/refStore";
	import { annotationStore, type Feature } from "$lib/stores/annotationStore";
	import { igvStore } from "$lib/stores/igvStore";
	import igv from 'igv';
    import { onMount } from "svelte";
    import { taStore } from "$lib/stores/TAStore";
	import { createBlobURL } from "$lib/utils/utils";
    import { insertStore } from "$lib/stores/insertStore";
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
			"id": $referenceStore.filename,
			"name": $referenceStore.filename,
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
				...Array.from( $insertStore ).map(([name, data]) => {
					return {
					type: "wig",
					name: name,
					format: "wig",
					height: 100,
					logScale: true,
					windowFunction: 'mean',
					visibilityWindow: undefined,
					autoscaleGroup: "insertPlots",
					url: createBlobURL(data.wig),
					autoscale: true,
					color: "rgb(59, 61, 145)",
					altColor: "rgb(236, 72, 153)",
					}
				}),
				{
					name: 'Annotations',
					format: "gff3",
					displayMode: "expanded",
					height: 160,
					url: $annotationStore.url,
					indexURL: $annotationStore.indexUrl,
					visibilityWindow: 0,
					color: (feature: Feature) => {						
						switch (feature.strand) {
							case "-":
								return "blueviolet"
							case "+":
								return "blue"
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
		browser = await igv.createBrowser(div, config).catch((e) => {
			// bad locus can cause an error
			$igvStore.locus = undefined;
		});
		if (browser === undefined) {
			return;
		}
		browser.on('locuschange', (referenceFrameList) => {
			let loc = referenceFrameList.map((rf: { getLocusString: () => any; }) => rf.getLocusString()).join('%20')
			$igvStore.locus = loc;
		});
	}

	$: if (mounted && browser == undefined && $referenceStore.url !== undefined && $annotationStore.url !== undefined && $taStore.url !== undefined) {
		createBrowser();
	}

	beforeNavigate(() => {
		if (browser !== undefined) {
			igv.removeAllBrowsers()
		}
	});

	
</script>

{#if $referenceStore.url === undefined}
<p>Reference genome not loaded</p>
{/if}
<div id="igv_div"></div>

