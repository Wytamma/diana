<script lang="ts">
    import ThSort from '$lib/components/datatable/ThSort.svelte';
	import ThFilter from '$lib/components/datatable/ThFilter.svelte';
	import Search from '$lib/components/datatable/Search.svelte';
	import RowsPerPage from '$lib/components/datatable/RowsPerPage.svelte';
	import RowCount from '$lib/components/datatable/RowCount.svelte';
	import Pagination from '$lib/components/datatable/Pagination.svelte';
    import { DataHandler } from '@vincjo/datatables';
	import type { GeneInsertResult } from '$lib/generateGeneInsertSites';
	
	export let data: Record<string, GeneInsertResult>[]
	export let column: string
	console.log(data);
	
	const files = Object.keys(data[0]).sort()
	let processData = []
	for (const element of data) {
		let row: Record<string, any> = {}
		for (const [filename, value] of Object.entries(element)) {
			row[filename] = value[column]
			row['name'] = value['name']
			row['start'] = value['start']
			row['length'] = value['geneLength']
		}
		processData.push(row)
	}
	
    const handler = new DataHandler(processData, { rowsPerPage: 5 });
    const rows = handler.getRows();
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
				<ThSort {handler} orderBy="name">Name</ThSort>
				<ThSort {handler} orderBy="start">Start</ThSort>
				<ThSort {handler} orderBy="length">Length</ThSort>
				{#each files as file}
					<ThSort {handler} orderBy={file}>{file}</ThSort>
				{/each}

			</tr>
			<tr>
				<ThFilter {handler} filterBy="name" />
				<ThFilter {handler} filterBy="start" />
				<ThFilter {handler} filterBy="length" />
				{#each files as file}
					<ThFilter {handler} filterBy={file} />
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					<td>{row.name}</td>
					<td>{row.start}</td>
					<td>{row.length}</td>
					{#each files as file}
						<td>{parseFloat(row[file]).toFixed(2)}</td>
					{/each}
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
        