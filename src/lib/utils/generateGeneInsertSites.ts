import type { Feature } from "$lib/stores/annotationStore";

export interface GeneInsertResult {
  seqId: string;
  name: string;
  start: number;
  end: number;
  strand: "+" | "-";
  readCount: number;
  insIndex: number;
  geneLength: number;
  insertCount: number;
  saturation: number;
  numberTASites: number;
}

export async function generateGeneInsertSites(
  genes: Feature[],
  insertData: number[],
  taSites: number[],
  trim5 = 0,
  trim3 = 0
): Promise<GeneInsertResult[]> {
  const results: GeneInsertResult[] = [];

  for (let i = 0; i < genes.length; i++) {
    const gene = genes[i];
    const geneLength = gene.stop - gene.start + 1;
    
    // Calculate trimmed start and end positions
    const readStart = gene.strand === "+"
      ? gene.start + Math.floor(trim5 * geneLength)
      : gene.start + Math.floor(trim3 * geneLength);
    const readEnd = gene.strand === "+"
      ? gene.stop - Math.floor(trim3 * geneLength)
      : gene.stop - Math.floor(trim5 * geneLength);
    
    let readCount = 0;
    let insertCount = 0;

    // Sum the read counts within the trimmed range
    for (let j = readStart; j <= readEnd; j++) {
      if (insertData[j]) {
        readCount += insertData[j];
        if (insertData[j] > 0) {
          insertCount++;
        }
      }
    }

    // Find the TA sites within the trimmed range
    const geneTASites = taSites.filter((site) => site >= readStart && site <= readEnd);
    const saturation = geneTASites.length > 0 ? insertCount / geneTASites.length : 0;

    const insIndex = insertCount / (readEnd - readStart + 1);

    // Store the result for this gene
    results.push({
      seqId: gene.seqId,
      name: gene.attributes.Name,
      start: gene.start,
      end: gene.stop,
      strand: gene.strand,
      readCount,
      insIndex,
      geneLength,
      insertCount,
      saturation,
      numberTASites: geneTASites.length
    });

    // Yield control back to the event loop every few iterations to keep the UI responsive.
    if (i % 100 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  return results;
}
