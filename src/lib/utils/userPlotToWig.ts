

// This function converts a user plot string to a wig string.
// The user plot string is a string of numbers separated by newlines.
// The wig string is a string that follows the wig format.
// The function processes the user plot string in chunks to prevent freezing.
// The function returns the wig string.
export async function userPlotToWig(userPlot: string, chromosome: string, chunkSize: number = 50000): Promise<string> {
    const wigLines = []
    wigLines.push(`variableStep chrom=${chromosome}`)
    const lines = userPlot.split("\n")
    for (let i = 0; i < lines.length; i += chunkSize) {
        const chunk = lines.slice(i, i + chunkSize)
        chunk.forEach((line, index) => {
            const [plus, minusValue] = line.split(/\s+/).map((x) => parseInt(x, 10));
            // if minus undefined, set to 0 (some files only have one number)
            let minus = minusValue;
            if (isNaN(minus)) minus = 0;
            if (plus !== 0)
                wigLines.push(`${i + index} ${plus}`);
            if (minus !== 0)
                wigLines.push(`${i + index} -${minus}`);
        });
        // Yield control back to the main thread every chunk to keep the UI responsive.
        await new Promise((resolve) => setTimeout(resolve, 0)); 
    }
    return wigLines.join('\n');
    
    
}