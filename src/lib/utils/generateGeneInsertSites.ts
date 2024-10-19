import type { Feature } from "$lib/stores/annotationStore";
import { taStore } from "../stores/TAStore";

export interface GeneInsertResult {
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

export function generateGeneInsertSites(
  genes: Feature[],
  plotData: number[],
  taSites: number[],
  trim5 = 0,
  trim3 = 0
): GeneInsertResult[] {
  const results: GeneInsertResult[] = [];

  for (const gene of genes) {
    const geneLength = gene.end - gene.start + 1;
    
    // Calculate trimmed start and end positions
    const readStart = gene.strand === "+"
      ? gene.start + Math.floor(trim5 * geneLength)
      : gene.start + Math.floor(trim3 * geneLength);
    const readEnd = gene.strand === "+"
      ? gene.end - Math.floor(trim3 * geneLength)
      : gene.end - Math.floor(trim5 * geneLength);
    
    let readCount = 0;
    let insertCount = 0;

    // Sum the read counts within the trimmed range
    for (let i = readStart; i <= readEnd; i++) {
      if (plotData[i]) {
        readCount += plotData[i];
        if (plotData[i] > 0) {
          insertCount++;
        }
      }
    }

    // Find the TA sites within the trimmed range
    const geneTASites = []//taSites.filter((site) => site >= readStart && site <= readEnd);
    const saturation = 0//insertCount / geneTASites.length;

    const insIndex = insertCount / (readEnd - readStart + 1);

    // Store the result for this gene
    results.push({
      name: gene.attributes.Name,
      start: gene.start,
      end: gene.end,
      strand: gene.strand,
      readCount,
      insIndex,
      geneLength,
      insertCount,
      saturation,
      numberTASites: geneTASites.length
    });
  }

  return results;
}
