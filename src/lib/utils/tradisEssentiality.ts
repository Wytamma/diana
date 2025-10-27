import jStat from 'jstat';

export interface PlotData {
  density: number[];
  loess: number[];
  gammaFits: {
    x: number[];
    y1: number[];
    y2: number[];
  };
  changepoints: {
    essen: number;
    ambig: number;
  };
}

function calculateHistogram(
  data: number[],
  binCount: number
): { bins: number[]; counts: number[] } {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binSize = (max - min) / binCount;
  const bins = Array.from({ length: binCount }, (_, i) => min + i * binSize);
  const counts = Array(binCount).fill(0);

  for (const value of data) {
    const binIndex = Math.min(Math.floor((value - min) / binSize), binCount - 1);
    counts[binIndex]++;
  }

  return { bins, counts };
}

function loessSmooth(data: number[], bandwidth: number): number[] {
  const smoothed = data.map((_, i, arr) => {
    const weights = arr.map((_, j) => {
      const distance = Math.abs(i - j) / bandwidth;
      return Math.exp((-distance * distance) / 2);
    });

    const weightSum = weights.reduce((a, b) => a + b, 0);
    return arr.reduce((sum, y, j) => sum + weights[j] * y, 0) / weightSum;
  });

  return smoothed;
}

function fitExponential(data: number[]): number {
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
  return 1 / mean;
}

function fitGamma(data: number[]): { shape: number; rate: number } {
  const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
  const variance = data.reduce((sum, value) => sum + (value - mean) ** 2, 0) / data.length;
  const shape = (mean * mean) / variance;
  const rate = mean / variance;
  return { shape, rate };
}

export interface GeneInsertResult {
  name: string;
  start: number;
  end: number;
  strand: '+' | '-';
  readCount: number;
  insIndex: number;
  geneLength: number;
  insertCount: number;
}

export interface GeneEssentialityResult {
  essenGenes: GeneInsertResult[];
  ambigGenes: GeneInsertResult[];
  plotData: PlotData;
}

export function tradisEssentiality(geneInsertResults: GeneInsertResult[]): GeneEssentialityResult {
  const insIndices = geneInsertResults.map((gene) => gene.insIndex);

  // Identify second maxima
  const binCount = 200;
  const { bins, counts } = calculateHistogram(insIndices, binCount);
  const densities = counts.map((count) => count / insIndices.length);
  const maxIndex =
    densities.slice(10).reduce((maxIdx, val, idx) => (val > densities[maxIdx] ? idx : maxIdx), 0) +
    10;
  const maxVal = bins[maxIndex + 3];

  // Find inter-mode minima with loess
  const nG = insIndices.length;
  const r = Math.floor(maxVal * 2000);
  const filteredIndices = insIndices.filter((i) => i < r / 2000);
  const filteredHist = calculateHistogram(filteredIndices, binCount);
  const filteredDensities = filteredHist.counts.map((count) => count / filteredIndices.length);

  const loessFit = loessSmooth(filteredDensities, 0.3);

  const minimaIndex = loessFit.reduce(
    (minIdx, val, idx) => (val < loessFit[minIdx] ? idx : minIdx),
    0
  );
  const m = filteredHist.bins[minimaIndex];

  const I1 = insIndices.filter((i) => i < m && i >= 0);
  const I2 = insIndices.filter((i) => i >= m && i < Math.max(...bins));

  const f1 = (I1.length + insIndices.filter((i) => i === 0).length) / nG;
  const f2 = I2.length / nG;

  const d1 = fitExponential(I1);
  const d2 = fitGamma(I2);

  // Calculate log-odds ratios to choose thresholds
  const lower = Array.from({ length: 1000 }, (_, i) => (i + 1) / 10000).findIndex((x) => {
    const p1 = jStat.gamma.cdf(x, d2.shape, d2.rate);
    const p2 = 1 - jStat.exponential.cdf(x, d1);
    return Math.log2((p1 * p2) / ((1 - p1) * (1 - p2))) < -2;
  });

  const upper = Array.from({ length: 1000 }, (_, i) => (i + 1) / 10000).findIndex((x) => {
    const p1 = jStat.gamma.cdf(x, d2.shape, d2.rate);
    const p2 = 1 - jStat.exponential.cdf(x, d1);
    return Math.log2((p1 * p2) / ((1 - p1) * (1 - p2))) > 2;
  });

  const essen = lower / 10000;
  const ambig = upper / 10000;

  const gammaFitsX = Array.from({ length: 201 }, (_, i) => i / 500);
  const gammaFitY1 = gammaFitsX.map((x) => f1 * jStat.exponential.pdf(x, d1));
  const gammaFitY2 = gammaFitsX.map((x) => f2 * jStat.gamma.pdf(x, d2.shape, d2.rate));

  // Identify essential and ambiguous genes based on calculated thresholds
  const essenGenes = geneInsertResults.filter((gene) => gene.insIndex < essen);
  const ambigGenes = geneInsertResults.filter(
    (gene) => gene.insIndex >= essen && gene.insIndex < ambig
  );

  return {
    essenGenes,
    ambigGenes,
    plotData: {
      density: densities,
      loess: loessFit,
      gammaFits: {
        x: gammaFitsX,
        y1: gammaFitY1,
        y2: gammaFitY2
      },
      changepoints: {
        essen,
        ambig
      }
    }
  };
}
