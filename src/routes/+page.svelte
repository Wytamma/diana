<script lang="ts">
    import { FileDropzone, ProgressBar } from "@skeletonlabs/skeleton";
    import GoslingComponent from "./components/Gosling.svelte";
    import { userPlotToView } from "$lib/userPlotToView";
	import { gffToView, getAssembly } from "$lib/gffToView";
    import { convertEmblToGff3 } from "$lib/emblUtils"
    import { viewsStore } from "$lib/stores/viewsStore";

    let files: FileList;
    let isLoading = false;
    let dataLoaded: boolean = false; // Initially false
    let chromosome: string;
    let chromosomeLength: number;
    let width = 1000;

    function onChangeHandler(e: Event): void {
        if (!files || files.length === 0) {
            return;
        }
        isLoading = true;

        let fileReadPromises = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const name = file.name;
            const reader = new FileReader();
            fileReadPromises.push(new Promise((resolve, reject) => {
                reader.onload = function (e) {
                    const text: string = e.target?.result?.toString() as string;
                    if (name.endsWith('.embl')) {
                        // covert to gff
                        const gff = convertEmblToGff3(text);
                        console.log(gff);
                        
                        let view = gffToView(gff, name, width);
                        resolve(view);
                    }
					if (name.endsWith('.gff') || name.endsWith('.gff3')){
                        let axis = 'none';
                        if ($viewsStore.length == 0) {
                            axis = 'top';
                        } else {
                            axis = 'bottom';
                        }
                        [chromosome, chromosomeLength] = getAssembly(text);
                        console.log(chromosome, chromosomeLength);
						let view = gffToView(text, name, axis, width);
						resolve(view);
					}
                    if (!chromosome) {
                        chromosome = "chr1";
                        chromosomeLength = text?.split('\n').length;
                    }
                    let view = userPlotToView(text, name, width);
                    resolve(view);
                };
                reader.onerror = reject;
                reader.readAsText(file);
            }));
        }

        Promise.all(fileReadPromises).then((resultingViews) => {
            viewsStore.update(views => [...views, ...resultingViews]); // Update the store with the new views
            isLoading = false;
            dataLoaded = true;
        }).catch((error) => {
            console.error("Error reading files:", error);
            isLoading = false;
        });
    }
</script>

<div class="container mx-auto flex justify-center items-center">
    <div class="space-y-10 text-center flex flex-col items-center mb-10">
        <!-- Animated Logo -->
        <figure class="card-hover rounded-full">
			<div class={`${dataLoaded ? 'hide' : ''}`}>
				<section class="img-bg" />
			</div>
            <img 
                class={`logo-img mt-20 ${dataLoaded ? 'shrink' : ''}`} 
                src="/images/logo2.png" 
                alt="Skeleton Logo" 
            />
        </figure>
        <h2 class="h2">Transposon Sequencing Data Visualiser</h2>

        {#if dataLoaded}
            <GoslingComponent spec={{
				"padding": 0,
				"spacing": 10,
				"layout": "linear",
				"assembly": [[chromosome, chromosomeLength]],
				"style": {"enableSmoothPath": true, "outlineWidth": 0},
                "views": $viewsStore,
            }} />
        {/if}
        <!-- / -->
        {#if isLoading}
            <ProgressBar />
        {:else}
        <div class="px-2 w-full" >
            <FileDropzone bind:files={files} on:change={onChangeHandler} name="files" multiple={true} >
                <svelte:fragment slot="message"><p class="text-xl "><span class="font-semibold">Upload files</span> or drag and drop</p></svelte:fragment>
                <svelte:fragment slot="meta">GFF and user plot files allowed.</svelte:fragment>
            </FileDropzone>
        </div>
        {/if}
    </div>
</div>

<style lang="postcss">
    figure {
        @apply flex relative flex-col;
    }
    .img-bg {
        @apply w-64 h-64 mt-20 md:w-80 md:h-80 absolute z-[-1] rounded-full blur-[50px] transition-all;
        animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
            glow 5s linear infinite;
    }
    .logo-img {
        @apply w-64 h-64 md:w-80 md:h-80 drop-shadow-lg rounded-full hover:drop-shadow-xl transition-all duration-500;
    }
    .hide {
        @apply hidden mt-0 opacity-0;
    }
    .shrink {
        @apply w-0 h-0 mt-0 opacity-0;
    }
    @keyframes glow {
        0% {
            @apply bg-primary-400/50;
        }
        33% {
            @apply bg-secondary-400/50;
        }
        66% {
            @apply bg-tertiary-400/50;
        }
        100% {
            @apply bg-primary-400/50;
        }
    }
    @keyframes pulse {
        50% {
            transform: scale(1.5);
        }
    }
</style>
