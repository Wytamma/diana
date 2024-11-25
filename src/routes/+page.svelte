<script lang="ts">
import { FileDropzone, ProgressRadial } from "@skeletonlabs/skeleton";
import { annotationStore } from "$lib/stores/annotationStore";
import { insertStore } from "$lib/stores/insertStore";
import { taStore } from "$lib/stores/TAStore";
import { referenceStore } from "$lib/stores/refStore";
import { getToastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings } from '@skeletonlabs/skeleton';
import { igvStore } from "$lib/stores/igvStore";
import File from "$lib/components/files/File.svelte";
import Reference from "$lib/components/files/Reference.svelte";

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
                            background: 'variant-glass-error',
                        };
                        toastStore.trigger(t);
                    });
                    $igvStore.locus = undefined; // Reset the locus
                    await taStore.load(fasta);
                    resolve(0);
                    
                } else if (name.endsWith('.userplot') || name.endsWith('.plot')) {
                    await insertStore.load(name, text);
                } else {
                    console.error('Unsupported file type:', name);
                    const error = 'Unsupported file type: ' + name;
                    const t: ToastSettings = {
                        message: error,
                        // Provide any utility or variant background style:
                        background: 'variant-glass-error',
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
       <Reference filename={$referenceStore.name} onRemove={referenceStore.reset}/> 
    {/if}
    {#each Array.from($insertStore.entries()).sort(([filenameA], [filenameB]) => filenameA.localeCompare(filenameB)) as [filename, { isTreatment }], i }
        <File 
            isTreatment={isTreatment} 
            onToggle={(value) => insertStore.setIsTreatment(filename, value)} 
            onRemove={() => insertStore.remove(filename)} 
            filename={filename} 
        />
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
