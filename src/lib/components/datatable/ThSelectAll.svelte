<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	import { annotationStore} from "$lib/stores/annotationStore"; 

	export let handler: DataHandler;

	const isAllSelected = handler.isAllSelected();
	const selected = handler.getSelected();

	function selectAll() {
		handler.selectAll({ selectBy: '_id' });
		annotationStore.setFilteredFeatures($selected as number[]);
	}

</script>

<th on:click={selectAll} class="cursor-pointer select-none text-center">
	<input type="checkbox" class="checkbox"
		checked={$isAllSelected}
	>
</th>
