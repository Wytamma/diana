<script lang="ts">
    import ThSort from '$lib/components/datatable/ThSort.svelte';
	import ThFilter from '$lib/components/datatable/ThFilter.svelte';
	import Search from '$lib/components/datatable/Search.svelte';
	import RowsPerPage from '$lib/components/datatable/RowsPerPage.svelte';
	import RowCount from '$lib/components/datatable/RowCount.svelte';
	import Pagination from '$lib/components/datatable/Pagination.svelte';
    import { DataHandler } from '@vincjo/datatables';
    import { annotationStore, type Feature } from "$lib/stores/annotationStore"; 
    import AttributeChip from '$lib/components/AttributeChip.svelte';
    import ThSelectAll from '$lib/components/datatable/ThSelectAll.svelte';
    import DownloadButton from '$lib/components/datatable/DownloadButton.svelte';
	
	const features: Feature[] = $annotationStore.features;
    
    const handler = new DataHandler(features, { rowsPerPage: 5 });
    const rows = handler.getRows();
	const selected = handler.getSelected();

	handler.on('change', () => {
		selected.set($annotationStore.filteredFeatures.map((f) => f._id));
	});


	// selected.set($annotationStore.filteredFeatures.map((f) => f._id));
	annotationStore.subscribe((value) => {
		selected.set(value.filteredFeatures.map((f) => f._id));
	});

	function select(id: number) {
		handler.select(id);
		annotationStore.setFilteredFeatures($selected as number[]);
	}
</script>


<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<DownloadButton {handler} filename="annotations.csv" />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<!-- seqname: string; source: string; -->
				<ThSelectAll {handler} />
				<ThSort {handler} orderBy="seqId">Seqname</ThSort>
				<ThSort {handler} orderBy="attributes">Name</ThSort>
				<ThSort {handler} orderBy="type">Type</ThSort>
				<ThSort {handler} orderBy="start">Start</ThSort>
				<ThSort {handler} orderBy="end">End</ThSort>
				<ThSort {handler} orderBy="strand">Strand</ThSort>
				<ThSort {handler} orderBy="attributes">Attributes</ThSort>
			</tr>
			<tr>
				<th class="text-center">{$selected.length}</th>
				<ThFilter {handler} filterBy="seqId" />
				<ThFilter {handler} filterBy="attributes" />
				<ThFilter {handler} filterBy="type" />
				<ThFilter {handler} filterBy="start" />
				<ThFilter {handler} filterBy="end" />
				<ThFilter {handler} filterBy="strand" />
				<ThFilter {handler} filterBy="attributes" />
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr class="text-center">
					<td >
						<input class="checkbox" type="checkbox"
							on:click={() => select(row._id) } 
							checked={$selected.includes(row._id)}
						>
					</td>
					<td>{row.seqId}</td>
					<td>{row.attributes.Name}</td>
					<td>{row.type}</td>
					<td>{row.start}</td>
					<td>{row.stop}</td>
					<td>{row.strand}</td>
					<td class="text-left">
						{#each Object.entries(row.attributes) as [attrKey, attrValue]}
							<AttributeChip keyName={attrKey} value={attrValue ? attrValue : ""} maxLength={15} />
						{/each}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between">
		<RowsPerPage {handler} />
        <RowCount {handler} />
        <Pagination {handler} />
	</footer>
</div>
        