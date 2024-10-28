import type { GeneInsertResult } from "$lib/utils/generateGeneInsertSites";

export interface CompareResults {
    id: number;
    name: string;
    start: number;
    end: number;
    logFC?: number;      // Log Fold Change for comparison
  }
  
  export async function compareGeneInsertSites(
    controlData: GeneInsertResult[][],
    conditionData: GeneInsertResult[][],
    minReadCount = 0
  ): Promise<CompareResults[]> {
    const results: CompareResults[] = [];
  
    // Loop over each gene in the first dataset (assumes all datasets are aligned)
    for (let i = 0; i < controlData[0].length; i++) {
      const geneName = controlData[0][i].name;
      const start = controlData[0][i].start;
      const end = controlData[0][i].end;
  
      // Aggregate read counts for controls and conditions across replicates
      let controlReadSum = 0;
      let conditionReadSum = 0;
  
      for (let j = 0; j < controlData.length; j++) {
        controlReadSum += controlData[j][i].readCount;
      }
      for (let j = 0; j < conditionData.length; j++) {
        conditionReadSum += conditionData[j][i].readCount;
      }
  
      // Skip gene if read count doesn't meet minReadCount threshold in both conditions
      if (controlReadSum < minReadCount && conditionReadSum < minReadCount) {
        continue;
      }
  
      // Calculate log fold-change (logFC)
      const logFC = Math.log2((conditionReadSum + 1) / (controlReadSum + 1));
  
      // Placeholder for q-value calculation; could integrate with a stats library or server-side calculation
      // Example FDR correction would happen here after p-value calculation on all results
      // const qValue = undefined;  // Compute adjusted p-value as needed
  
      // Push the comparison result for this gene
      results.push({
        id: i,
        name: geneName,
        start: start,
        end: end,
        logFC: logFC,
      });
  
      // Yield control back to the event loop every few iterations to keep UI responsive
      if (i % 100 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
  
    // Optional: Add q-value (adjusted p-value) calculations here
    // This step typically involves calculating p-values across results and then adjusting them
    // Consider libraries such as `math.js` or a server-side approach for statistical calculations
  
    return results;
  }
  