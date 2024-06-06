<script lang="ts">
    import { onMount } from 'svelte';
    import { embed } from 'gosling.js';
	export let spec: any;
    let goslingApi: any;
    let mounted = false;
    
    let opts = {
        // Optional: specify additional options
        theme: {
            "base": "light",
            'root': {'background': 'transparent'}, }
    };
    function renderGosling() {
        let container = document.getElementById('gosling-container');
        if (!container) {
            return;
        }
        embed(container, spec, opts).then((api) => {
            console.log('Gosling API:', api);
            const trackIds = api.getTracks()
            console.log('Track IDs:', trackIds);
            goslingApi = api;
        });
    }

    function download() {
        goslingApi.exportPng();
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
    <footer class="flex card-footer justify-end mt-4">
        <button type="button" class="btn btn-sm variant-filled-primary" on:click={download}>
            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </span>
            <span>
                Download
            </span>
        </button>
    </footer>
</div>

<style>
    :global(.gosling-component) {
        padding: 0 !important;
    }
</style>