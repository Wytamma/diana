import type { GeneInsertResult } from "$lib/utils/generateGeneInsertSites";

export interface CompareResults {
    name: string;
    start: number;
    logFC?: number;      // Log Fold Change for comparison
    qValue?: number;     // Adjusted p-value (FDR)
  }
  
  export async function compareGeneInsertSites(
    controlData: GeneInsertResult[][],
    conditionData: GeneInsertResult[][],
    minReadCount = 0
  ): Promise<CompareResults[]> {
    const results: CompareResults[] = [];
  
    // Ensure control and condition arrays are of the same length
    if (controlData.length !== conditionData.length) {
      throw new Error("Control and condition datasets must have the same number of samples.");
    }
  
    // Loop over each gene in the first dataset (assumes all datasets are aligned)
    for (let i = 0; i < controlData[0].length; i++) {
      const geneName = controlData[0][i].name;
      const start = controlData[0][i].start;
  
      // Aggregate read counts for controls and conditions across replicates
      let controlReadSum = 0;
      let conditionReadSum = 0;
  
      for (let j = 0; j < controlData.length; j++) {
        controlReadSum += controlData[j][i].readCount;
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
      const qValue = undefined;  // Compute adjusted p-value as needed
  
      // Push the comparison result for this gene
      results.push({
        name: geneName,
        start: start,
        logFC: logFC,
        qValue: qValue
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
  