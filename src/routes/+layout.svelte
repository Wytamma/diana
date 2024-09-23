<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';  // Import page store from SvelteKit
	import { LightSwitch } from '@skeletonlabs/skeleton';


	let currentTile = '/upload'; // Default to home page

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// Reactive statement that keeps currentTile in sync with the URL
	$: currentTile = $page.url.pathname;

	// Function to navigate and update the URL
	function navigateTo(path: string) {
		goto(path);
	}
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar shadow="drop-shadow-lg">
			<svelte:fragment slot="lead">
				<a href="/upload"><strong class="text-xl uppercase">Diana</strong></a>
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
			<AppRailTile on:click={() => navigateTo('/upload')} bind:group={currentTile} name="tile-1" value="/upload" title="tile-1">
				<span>Load</span>
			</AppRailTile>
			<AppRailTile disable on:click={() => navigateTo('/track')} bind:group={currentTile} name="tile-2" value="/track" title="tile-2">
				<span>Track</span>
			</AppRailTile>
			<AppRailTile disable on:click={() => navigateTo('/statistics')} bind:group={currentTile} name="tile-4" value="/statistics" title="tile-4">
				<span>Stats</span>
			</AppRailTile>
			<AppRailTile disable on:click={() => navigateTo('/plotly')} bind:group={currentTile} name="tile-4" value="/plotly" title="tile-4">
				<span>Plots</span>
			</AppRailTile>
			<AppRailTile disable on:click={() => navigateTo('/analysis')} bind:group={currentTile} name="tile-4" value="/analysis" title="tile-4">
				<span>Analysis</span>
			</AppRailTile>
			<AppRailTile disable on:click={() => navigateTo('/gff')} bind:group={currentTile} name="tile-3" value="/gff" title="tile-3">
				<span>GFF</span>
			</AppRailTile>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
