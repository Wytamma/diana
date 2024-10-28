<script lang="ts">
    import DataTable from './InsertDataTable.svelte';
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    import { insertStore } from '$lib/stores/insertStore';
	import { generateGeneInsertSites, type GeneInsertResult } from '$lib/utils/generateGeneInsertSites';
	import { annotationStore } from '$lib/stores/annotationStore';
    import { taStore } from '$lib/stores/TAStore';

    let tabSet = 'insertIndex'

    // Reactive variable to store data associated with the selected tab
    const selectedData: Record<string, GeneInsertResult[]> = {};
    for (const [key, data] of $insertStore) {
        const totalReads = data.map(data => data.minus + data.plus)
        const generateGeneInsertSitesData = generateGeneInsertSites($annotationStore.features, totalReads, $taStore, 0, 0)
        selectedData[key] = generateGeneInsertSitesData
    }

    // Find the maximum length of any GeneInsertResult[] array
    const maxLength = Math.max(
        ...Object.values(selectedData).map(geneInsertResults => geneInsertResults.length)
    );

    // Create the result array
    const insIndex: Record<string, GeneInsertResult>[] = [];

    // Iterate from 0 to maxLength-1
    for (let i = 0; i < maxLength; i++) {
        const row: Record<string, GeneInsertResult> = {};
        
        // For each filename, check if there's a GeneInsertResult at the current index
        for (const [filename, geneInsertResults] of Object.entries(selectedData)) {
            if (geneInsertResults[i]) {
                row[filename] = geneInsertResults[i];
            }
        }
            
        // Push the row to the result array
        insIndex.push(row);
    }
</script>

<div class="m-4">
    <TabGroup>
        <Tab bind:group={tabSet} name="readCount" value="readCount">
            Read Counts
        </Tab>
        <Tab bind:group={tabSet} name="insertCount" value="insertCount">
            Insert Count
        </Tab>
        <Tab bind:group={tabSet} name="insertIndex" value="insertIndex">
            Insert Index
        </Tab>
        
        <svelte:fragment slot="panel">
            {#if tabSet == 'insertIndex'}
                <DataTable data={insIndex} column={'insIndex'} />
            {:else if tabSet == 'insertCount'}
                <DataTable data={insIndex} column={'insertCount'} />
            {:else if tabSet == 'readCount'}
                <DataTable data={insIndex} column={'readCount'} />
            {/if}
        </svelte:fragment>
    </TabGroup>
</div>
