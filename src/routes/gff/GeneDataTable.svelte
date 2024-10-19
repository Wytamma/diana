<script lang="ts">
    import ThSort from '$lib/components/datatable/ThSort.svelte';
	import ThFilter from '$lib/components/datatable/ThFilter.svelte';
	import Search from '$lib/components/datatable/Search.svelte';
	import RowsPerPage from '$lib/components/datatable/RowsPerPage.svelte';
	import RowCount from '$lib/components/datatable/RowCount.svelte';
	import Pagination from '$lib/components/datatable/Pagination.svelte';
    import { DataHandler } from '@vincjo/datatables';
    import { annotationStore, type Feature } from "$lib/stores/annotationStore"; 
	
	const features: Feature[] = $annotationStore.features;
    
    const handler = new DataHandler(features, { rowsPerPage: 5 });
    const rows = handler.getRows();
	console.log(handler.getFilters());
	
</script>


<div class=" overflow-x-auto space-y-4">
	<!-- Header -->
	<header class="flex justify-between gap-4">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<!-- Table -->
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<!-- seqname: string; source: string; -->
				<ThSort {handler} orderBy="seqname">Seqname</ThSort>
				<ThSort {handler} orderBy="source">Source</ThSort>
				<ThSort {handler} orderBy="attributes">Name</ThSort>
				<ThSort {handler} orderBy="type">Type</ThSort>
				<ThSort {handler} orderBy="start">Start</ThSort>
				<ThSort {handler} orderBy="end">End</ThSort>
				<ThSort {handler} orderBy="strand">Strand</ThSort>
				<ThSort {handler} orderBy="attributes">Attributes</ThSort>
			</tr>
			<tr>
				<ThFilter {handler} filterBy="seqname" />
				<ThFilter {handler} filterBy="source" />
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
				<tr>
					<td>{row.seqname}</td>
					<td>{row.source}</td>
					<td>{row.attributes.Name}</td>
					<td>{row.type}</td>
					<td>{row.start}</td>
					<td>{row.end}</td>
					<td>{row.strand}</td>
					<td>
						<ul>
							{#each Object.keys(row.attributes) as attribute}
								<li>{attribute}: {row.attributes[attribute]}</li>
							{/each}
						</ul>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- Footer -->
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>
        