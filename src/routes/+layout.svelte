<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';  // Import page store from SvelteKit
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';
    import { referenceStore } from '$lib/stores/refStore';
	import { annotationStore } from "$lib/stores/annotationStore";
    import { insertStore, containsControlAndTreatment } from '$lib/stores/insertStore';

	initializeStores();


	let currentTile = '/'; // Default to home page

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Reactive statement that keeps currentTile in sync with the URL
	$: currentTile = $page.url.pathname;

	// Function to navigate and update the URL
	function navigateTo(path: string) {
		goto(path);
	}
</script>
<Toast position='br' />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar shadow="drop-shadow-lg">
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl uppercase">Diana</strong></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/Wytamma/diana"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<AppRailTile on:click={() => navigateTo('/')} bind:group={currentTile} name="tile-1" value="/" title="tile-1">
				<span>Data</span>
			</AppRailTile>
			{#if $referenceStore.filename && $annotationStore.filename}
				<AppRailTile on:click={() => navigateTo('/tracks')} bind:group={currentTile} name="tile-2" value="/tracks" title="tile-2">
					<span>Tracks</span>
				</AppRailTile>
			{/if}
			{#if $referenceStore.filename && $annotationStore.filename && $insertStore.size > 0}
				<AppRailTile disable on:click={() => navigateTo('/bias')} bind:group={currentTile} name="tile-4" value="/bias" title="tile-4">
					<span>Bias</span>
				</AppRailTile>
			{/if}
			{#if $referenceStore.filename && $annotationStore.filename && $containsControlAndTreatment}
				<AppRailTile disable on:click={() => navigateTo('/compare')} bind:group={currentTile} name="tile-4" value="/compare" title="tile-4">
					<span>Compare</span>
				</AppRailTile>
			{/if}
			<!-- <AppRailTile disable on:click={() => navigateTo('/webR')} bind:group={currentTile} name="tile-4" value="/webR" title="tile-4">
				<span>webR</span>
			</AppRailTile> -->
			<!--
			<AppRailTile disable on:click={() => navigateTo('/plotly')} bind:group={currentTile} name="tile-4" value="/plotly" title="tile-4">
				<span>Plots</span>
			</AppRailTile>
			<AppRailTile disable on:click={() => navigateTo('/analysis')} bind:group={currentTile} name="tile-4" value="/analysis" title="tile-4">
				<span>Analysis</span>
			</AppRailTile>
			<AppRailTile disable on:click={() => navigateTo('/gff')} bind:group={currentTile} name="tile-3" value="/gff" title="tile-3">
				<span>GFF</span>
			</AppRailTile> -->
			<svelte:fragment slot="trail">
				<!-- <LightSwitch /> -->
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
