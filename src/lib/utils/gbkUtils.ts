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
  let inFeature = false;
  const features: Feature[] = [];
  let currentLocus = "";
  let multilineValue = false;

  const parseLocation = (location: string): { start: number; end: number; strand: string } => {
    let strand = "+";
    if (location.startsWith("complement(")) {
      strand = "-";
      location = location.replace("complement(", "").replace(")", "");
    }
    location = location.replace("<", "").replace(">", "");
    const [startStr, endStr] = location.split("..");
    if (isNaN(parseInt(startStr, 10)) || isNaN(parseInt(endStr, 10))) {
      throw new Error(`Invalid location: ${location}`);
    }
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
        } else if (feature.attributes["locus_tag"]) {
          feature.attributes["Name"] = feature.attributes["locus_tag"];
        } 
        if (feature.type === "source") {
          feature.attributes["Name"] = feature.attributes["organism"]; 
        }
        const attributes = Object.entries(feature.attributes || {})
          .map(([key, value]) => `${key}=${value.replace(/"/g, "")}`)
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
      inFeature = false;
    }
  };

  lines.forEach((line) => {
    if (line.startsWith("LOCUS")) {
      processLocus();
      currentLocus = line.split(/\s+/)[1];
    } else if (line.startsWith("FEATURES")) {
      // Start of the FEATURES section
      inFeature = true;
    } else if (line.startsWith("ORIGIN")) {
      inFeature = false;
      sequenceStarted = true;
    } else if (sequenceStarted) {
      currentSequence += line.replace(/[^a-zA-Z]/g, "");
    } else if (inFeature &&  /^\s+(?:[a-zA-Z_]+)\s+(complement\()?<?\d+\.\.>?\d+\)?$/.test(line)) {
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
    } else if (inFeature && currentFeature && line.trim().startsWith("/")) {
      const qualifierMatch = line.trim().match(/^\/(\S+?)=(?:"(.+?)"|(.+))/);
      if (qualifierMatch) {
        const [, key, valueQuoted, valueUnquoted] = qualifierMatch;
        const value = valueQuoted || valueUnquoted || "";
        if ((value.startsWith('"') && !value.endsWith('"')) || (value.startsWith('(') && !value.endsWith(')'))) {
          // Multi-line value
          multilineValue = true;
        }
        currentFeature.attributes![key] = value;
      } else {
        console.log("Invalid qualifier:", line);
      }
    } else if (multilineValue && inFeature && currentFeature && /^\s+[^/]/.test(line)) {
      const lastKey = Object.keys(currentFeature.attributes!).pop();
      if (lastKey) {
        currentFeature.attributes![lastKey] += line.trim(); // Concatenate trimmed content
      }
      if (line.trim().endsWith('"')) {
        multilineValue = false;
      }
    } else if (inFeature && currentFeature) {
      console.log("Invalid line in feature:", line);
      features.push(currentFeature as Feature);
      currentFeature = null;
    } else {
      // console.log("Unhandled line:", line);
    }
  });

  processLocus();

  return {
    gff: gffLines.join("\n"),
    fasta: fastaLines.join("\n"),
  };
}
