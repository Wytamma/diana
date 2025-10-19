<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailTile, TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';
	import { annotationStore } from "$lib/stores/annotationStore";
	import { insertStore, containsControlAndTreatment } from '$lib/stores/insertStore';

	initializeStores();

	let currentTile = '/';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	$: currentTile = $page.url.pathname;

	function navigateTo(path: string) {
		if ($page.url.pathname !== path) {
			goto(path);
		}
	}
</script>
<Toast position="br" />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar shadow="drop-shadow-lg">
			<svelte:fragment slot="lead">
  				<!-- svelte-ignore missing-declaration -->
				<a href="/"><strong class="text-xl uppercase">Diana</strong> v{__VERSION__}</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm hover:underline"
					href="https://github.com/Wytamma/diana"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<a
					class="btn btn-sm hover:underline"
					href="/docs/"
				>
					Docs
				</a>

			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<AppRail class="hidden md:block">
			<AppRailTile
				on:click={() => navigateTo('/')}
				bind:group={currentTile}
				value="/"
				name="data"
			>
				<span>Data</span>
			</AppRailTile>
			<AppRailTile
				on:click={() => navigateTo('/annotations')}
				bind:group={currentTile}
				value="/annotations"
				name="annotations"
				class={(!$annotationStore.filename) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
			>
				<span>Annotations</span>
			</AppRailTile>
			<AppRailTile
				on:click={() => navigateTo('/tracks')}
				bind:group={currentTile}
				value="/tracks"
				name="tracks"
				class={(!$annotationStore.filteredFeatures.length) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
			>
				<span>Tracks</span>
			</AppRailTile>
			<AppRailTile
				on:click={() => navigateTo('/bias')}
				bind:group={currentTile}
				value="/bias"
				name="bias"
				class={(!$annotationStore.filteredFeatures.length || $insertStore.size === 0) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
			>
				<span>Bias</span>
			</AppRailTile>
			<AppRailTile
				on:click={() => navigateTo('/compare')}
				bind:group={currentTile}
				value="/compare"
				name="compare"
				class={(!$annotationStore.filteredFeatures.length || !$containsControlAndTreatment) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}
			>
				<span>Compare</span>
			</AppRailTile>
		</AppRail>
	</svelte:fragment>
	<!-- Tabs Navigation for mobile (Footer) -->
	<svelte:fragment slot="footer">
		<TabGroup 
			justify="justify-center"
			active="variant-filled-primary"
			hover="hover:variant-soft-primary"
			rounded=""
			flex="flex-1"
			class="bg-surface-100-800-token w-full fixed bottom-0 left-0 right-0 block md:hidden z-50"
		>
			<TabAnchor on:click={() => navigateTo('/')} selected={$page.url.pathname === '/'}>
				<span>Data</span>
			</TabAnchor>

			<TabAnchor on:click={() => navigateTo('/annotations')} selected={$page.url.pathname === '/annotations'} class={(!$annotationStore.filteredFeatures.length) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}>
				<span>Annotations</span>
			</TabAnchor>

			<TabAnchor on:click={() => navigateTo('/tracks')} selected={$page.url.pathname === '/tracks'} class={(!$annotationStore.filteredFeatures.length) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}>
				<span>Tracks</span>
			</TabAnchor>

			<TabAnchor on:click={() => navigateTo('/bias')} selected={$page.url.pathname === '/bias'} class={(!$annotationStore.filteredFeatures.length || $insertStore.size === 0) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}>
				<span>Bias</span>
			</TabAnchor>

			<TabAnchor on:click={() => navigateTo('/compare')} selected={$page.url.pathname === '/compare'} class={(!$annotationStore.filteredFeatures.length || !$containsControlAndTreatment) ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}>
				<span>Compare</span>
			</TabAnchor>
		</TabGroup>
	</svelte:fragment>

	<slot />
</AppShell>
