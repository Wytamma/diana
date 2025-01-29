<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';
	import { referenceStore } from '$lib/stores/refStore';
	import { annotationStore } from "$lib/stores/annotationStore";
	import { insertStore, containsControlAndTreatment } from '$lib/stores/insertStore';

	initializeStores();

	let currentTile = '/';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	$: currentTile = $page.url.pathname;

	function navigateTo(path: string) {
		goto(path);
	}
</script>
<Toast position="br" />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
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
			<AppRailTile
				on:click={() => navigateTo('/')}
				bind:group={currentTile}
				name="tile-1"
				value="/"
				title="tile-1"
			>
				<span>Data</span>
			</AppRailTile>
			<AppRailTile
				on:click={() => navigateTo('/tracks')}
				bind:group={currentTile}
				name="tile-2"
				value="/tracks"
				title="tile-2"
				class={(!$referenceStore.filename || !$annotationStore.filename) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
			>
				<span>Tracks</span>
			</AppRailTile>
			<AppRailTile
				on:click={() => navigateTo('/bias')}
				bind:group={currentTile}
				name="tile-4"
				value="/bias"
				title="tile-4"
				class={(!$referenceStore.filename || !$annotationStore.filename || $insertStore.size === 0) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
			>
				<span>Bias</span>
			</AppRailTile>
			<AppRailTile
				on:click={() => navigateTo('/compare')}
				bind:group={currentTile}
				name="tile-4"
				value="/compare"
				title="tile-4"
				class={(!$referenceStore.filename || !$annotationStore.filename || !$containsControlAndTreatment) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
			>
				<span>Compare</span>
			</AppRailTile>
		</AppRail>
	</svelte:fragment>

	<slot />
</AppShell>
