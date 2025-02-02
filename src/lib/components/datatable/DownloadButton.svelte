<script lang="ts">
    import type { DataHandler } from '@vincjo/datatables';

	export let handler: DataHandler;
    let rowData = handler.getAllRows();
    
    function createCSV(): string {
        const headers = Object.keys($rowData[0])
        const rows: string[] = $rowData.map((row) => {
            return Object.entries(row).map(([key, value]) => {
                if (key === 'attributes') {
                    return Object.entries(value as Record<string, string>).map(([k, v]) => {
                        return `${k}=${v}`
                    }).join(';')
                }
                return value
            }).join(',')
        })
        rows.unshift(headers.join(','))
        return rows.join('\r\n')
    } 

    function download(filename: string): void {
        let csv = createCSV()
        const element = document.createElement('a')
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv))
        element.setAttribute('download', filename)

        element.style.display = 'none'
        document.body.appendChild(element)

        element.click()
        document.body.removeChild(element)
    }
</script>

<button 
    type="button" 
    on:click={() => download('diana.csv')}
    class="btn variant-ghost-surface mr-2 hover:variant-soft-primary"
>
   Export CSV 
</button>
