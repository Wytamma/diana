import type { Feature } from '$lib/stores/annotationStore';

export interface GeneInsertResult {
  seqId: string;
  name: string;
  start: number;
  end: number;
  strand: '+' | '-';
  readCount: number;
  insIndex: number;
  featureLength: number;
  insertCount: number;
}

export async function generateGeneInsertSites(
  features: Feature[],
  insertData: Map<string, number[]>
): Promise<GeneInsertResult[]> {
  const results: GeneInsertResult[] = [];

  for (let i = 0; i < features.length; i++) {
    const feature = features[i];
    const chromosome = feature.seqId;
    const featureLength = feature.stop - feature.start + 1;

    let readCount = 0;
    let insertCount = 0;

    // Sum the read counts within the range
    for (let j = feature.start; j <= feature.stop; j++) {
      const insertDataForChromosome = insertData.get(chromosome) || [];
      if (insertDataForChromosome[j]) {
        readCount += insertDataForChromosome[j];
        if (insertDataForChromosome[j] > 0) {
          insertCount++;
        }
      }
    }

    const insIndex = insertCount / (feature.stop - feature.start + 1);

    // Store the result for this feature
    results.push({
      seqId: feature.seqId,
      name: feature.attributes.Name || '',
      start: feature.start,
      end: feature.stop,
      strand: feature.strand,
      readCount,
      insIndex,
      featureLength,
      insertCount
    });

    // Yield control back to the event loop every few iterations to keep the UI responsive.
    if (i % 100 === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  return results;
}
