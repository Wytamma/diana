interface EmblFeature {
  type: string;
  start: number;
  end: number;
  strand: string;
  attributes: { [key: string]: string };
}

interface EmblData {
  seqid: string;
  source: string;
  features: EmblFeature[];
}

interface Gff3Feature {
  seqid: string;
  source: string;
  type: string;
  start: number;
  end: number;
  score: string;
  strand: string;
  phase: string;
  attributes: string;
}

function parseEmbl(emblContent: string): EmblData {
  const features: EmblFeature[] = [];
  const lines = emblContent.split('\n');

  let currentFeature: EmblFeature | null = null;
  let seqid: string | null = null;
  let source: string | null = null;

  for (const line of lines) {
    if (line.startsWith('ID   ')) {
      const match = line.match(/^ID\s+(\S+)/);
      if (match) {
        seqid = match[1];
        seqid = seqid.replace(';', '');
      }
    } else if (line.startsWith('OS   ')) {
      const match = line.match(/^OS\s+(.+)/);
      if (match) {
        source = match[1].trim().replace(/ /g, '_');
      }
    } else if (line.startsWith('FT   ')) {
      const match = line.match(/^FT\s+(\S+)\s+(\d+)\.\.(\d+)(\s+)?(.*)?$/);
      if (match) {
        if (currentFeature) {
          features.push(currentFeature);
        }

        currentFeature = {
          type: match[1],
          start: parseInt(match[2], 10),
          end: parseInt(match[3], 10),
          strand: '+',
          attributes: {}
        };
      } else if (currentFeature && line.startsWith('FT                   /')) {
        const attrMatch = line.match(/^FT\s+\/(\S+)=(.*)$/);
        if (attrMatch) {
          currentFeature.attributes[attrMatch[1]] = attrMatch[2].replace(/"/g, '');
        }
      }
    } else if (line.startsWith('XX') && currentFeature) {
      break;
    }
  }

  if (currentFeature) {
    features.push(currentFeature);
  }

  if (!seqid) {
    throw new Error('SeqID not found in EMBL file');
  }

  if (!source) {
    source = 'unknown';
  }

  return {
    seqid,
    source,
    features
  };
}

function emblToGff3(emblData: EmblData): Gff3Feature[] {
  const { seqid, source, features } = emblData;

  return features.map((feature) => {
    const attributes = Object.entries(feature.attributes)
      .map(([key, value]) => `${key}=${value}`)
      .join(';');

    return {
      seqid,
      source,
      type: feature.type,
      start: feature.start,
      end: feature.end,
      score: '.',
      strand: feature.strand,
      phase: '.',
      attributes
    };
  });
}

function writeGff3(gff3Features: Gff3Feature[]): string {
  const header = ['##gff-version 3', '#!gff-spec-version 1.21', '#!gff-spec-date 2012-07-03'];

  const entries = gff3Features.map((feature) => {
    return [
      feature.seqid,
      feature.source,
      feature.type,
      feature.start,
      feature.end,
      feature.score,
      feature.strand,
      feature.phase,
      feature.attributes
    ].join('\t');
  });

  return [...header, ...entries].join('\n');
}

export function convertEmblToGff3(emblContent: string): string {
  const emblData = parseEmbl(emblContent);
  const gff3Features = emblToGff3(emblData);
  return writeGff3(gff3Features);
}
