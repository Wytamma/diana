<script lang="ts">
    import ThSort from '$lib/components/datatable/ThSort.svelte';
    import ThFilter from '$lib/components/datatable/ThFilter.svelte';
    import Search from '$lib/components/datatable/Search.svelte';
    import RowsPerPage from '$lib/components/datatable/RowsPerPage.svelte';
    import RowCount from '$lib/components/datatable/RowCount.svelte';
    import Pagination from '$lib/components/datatable/Pagination.svelte';
    import DownloadButton from '$lib/components/datatable/DownloadButton.svelte';
    import { DataHandler } from '@vincjo/datatables';
    import type { CompareResults } from '$lib/utils/compareGeneInsertSites';

    export let comparisonResults: CompareResults[]; // The interface for CompareResults is as defined in the task
    let handler = new DataHandler(comparisonResults, { rowsPerPage: 10 });
    let rows = handler.getRows();

    $: if (comparisonResults) {
        handler.setRows(comparisonResults);
    }
    
</script>

<div class="overflow-x-auto space-y-4">
    <!-- Header -->
    <header class="flex justify-between gap-4">
        <Search {handler} />
        <DownloadButton {handler} filename="comparisons.csv" />
    </header>
    
    <!-- Table -->
    <table class="table table-hover table-compact w-full table-auto">
        <thead>
            <tr>
                <ThSort {handler} orderBy="seqId">Chromosome</ThSort>
                <ThSort {handler} orderBy="name">Name</ThSort>
                <ThSort {handler} orderBy="start">Start</ThSort>
                <ThSort {handler} orderBy="stop">End</ThSort>
                <ThSort {handler} orderBy="logFC">Log2 Fold Change</ThSort>
                <ThSort {handler} orderBy="logCPM">Log CPM</ThSort>
                <ThSort {handler} orderBy="pValue">P-Value</ThSort>
                <ThSort {handler} orderBy="qValue">Q-Value</ThSort>
            </tr>
            <tr>
                <ThFilter {handler} filterBy="seqId" />
                <ThFilter {handler} filterBy="name" />
                <ThFilter {handler} filterBy="start" />
                <ThFilter {handler} filterBy="stop" />
                <ThFilter {handler} filterBy="logFC" />
                <ThFilter {handler} filterBy="logCPM" />
                <ThFilter {handler} filterBy="pValue" />
                <ThFilter {handler} filterBy="qValue" />
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.seqId}</td>
                    <td>{row.name}</td>
                    <td>{row.start}</td>
                    <td>{row.stop}</td>
                    <td>{row.logFC}</td>
                    <td>{row.logCPM}</td>
                    <td>{row.pValue}</td>
                    <td>{row.qValue}</td>
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
