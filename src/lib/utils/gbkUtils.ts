type Feature = {
  type: string;
  start: number;
  end: number;
  strand: string;
  attributes: Record<string, string>;
};

export function genBankToGFFAndFasta(genBankText: string): { gff: string; fasta: string } {
  const lines = genBankText.split("\n");
  const gffLines: string[] = ["##gff-version 3"];
  const fastaLines: string[] = [];
  let currentSequence = "";
  let sequenceStarted = false;
  let currentFeature: Partial<Feature> | null = null;
  const features: Feature[] = [];
  let currentLocus = "";

  const parseLocation = (location: string): { start: number; end: number; strand: string } => {
    let strand = "+";
    if (location.startsWith("complement(")) {
      strand = "-";
      location = location.replace("complement(", "").replace(")", "");
    }
    const [startStr, endStr] = location.split("..");
    return { start: parseInt(startStr, 10), end: parseInt(endStr, 10), strand };
  };

  const processLocus = () => {
    if (currentLocus && currentSequence) {
      fastaLines.push(`>${currentLocus}`);
      for (let i = 0; i < currentSequence.length; i += 60) {
        fastaLines.push(currentSequence.slice(i, i + 60));
      }
      features.forEach((feature) => {
        if (feature.attributes["gene"]) {
          feature.attributes["Name"] = feature.attributes["gene"];
        } else if (feature.attributes["product"]) {
          feature.attributes["Name"] = feature.attributes["product"];
        } else if (feature.attributes["note"]) {
          feature.attributes["Name"] = feature.attributes["note"];
        } if (feature.type === "source") {
          feature.attributes["Name"] = feature.attributes["organism"]; 
        }
        const attributes = Object.entries(feature.attributes || {})
          .map(([key, value]) => `${key}=${value}`)
          .join(";");
        gffLines.push(
          `${currentLocus}\tdiana\t${feature.type}\t${feature.start}\t${feature.end}\t.\t${feature.strand}\t.\t${attributes}`
        );
      });
      currentSequence = "";
      sequenceStarted = false;
      currentFeature = null;
      currentLocus = "";
      features.length = 0;
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("LOCUS")) {
      processLocus();
      currentLocus = line.split(/\s+/)[1];
    } else if (line.startsWith("FEATURES")) {
      // Start of the FEATURES section
    } else if (line.startsWith("ORIGIN")) {
      sequenceStarted = true;
    } else if (sequenceStarted) {
      currentSequence += line.replace(/[^a-zA-Z]/g, "");
    } else if (line.trim().startsWith("CDS") || line.trim().startsWith("gene") || line.trim().startsWith("source")) {
      const parts = line.trim().split(/\s+/, 2);
      if (parts.length === 2) {
        const featureType = parts[0];
        const location = parts[1];
        const { start, end, strand } = parseLocation(location);
        if (currentFeature) features.push(currentFeature as Feature);
        currentFeature = {
          type: featureType,
          start,
          end,
          strand,
          attributes: {},
        };
      }
    } else if (currentFeature && line.trim().startsWith("/")) {
      const qualifierMatch = line.trim().match(/^\/(\S+?)=(?:"(.+?)"|(.+))/);
      if (qualifierMatch) {
        const [, key, valueQuoted, valueUnquoted] = qualifierMatch;
        const value = valueQuoted || valueUnquoted || "";
        currentFeature.attributes![key] = value;
      }
    } else if (currentFeature && /^\s+[^/]/.test(line)) {
      const lastKey = Object.keys(currentFeature.attributes!).pop();
      if (lastKey) {
        currentFeature.attributes![lastKey] += line.trim(); // Concatenate trimmed content
      }
    } else {
      console.log("Unhandled line:", line);
    }
  });

  processLocus();

  return {
    gff: gffLines.join("\n"),
    fasta: fastaLines.join("\n"),
  };
}
