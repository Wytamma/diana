<script lang="ts">
import { FileDropzone, ProgressBar } from "@skeletonlabs/skeleton";
import { userPlotToView } from "$lib/userPlotToView";
import { gffToView, getAssembly } from "$lib/gffToView";
import { convertEmblToGff3 } from "$lib/emblUtils"
import { viewsStore } from "$lib/stores/viewsStore";
import { gffStore } from "$lib/stores/gffStore";
import { userPlotStore, type ReadCountDataPoint } from "$lib/stores/userPlotStore";
import { goto } from '$app/navigation';
import { taStore } from "$lib/stores/TAStore";

let files: FileList;
let isLoading = false;
let chromosome: string;
let chromosomeLength: number;
const width = 1000;

function extractFastaFromGff(gff: string): string {
    const lines = gff.split('\n');
    let fasta = '';
    let header = '';
    let inFastaBlock = false;
    for (const line of lines) {
        if (line.startsWith('##FASTA')) {
            inFastaBlock = true;
            continue;
        }
        if (!inFastaBlock) {
            continue
        }
        if (line.startsWith('>')) {
            header = line;
        } else {
            fasta += line.trim();
        }
    }
    return `${header}'\n'${fasta}`;
}

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
            reader.onload = (e) => {
                let text: string = e.target?.result?.toString() as string;
                let isGff = false;
                if (name.endsWith('.embl')) {
                    text = convertEmblToGff3(text);
                    isGff = true;
                } 
                if (name.endsWith('.gff') || name.endsWith('.gff3') || isGff){
                    let axis = 'none';
                    if ($viewsStore.length === 0 && i === 0) {
                        axis = 'top';
                    } else {
                        axis = 'bottom';
                    }
                    [chromosome, chromosomeLength] = getAssembly(text);
                    console.log(chromosome, chromosomeLength);
                    const view = gffToView(text, name, axis, width);
                    gffStore.fromText(text);
                    const fasta = extractFastaFromGff(text);
                    console.log(fasta);
                    taStore.fromFasta(fasta);
                    console.log($taStore);
                    resolve(view);
                } else {
                    const userPlotData: ReadCountDataPoint[] = []
                    const lines = text.split('\n');
                    for (const line of lines) {
                        // Split the line by spaces
                        const [plus, minus] = line.split(' ');
                        userPlotData.push({
                            plus: Number.parseInt(plus),
                            minus: Number.parseInt(minus),
                        });
                    }
                    // userPlotStore.set(new Map([[name, userPlotData]]));
                    userPlotStore.update((store) => {
                        console.log(name)
                        store.set(name, userPlotData);
                        return store;
                    });
                }
                if (!chromosome) {
                    chromosome = "chr1";
                    chromosomeLength = text?.split('\n').length;
                }
                
                const view = userPlotToView(text, name, width);

                resolve(view);
            };
            reader.onerror = reject;
            reader.readAsText(file);
        }));
    }

    Promise.all(fileReadPromises).then((resultingViews) => {
        $viewsStore = resultingViews; // Update the store with the new views
        goto('/track')
        isLoading = false;
        
    }).catch((error) => {
        console.error("Error reading files:", error);
        isLoading = false;
    });
}
</script>

<div class="  flex justify-center ">
<div class="flex flex-col items-center align-baseline justify-center max-w-4xl  space-y-10 ">
        <!-- Animated Logo -->
        <figure class="card-hover rounded-full">
			<div>
				<section class="img-bg" />
			</div>
            <img 
                class={`logo-img mt-20`} 
                src="/images/logo2.png" 
                alt="Skeleton Logo" 
            />
        </figure>
        <h1 class=" text-center text-3xl">
            Transposon Sequencing Data Visualiser
        </h1>
        <!-- / -->
        {#if isLoading}
            <ProgressBar />
        {:else}
            <div class="px-2 w-full" >
                <FileDropzone bind:files={files} on:change={onChangeHandler} name="files" multiple={true} >
                    <svelte:fragment slot="message"><p class="text-xl "><span class="font-semibold">Load files</span> or drag and drop</p></svelte:fragment>
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
