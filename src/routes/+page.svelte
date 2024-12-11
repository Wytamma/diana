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
import { genBankToGFFAndFasta } from "$lib/utils/gbkUtils";
    import { userPlotToWig } from "$lib/utils/userPlotToWig";

const toastStore = getToastStore();

let files: FileList;
let isLoading = false;

function extractFastaFromGff(gff: string): string {
    const lines = gff.split('\n');
    let fasta = '';
    let currentSequence = '';
    let inFastaBlock = false;

    for (const line of lines) {
        // Check if the line marks the start of the FASTA section
        if (line.startsWith('##') && line.includes('FASTA')) {
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
                if (name.endsWith('.gb') || name.endsWith('.gbk') || name.endsWith('.genbank')) {
                    const {gff, fasta} = genBankToGFFAndFasta(text);
                    await annotationStore.load(name, gff);
                    $igvStore.locus = undefined; // Reset the locus
                    if (fasta.length > 0) {
                        await referenceStore.load(name, fasta).catch((e) => {
                            console.error('Error loading reference:', e);
                            const error = 'Error loading reference: ' + e;
                            const t: ToastSettings = {
                                message: error,
                                background: 'variant-glass-error',
                            };
                            toastStore.trigger(t);
                        });
                        await taStore.load(fasta);
                        resolve(0);
                    }
                } else if (name.endsWith('.gff') || name.endsWith('.gff3')){
                    await annotationStore.load(name, text);
                    $igvStore.locus = undefined; // Reset the locus
                    const fasta = extractFastaFromGff(text);
                    if (fasta.length > 0) {
                            await referenceStore.load(name, fasta).catch((e) => {
                            console.error('Error loading reference:', e);
                            const error = 'Error loading reference: ' + e;
                            const t: ToastSettings = {
                                message: error,
                                background: 'variant-glass-error',
                            };
                            toastStore.trigger(t);
                        });
                        await taStore.load(fasta);
                        resolve(0);
                    }
                } else if (name.endsWith('.fasta') || name.endsWith('.fa') || name.endsWith('.fna')) {
                    await referenceStore.load(name, text);
                    await taStore.load(text);
                    $igvStore.locus = undefined; // Reset the locus
                    resolve(0);
                } else if (name.endsWith('.wig') || name.endsWith('.wiggle')) {
                    await insertStore.load(name, text);
                    resolve(0);
                } else if (name.endsWith('.userplot') || name.endsWith('.plot')) {
                    const firstChromosome = $annotationStore.chromosomes.keys().next().value;
                    if (!firstChromosome) {
                        console.error('No chromosome found in annotations');
                        const error = 'Please load annotations before loading userplot files';
                        const t: ToastSettings = {
                            message: error,
                            background: 'variant-glass-error',
                        };
                        toastStore.trigger(t);
                        reject('No chromosome found in annotations');
                    } else {
                    const t: ToastSettings = {
                            message: `Converting UserPlot file '${name}' to Wig Format. Assuming the first chromosome in the annotations is the reference chromosome`,
                            background: 'variant-glass-warning',
                        };
                    toastStore.trigger(t); 
                    const wig = await userPlotToWig(text, firstChromosome);
                    await insertStore.load(name, wig);
                    resolve(0);
                    }
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
    <div class="flex flex-col items-center align-baseline justify-center max-w-4xl  space-y-8 ">
        <!-- Animated Logo -->
        <figure class="card-hover rounded-full">
			<div>
				<section class="img-bg" />
			</div>
            <img 
                class={`logo-img mt-8`} 
                src="/images/logo2.png" 
                alt="Skeleton Logo" 
            />
        </figure>
        <h1 class=" text-center text-3xl mx-2">
            Transposon Sequencing Data Visualiser
        </h1>
    </div>
</div>
<div class="flex flex-col justify-center items-center mb-6">
    <div class="flex flex-wrap justify-center w-full">
        {#if $referenceStore.filename}
        <div class="m-2 w-full md:w-auto">
            <Reference type="Reference" filename={$referenceStore.filename} onRemove={referenceStore.reset}/> 
        </div>
        {/if}
        {#if $annotationStore.filename}
        <div class="m-2 w-full md:w-auto">
            <Reference type="Annotations" chip="variant-soft-warning" filename={$annotationStore.filename} onRemove={annotationStore.reset}/> 
        </div>
        {/if}
    </div>
    <div class="flex flex-wrap justify-center ">
        {#each Array.from($insertStore.entries()).sort(([filenameA], [filenameB]) => filenameA.localeCompare(filenameB)) as [filename, { isTreatment }], i }
        <div class="m-2 w-full md:w-auto ">
            <File 
                    isTreatment={isTreatment} 
                    onToggle={(value) => insertStore.setIsTreatment(filename, value)} 
                    onRemove={() => insertStore.remove(filename)} 
                    filename={filename} 
                />
        </div>    
        {/each}
    </div>
</div>
<div class="flex justify-center ">
    <div class="w-full max-w-3xl mx-4 mb-4" >
        
        {#if isLoading}
            <div class="flex items-center justify-center align-middle">
                <ProgressRadial value={undefined} width='w-16'  strokeLinecap="round" />
            </div>
        <!-- else -->
        {:else}
            <FileDropzone padding="py-4" bind:files={files} on:change={onChangeHandler} name="files" multiple={true} on:click={resetDropzone} on:drop={resetDropzone} >
                <svelte:fragment slot="lead">
                    <div class="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </div>
                </svelte:fragment>
                <svelte:fragment slot="message"><p class="text-xl "><span class="font-semibold">Load files</span> or drag and drop</p></svelte:fragment>
                <svelte:fragment slot="meta">GENBANK, GFF, FASTA, WIG and UserPlot files allowed.</svelte:fragment>
            </FileDropzone>
        {/if}
    </div>
</div>


<style lang="postcss">
    figure {
        @apply flex relative flex-col;
    }
    .img-bg {
        @apply w-48 h-48 mt-20 md:w-56 md:h-56 absolute z-[-1] rounded-full blur-[50px] transition-all;
        animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
            glow 5s linear infinite;
    }
    .logo-img {
        @apply w-48 h-48 md:w-56 md:h-56 drop-shadow-lg rounded-full hover:drop-shadow-xl transition-all duration-500;
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
