<script lang="ts">
  import { FileDropzone, ProgressRadial } from '@skeletonlabs/skeleton';
  import { annotationStore } from '$lib/stores/annotationStore';
  import { insertStore } from '$lib/stores/insertStore';
  import { taStore } from '$lib/stores/TAStore';
  import { referenceStore } from '$lib/stores/refStore';
  import { getToastStore } from '@skeletonlabs/skeleton';
  import type { ToastSettings } from '@skeletonlabs/skeleton';
  import { igvStore } from '$lib/stores/igvStore';
  import FileCard from '$lib/components/files/File.svelte';
  import Reference from '$lib/components/files/Reference.svelte';
  import { genBankToGFFAndFasta } from '$lib/utils/gbkUtils';
  import { stripGzExtension } from '$lib/utils/utils';
  import { userPlotToWig } from '$lib/utils/userPlotToWig';
  import { onMount } from 'svelte';
  import * as pako from 'pako';

  const toastStore = getToastStore();

  let files: FileList;
  let isLoading = false;

  // Helper function to decompress gzipped data
  function decompressGzip(data: Uint8Array): string {
    try {
      const decompressed = pako.ungzip(data, { to: 'string' });
      return decompressed;
    } catch (error) {
      throw new Error(`Failed to decompress gzip data: ${error}`);
    }
  }

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

  async function processFile(name: string, text: string): Promise<void> {
    // Strip .gz extension to get the actual file type
    const baseName = stripGzExtension(name);

    if (baseName.endsWith('.gb') || baseName.endsWith('.gbk') || baseName.endsWith('.genbank')) {
      let gff = '';
      let fasta = '';
      try {
        const gffAndFasta = genBankToGFFAndFasta(text);
        gff = gffAndFasta.gff;
        fasta = gffAndFasta.fasta;
      } catch (e) {
        console.error('Error converting GenBank file:', e);
        const error = 'Error converting GenBank file: ' + e;
        const t: ToastSettings = {
          message: error,
          background: 'variant-glass-error'
        };
        toastStore.trigger(t);
        throw new Error('Error converting GenBank file: ' + e);
      }
      await annotationStore.load(name, gff);
      $igvStore.locus = undefined; // Reset the locus
      if (fasta.length > 0) {
        await referenceStore.load(name, fasta).catch((e) => {
          console.error('Error loading reference:', e);
          const error = 'Error loading reference: ' + e;
          const t: ToastSettings = {
            message: error,
            background: 'variant-glass-error'
          };
          toastStore.trigger(t);
        });
        await taStore.load(fasta);
      }
    } else if (baseName.endsWith('.gff') || baseName.endsWith('.gff3')) {
      await annotationStore.load(name, text).catch((e) => {
        console.error('Error loading annotations:', e);
        const error = 'Error loading annotations: ' + e;
        const t: ToastSettings = {
          message: error,
          background: 'variant-glass-error'
        };
        toastStore.trigger(t);
        throw new Error('Error loading annotations: ' + e);
      });
      $igvStore.locus = undefined; // Reset the locus
      const fasta = extractFastaFromGff(text);
      if (fasta.length > 0) {
        await referenceStore.load(name, fasta).catch((e) => {
          console.error('Error loading reference:', e);
          const error = 'Error loading reference: ' + e;
          const t: ToastSettings = {
            message: error,
            background: 'variant-glass-error'
          };
          toastStore.trigger(t);
        });
        await taStore.load(fasta);
      }
    } else if (
      baseName.endsWith('.fasta') ||
      baseName.endsWith('.fa') ||
      baseName.endsWith('.fna')
    ) {
      await referenceStore.load(name, text);
      await taStore.load(text);
      $igvStore.locus = undefined; // Reset the locus
    } else if (baseName.endsWith('.wig') || baseName.endsWith('.wiggle')) {
      await insertStore.load(name, text);
    } else if (baseName.endsWith('.userplot') || baseName.endsWith('.plot')) {
      const firstChromosome = $annotationStore.chromosomes.keys().next().value;
      if (!firstChromosome) {
        console.error('No chromosome found in annotations');
        const error = 'Please load annotations before loading userplot files';
        const t: ToastSettings = {
          message: error,
          background: 'variant-glass-error'
        };
        toastStore.trigger(t);
        throw new Error('No chromosome found in annotations');
      } else {
        const t: ToastSettings = {
          message: `Converting UserPlot file '${name}' to Wig Format. Assuming the first chromosome in the annotations is the reference chromosome`,
          background: 'variant-glass-warning'
        };
        toastStore.trigger(t);
        const wig = await userPlotToWig(text, firstChromosome);
        await insertStore.load(name, wig);
      }
    } else {
      console.error('Unsupported file type:', name);
      const error = 'Unsupported file type: ' + name;
      const t: ToastSettings = {
        message: error,
        background: 'variant-glass-error'
      };
      toastStore.trigger(t);
      throw new Error('Unsupported file type: ' + name);
    }
  }

  async function loadFromUrl(url: string): Promise<void> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      const filename = url.split('/').pop() || url;
      let text: string;

      // Check if file is gzipped
      if (filename.endsWith('.gz')) {
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        text = decompressGzip(uint8Array);
      } else {
        text = await response.text();
      }

      await processFile(filename, text);
    } catch (e) {
      console.error('Error loading file from URL:', e);
      const error = 'Error loading file from URL: ' + e;
      const t: ToastSettings = {
        message: error,
        background: 'variant-glass-error'
      };
      toastStore.trigger(t);
      throw e;
    }
  }

  async function loadFilesFromUrls(urls: string[]): Promise<void> {
    isLoading = true;

    try {
      // Separate URLs by file type priority
      const referenceUrls: string[] = [];
      const annotationUrls: string[] = [];
      const insertUrls: string[] = [];

      for (const url of urls) {
        const filename = url.split('/').pop()?.toLowerCase() || '';
        const baseName = stripGzExtension(filename);

        // Reference files (FASTA)
        if (baseName.endsWith('.fasta') || baseName.endsWith('.fa') || baseName.endsWith('.fna')) {
          referenceUrls.push(url);
        }
        // Annotation files (GenBank, GFF)
        else if (
          baseName.endsWith('.gb') ||
          baseName.endsWith('.gbk') ||
          baseName.endsWith('.genbank') ||
          baseName.endsWith('.gff') ||
          baseName.endsWith('.gff3')
        ) {
          annotationUrls.push(url);
        }
        // Insert data files (WIG, UserPlot)
        else if (
          baseName.endsWith('.wig') ||
          baseName.endsWith('.wiggle') ||
          baseName.endsWith('.userplot') ||
          baseName.endsWith('.plot')
        ) {
          insertUrls.push(url);
        }
        // Unknown file type - add to the end
        else {
          insertUrls.push(url);
        }
      }

      // Load in order: references and annotations first (in parallel), then insert data
      await Promise.all([
        ...referenceUrls.map((url) => loadFromUrl(url)),
        ...annotationUrls.map((url) => loadFromUrl(url))
      ]);

      // Then load insert data after references/annotations are loaded
      await Promise.all(insertUrls.map((url) => loadFromUrl(url)));
    } catch (error) {
      console.error('Error loading files from URLs:', error);
    } finally {
      isLoading = false;
    }
  }

  onMount(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const dataParam = urlParams.get('data');

      if (dataParam) {
        const urls = dataParam
          .split(',')
          .map((url) => url.trim())
          .filter((url) => url.length > 0);
        if (urls.length > 0) {
          loadFilesFromUrls(urls);
        }
      }
    }
  });

  function onChangeHandler(e: Event): void {
    if (!files || files.length === 0) {
      return;
    }
    isLoading = true;

    // Separate files by type priority
    const referenceFiles: File[] = [];
    const annotationFiles: File[] = [];
    const insertFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const name = file.name.toLowerCase();
      const baseName = stripGzExtension(name);

      // Reference files (FASTA)
      if (baseName.endsWith('.fasta') || baseName.endsWith('.fa') || baseName.endsWith('.fna')) {
        referenceFiles.push(file);
      }
      // Annotation files (GenBank, GFF)
      else if (
        baseName.endsWith('.gb') ||
        baseName.endsWith('.gbk') ||
        baseName.endsWith('.genbank') ||
        baseName.endsWith('.gff') ||
        baseName.endsWith('.gff3')
      ) {
        annotationFiles.push(file);
      }
      // Insert data files (WIG, UserPlot)
      else {
        insertFiles.push(file);
      }
    }

    // Helper function to read and process a file
    const readAndProcessFile = (file: File): Promise<void> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          let text: string;

          // Check if file is gzipped
          if (file.name.endsWith('.gz')) {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            const uint8Array = new Uint8Array(arrayBuffer);
            text = decompressGzip(uint8Array);
          } else {
            text = e.target?.result?.toString() as string;
          }

          try {
            await processFile(file.name, text);
            resolve();
          } catch (error) {
            reject(error);
          }
        };

        // Read as ArrayBuffer if gzipped, otherwise as text
        if (file.name.endsWith('.gz')) {
          reader.readAsArrayBuffer(file);
        } else {
          reader.readAsText(file);
        }
      });
    };

    // Load files in order: references and annotations first, then insert data
    Promise.all([
      ...referenceFiles.map((file) => readAndProcessFile(file)),
      ...annotationFiles.map((file) => readAndProcessFile(file))
    ])
      .then(() => Promise.all(insertFiles.map((file) => readAndProcessFile(file))))
      .then(() => {
        isLoading = false;
      })
      .catch((error) => {
        console.error('Error reading files:', error);
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

<div class="flex justify-center mb-2">
  <div class="flex flex-col items-center align-baseline justify-center max-w-5xl space-y-4">
    <!-- Animated Logo -->
    <figure class="card-hover rounded-full">
      <div>
        <section class="img-bg" />
      </div>
      <img class={`logo-img mt-8`} src="/images/logo.webp" alt="Skeleton Logo" />
    </figure>
    <div class="text-center mx-2">
      <h1 class="text-6xl mb-1">Diana</h1>
      <p class="text-xl">
        A WebAssembly-Powered Tool for Transposon-Insertion Sequencing Data Exploration and Analysis
      </p>
    </div>
  </div>
</div>
<div class="flex flex-col justify-center items-center mb-4">
  <div class="flex flex-wrap justify-center w-full">
    {#if $referenceStore.filename}
      <div class="m-2 w-full md:w-auto">
        <Reference
          type="Reference"
          filename={$referenceStore.filename}
          onRemove={referenceStore.reset}
        />
      </div>
    {/if}
    {#if $annotationStore.filename}
      <div class="m-2 w-full md:w-auto">
        <Reference
          type="Annotations"
          chip="variant-soft-warning"
          filename={$annotationStore.filename}
          onRemove={annotationStore.reset}
        />
      </div>
    {/if}
  </div>
  <div class="flex flex-wrap justify-center">
    {#each Array.from($insertStore.entries()).sort( ([filenameA], [filenameB]) => filenameA.localeCompare(filenameB) ) as [filename, { isTreatment }], i}
      <div class="m-2 w-full md:w-auto">
        <FileCard
          {isTreatment}
          onToggle={(value) => insertStore.setIsTreatment(filename, value)}
          onRemove={() => insertStore.remove(filename)}
          {filename}
        />
      </div>
    {/each}
  </div>
</div>
<div class="flex justify-center">
  <div class="w-full max-w-3xl mx-4 mb-4">
    {#if isLoading}
      <div class="flex items-center justify-center align-middle">
        <ProgressRadial value={undefined} width="w-16" strokeLinecap="round" />
      </div>
      <!-- else -->
    {:else}
      <FileDropzone
        padding="py-4"
        bind:files
        on:change={onChangeHandler}
        name="files"
        multiple={true}
        on:click={resetDropzone}
        on:drop={resetDropzone}
      >
        <svelte:fragment slot="lead">
          <div class="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
          </div>
        </svelte:fragment>
        <svelte:fragment slot="message"
          ><p class="text-xl">
            <span class="font-semibold">Load files</span> or drag and drop
          </p></svelte:fragment
        >
        <svelte:fragment slot="meta"
          >GENBANK, GFF, FASTA, WIG and UserPlot files allowed (.gz supported).</svelte:fragment
        >
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
    animation:
      pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite,
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
