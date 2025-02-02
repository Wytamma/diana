<script lang="ts">

    // Props: the attribute key, the attribute value, and an optional maxLength
    export let keyName: string;
    export let value: string;
    export let maxLength: number = 15; // default maximum length
  
    function showFullValue() {
        if (maxLength === value.length) {
            maxLength = 15;
        } else {
            maxLength = value.length;
        }
    }
    // A helper function to truncate the value if needed
    function truncateValue(text: string, max: number): string {
      return text.length > max ? text.substring(0, max) + '...' : text;
    }

  </script>

  <!-- The chip container using Tailwind CSS classes -->
  <button on:click={showFullValue} class="inline-flex items-center rounded m-1 overflow-hidden border border-surface-200 [&>*]:pointer-events-none">
    <!-- Display the key in a bold font followed by a colon -->
    <span class="font-semibold bg-surface-500 px-1 py-1">{keyName}</span>
    <!-- Display the (possibly truncated) value -->
    <span class=" px-1 py-1 mr-1">{truncateValue(value, maxLength)}</span>
  </button>
  