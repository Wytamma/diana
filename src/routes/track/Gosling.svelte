<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { embed, type GoslingSpec } from 'gosling.js';
    import { gffStore, geneNames } from '$lib/stores/gffStore';
    import { Autocomplete, type PopupSettings, type AutocompleteOption } from '@skeletonlabs/skeleton';
    import { popup, modeCurrent } from '@skeletonlabs/skeleton';

	export let spec: GoslingSpec;
    
    let goslingApi: Awaited<ReturnType<typeof embed>>;
    let mounted = false;
    let selectedOption = '';
    const options = $geneNames.map(name => ({ label: name.replace(" CDS", ""), value: name.replace(" CDS", "") }))
    const geneLookup: { [key: string]: typeof $gffStore.features[0] } = $gffStore.features.reduce((acc, gene) => {
        acc[gene.attributes.Name.replace(" CDS", "")] = gene;
        return acc;
    }, {} as { [key: string]: typeof $gffStore.features[0] });
    
    const popupSettings: PopupSettings = {
        event: 'focus-click',
        target: 'popupAutocomplete',
        placement: 'bottom',
    };

    function fastFilter(): AutocompleteOption<string>[] {
        // Filter the options based on the input value
        // only show the first X results
        return options.filter((option) => option.label.toLowerCase().includes(selectedOption.toLowerCase())).slice(0, 15);
}
    
    function onSelection(event: CustomEvent<AutocompleteOption<string>>): void {
        if (event.detail.value === '...') {
            return;
        }
        selectedOption = event.detail.label;
        // time to zoom to the gene
        zoomToGene(event.detail.value);
    }

    const opts = {
        theme: {
            "base": "light",
            'root': {'background': 'transparent'}, 
        }
    };
    
    function renderGosling() {
        const container = document.getElementById('gosling-container');
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

    function zoomToGene(geneName: string) {
        const gene = geneLookup[geneName];
        console.log(gene);
        if (!gene) {
            return;
        }
        goslingApi.zoomTo("gff", `${gene.seqname}:${gene.start}-${gene.end}`, 100);
    }

    // $: if (spec && mounted) {
    //     renderGosling();
    // };
    onMount(() => {
        renderGosling();
        mounted = true;
    });
    onDestroy(() => {
        mounted = false;
        const container = document.getElementById('gosling-container');
        if (!container) {
            return;
        }
        container.innerHTML = '';
    });
</script>

<div class="card variant-filled">
    <header class="card-header">
    </header>
    <section class="flex items-center justify-center">
        <div class="mx-2" id="gosling-container">

        </div>
    </section>
    <footer class="flex card-footer mt-4 justify-between">
        <div>
            <input
                class="input autocomplete variant-ghost-surface"
                type="search"
                name="autocomplete-search"
                bind:value={selectedOption}
                placeholder="Search..."
                use:popup={popupSettings}
                autocomplete="off"
                on:keydown={(e) => {
                    if (e.key === 'Enter') {
                        zoomToGene(selectedOption);
                    }
                }}
            />
            <div data-popup="popupAutocomplete" class="[&>div>nav>ul>li>button]:whitespace-nowrap [&>div>nav>ul>li>button]:overflow-hidden">
                <Autocomplete
                    class="card w-48 variant-filled-primary max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1"
                    bind:input={selectedOption}
                    options={[...options.slice(0, 15), { label: '...', value: '...' }]}
                    on:selection={onSelection}
                    filter={fastFilter}
                    emptyState="Gene not found"
                />
            </div>
        </div>
        <button type="button" class="btn btn-sm variant-filled-primary" on:click={download}>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
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