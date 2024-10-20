<script lang="ts">
import { FileDropzone, ProgressRadial } from "@skeletonlabs/skeleton";
import { annotationStore } from "$lib/stores/annotationStore";
import { userPlotStore, type ReadCountDataPoint } from "$lib/stores/userPlotStore";
import { taStore } from "$lib/stores/TAStore";
import { referenceStore } from "$lib/stores/refStore";
import { getToastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings } from '@skeletonlabs/skeleton';
import { igvStore } from "$lib/stores/igvStore";

const toastStore = getToastStore();

let files: FileList;
let isLoading = false;
let chromosome: string;
let chromosomeLength: number;
const width = 1000;

function extractFastaFromGff(gff: string): string {
    const lines = gff.split('\n');
    let fasta = '';
    let currentSequence = '';
    let inFastaBlock = false;

    for (const line of lines) {
        // Check if the line marks the start of the FASTA section
        if (line.startsWith('##FASTA')) {
            inFastaBlock = true;
            continue;
        }
        // If not in the FASTA block, skip the line
        if (!inFastaBlock) {
            continue;
        }
        // If a new header is encountered, process the previous sequence
        if (line.startsWith('>')) {
            // Append the previous sequence to the fasta result if it exists
            if (currentSequence) {
                fasta += currentSequence + '\n';
            }
            // Start a new sequence with the current header
            currentSequence = line + '\n';
        } else {
            // Add sequence lines to the current sequence
            currentSequence += line.trim();
        }
    }

    // Add the last sequence if any
    if (currentSequence) {
        fasta += currentSequence + '\n';
    }

    return fasta.trim();
}

function onChangeHandler(e: Event): void {
    console.log('Files dropped:', files);
    
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
            reader.onload = async (e) => {
                let text: string = e.target?.result?.toString() as string;
                let isGff = false;
                if (name.endsWith('.gff') || name.endsWith('.gff3')){
                    await annotationStore.load(text);
                    const fasta = extractFastaFromGff(text);
                    await referenceStore.load(name, fasta).catch((e) => {
                        console.error('Error loading reference:', e);
                        const error = 'Error loading reference: ' + e;
                        const t: ToastSettings = {
                            message: error,
                            // Provide any utility or variant background style:
                            background: 'variant-ghost-error',
                        };
                        toastStore.trigger(t);
                    });
                    $igvStore.locus = undefined; // Reset the locus
                    await taStore.load(fasta);
                    resolve(0);
                    
                } else if (name.endsWith('.userplot') || name.endsWith('.plot')) {
                    await userPlotStore.load(name, text);
                } else {
                    console.error('Unsupported file type:', name);
                    const error = 'Unsupported file type: ' + name;
                    const t: ToastSettings = {
                        message: error,
                        // Provide any utility or variant background style:
                        background: 'variant-ghost-error',
                    };
                    toastStore.trigger(t);
                    reject('Unsupported file type: ' + name);
                }               
                // const view = userPlotToView(text, name, width);
                // resolve(view);
                resolve(0);
            };
            reader.onerror = reject;
            reader.readAsText(file);
        }));
    }

    Promise.all(fileReadPromises).then((resultingViews) => {
        isLoading = false;
        
    }).catch((error) => {
        console.error("Error reading files:", error);
        isLoading = false;
    });
}

function resetDropzone() {
    // get the input element by name 
    const input = document.getElementsByName('files')[0] as HTMLInputElement;
    // reset the input element
    input.value = '';
    // reset the files
}
</script>

<div class="flex justify-center mb-6">
    <div class="flex flex-col items-center align-baseline justify-center max-w-4xl  space-y-10 ">
        <!-- Animated Logo -->
        <figure class="card-hover rounded-full">
			<div>
				<section class="img-bg" />
			</div>
            <img 
                class={`logo-img mt-16`} 
                src="/images/logo2.png" 
                alt="Skeleton Logo" 
            />
        </figure>
        <h1 class=" text-center text-3xl">
            Transposon Sequencing Data Visualiser
        </h1>
        <!-- / -->
        <div class="px-2 w-full" >
            <FileDropzone bind:files={files} on:change={onChangeHandler} name="files" multiple={true} on:click={resetDropzone} on:drop={resetDropzone} >
                <svelte:fragment slot="message"><p class="text-xl "><span class="font-semibold">Load files</span> or drag and drop</p></svelte:fragment>
                <svelte:fragment slot="meta">Only GFF+FASTA and .userplot files allowed.</svelte:fragment>
            </FileDropzone>
        </div>
    </div>
</div>
<div class="flex flex-wrap space-4 justify-center">
    {#if $referenceStore.name}
        <div class="card p-4 m-2">
            <div class="flex justify-center items-center space-x-2">
                <p class="text-center text-lg">Reference: {$referenceStore.name}</p>
                <button type="button" class="btn-icon variant-ringed-tertiary" on:click={referenceStore.reset} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>                      
                </button>
            </div>
        </div>
    {/if}
    {#each $userPlotStore as plotData, i }
        <div class="card p-4 m-2">
            <div class="flex justify-center items-center space-x-2">
                <p class="text-center text-lg">Data: {plotData[0]}</p>
                <button type="button" class="btn-icon variant-ringed-tertiary" on:click={() => userPlotStore.remove(plotData[0])} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>                      
                </button>
            </div>
        </div>
    {/each}
    {#if isLoading}
        <div class="flex items-center justify-center align-middle ml-8">
            <ProgressRadial value={undefined} width='w-14'  strokeLinecap="round" />
        </div>

    {/if}
</div>

<style lang="postcss">
    figure {
        @apply flex relative flex-col;
    }
    .img-bg {
        @apply w-48 h-48 mt-20 md:w-64 md:h-64 absolute z-[-1] rounded-full blur-[50px] transition-all;
        animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
            glow 5s linear infinite;
    }
    .logo-img {
        @apply w-48 h-48 md:w-64 md:h-64 drop-shadow-lg rounded-full hover:drop-shadow-xl transition-all duration-500;
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
