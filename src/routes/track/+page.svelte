<script lang="ts">
    import GoslingComponent from "./Gosling.svelte";
    import { viewsStore } from "$lib/stores/viewsStore";
    import { gffStore } from "$lib/stores/gffStore";

    const assembly = $gffStore.chromosomes.map(chromosome => [chromosome.name, chromosome.length]);
    console.log(assembly);

</script>
<div class="container mx-auto flex justify-center items-center">
    <div class="space-y-10 text-center flex flex-col items-center mt-6">
        <GoslingComponent spec={{
            "id": "gosling",
            "padding": 0,
            "spacing": 10,
            "layout": "linear",
            "assembly": assembly,
            "style": {"enableSmoothPath": true, "outlineWidth": 0, "responsiveSize": { "width": true },},
            "views": $viewsStore,
        }} />
    </div>
   
</div>