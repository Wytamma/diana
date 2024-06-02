<script lang="ts">
    import { onMount } from 'svelte';
    import { embed } from 'gosling.js';
	export let spec: any;
    let api: any;
    let mounted = false;
    
    let opts = {
        // Optional: specify additional options
        theme: {
            "base": "light",
            'root': {'background': 'transparent'}, }
    };
    function renderGosling() {
        embed(document.getElementById('gosling-container'), spec, opts).then((api) => {
            console.log('Gosling API:', api);
            const trackIds = api.getTracks()
            console.log('Track IDs:', trackIds);

        });
    }
    $: if (spec && mounted) {
        renderGosling();
    };
    onMount(() => {
        renderGosling();
        mounted = true;
    });
</script>

<div class="card variant-filled w-full">
    <header class="card-header">
    </header>
    <section class="flex items-center justify-center">
        <div class="mx-2" id="gosling-container">

        </div>
    </section>
    <footer class="card-footer">
    </footer>
</div>

<style>
    :global(.gosling-component) {
        padding: 0 !important;
    }
</style>