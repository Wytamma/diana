<script lang="ts">
    import { SlideToggle } from "@skeletonlabs/skeleton";
    import { removeFileExtension } from "./utils";

    export let filename: string
    export let onRemove: () => void
    export let onToggle: (isTreatment: boolean) => void

    export let isTreatment: boolean = false;

    

</script>
<div class="card p-4">
    <div class="flex justify-center items-center space-x-2">
        <div class="flex flex-col space-y-2 w-full">
            <p class="text-lg">{removeFileExtension(filename)}</p>
            <div class="flex justify-between items-center min-w-64">
                <SlideToggle active="variant-soft-primary" size='sm' class="mr-2" name="slide" on:change={() => onToggle(isTreatment)} bind:checked={isTreatment}><span class={`chip ${isTreatment ?  'variant-soft-primary' : 'variant-soft-surface'}`}>{isTreatment ?  'Treatment' : 'Control'}</span></SlideToggle>
                <button type="button" class="btn-icon hover:variant-ringed-tertiary" on:click={onRemove} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>                      
                </button>
            </div>
        </div>
    </div>
</div>