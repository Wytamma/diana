type Feature = {
  type: string;
  start: number;
  end: number;
  strand: string;
  attributes: Record<string, string>;
};

type LocusRecord = {
  locusId: string;
  sequence: string;
  features: Feature[];
};

/**
 * Parses a GenBank location string (e.g. "complement(<123..>456)") into numeric boundaries and strand.
 */
const parseLocation = (location: string): { start: number; end: number; strand: string } => {
  let strand = "+";
  if (location.startsWith("complement(")) {
    strand = "-";
    location = location.replace("complement(", "").replace(")", "");
  }
  // Remove uncertainty markers.
  location = location.replace(/</g, "").replace(/>/g, "");
  const [startStr, endStr] = location.split("..");
  const start = parseInt(startStr, 10);
  const end = parseInt(endStr, 10);
  if (isNaN(start) || isNaN(end)) {
    throw new Error(`Invalid location: ${location}`);
  }
  return { start, end, strand };
};

/**
 * Parses the FEATURES section
 */
function parseFeatures(featureText: string): Feature[] {
  const lines = featureText.split("\n");

  // Accumulator interface for our reducer.
  interface FeatureAcc {
    features: Feature[];
    currentFeature: Partial<Feature> | null;
    multiline: boolean;
  }
  const init: FeatureAcc = { features: [], currentFeature: null, multiline: false };

  const result = lines.reduce((acc, line) => {
    // Regular expression to detect a new feature line.
    const featureLineRegex = /^\s+([a-zA-Z_]+)\s+((?:complement\()?[<>]?\d+\.\.[<>]?\d+\)?)/;
    if (featureLineRegex.test(line)) {
      // Finalize any current feature.
      if (acc.currentFeature) {
        acc.features.push(acc.currentFeature as Feature);
      }
      const match = line.match(featureLineRegex);
      if (match) {
        const featureType = match[1];
        const location = match[2];
        const { start, end, strand } = parseLocation(location);
        acc.currentFeature = {
          type: featureType,
          start,
          end,
          strand,
          attributes: {},
        };
      }
      acc.multiline = false;
    } else if (line.trim().startsWith("/")) {
      // Process a qualifier line (e.g. /gene="abc")
      const qualifierMatch = line.trim().match(/^\/(\S+?)=(?:"([^"]+)"|(.+))/);
      if (qualifierMatch && acc.currentFeature) {
        const [, key, quotedValue, unquotedValue] = qualifierMatch;
        const value = quotedValue || unquotedValue || "";
        acc.currentFeature.attributes![key] = value;
        // If the qualifier appears to span multiple lines.
        acc.multiline =
          (value.startsWith('"') && !value.endsWith('"')) ||
          (value.startsWith('(') && !value.endsWith(')'));
      }
    } else if (acc.multiline && acc.currentFeature && /^\s+[^/]/.test(line)) {
      // Handle continuation of a multi-line qualifier.
      const keys = Object.keys(acc.currentFeature.attributes!);
      const lastKey = keys[keys.length - 1];
      if (lastKey) {
        acc.currentFeature.attributes![lastKey] += line.trim();
      }
      if (line.trim().endsWith('"')) {
        acc.multiline = false;
      }
    } else if (acc.currentFeature) {
      // Any unexpected line finalizes the current feature.
      acc.features.push(acc.currentFeature as Feature);
      acc.currentFeature = null;
      acc.multiline = false;
    }
    return acc;
  }, init);

  // Push any feature that might still be active.
  if (result.currentFeature) {
    result.features.push(result.currentFeature as Feature);
  }
  return result.features;
}

/**
 * Parses a single GenBank record into a pure data structure.
 */
function parseLocusRecord(recordText: string): LocusRecord {
  const lines = recordText.split("\n");
  const locusLine = lines.find(line => line.startsWith("LOCUS"));
  const locusId = locusLine ? locusLine.split(/\s+/)[1] : "";

  // Extract the FEATURES section (everything between FEATURES and ORIGIN).
  const featuresSectionMatch = recordText.match(/FEATURES\s+([\s\S]+?)ORIGIN/);
  const featureText = featuresSectionMatch ? featuresSectionMatch[1] : "";
  const features = parseFeatures(featureText);

  // Extract and clean the sequence from the ORIGIN section.
  const originMatch = recordText.match(/ORIGIN\s+([\s\S]+)/);
  const rawSequence = originMatch ? originMatch[1] : "";
  const sequence = rawSequence.replace(/[^a-zA-Z]/g, "");

  return { locusId, sequence, features };
}

/**
 * Converts a GenBank file (which may contain several locus records) into GFF and FASTA formats.
 * This function uses a more functional approach by splitting the text into records and then
 * mapping pure functions over them.
 */
export function genBankToGFFAndFasta(genBankText: string): { gff: string; fasta: string } {
  // Split the file into records based on the LOCUS keyword.
  const recordsText = genBankText.split(/\n(?=LOCUS)/);
  const records = recordsText.map(parseLocusRecord);

  // Build the FASTA output.
  const fastaOutput = records.map(record => {
    const lines = [`>${record.locusId}`];
    for (let i = 0; i < record.sequence.length; i += 60) {
      lines.push(record.sequence.slice(i, i + 60));
    }
    return lines.join("\n");
  });

  // Build the GFF output.
  const gffOutput = ["##gff-version 3"];
  records.forEach(record => {
    record.features.forEach(feature => {
      // Normalize the "Name" attribute from various possible qualifiers.
      const attrs = { ...feature.attributes };
      if (attrs["name"] || attrs["Name"]) {
        attrs["Name"] = attrs["name"] || attrs["Name"];
      } else if (attrs["gene"]) {
        attrs["Name"] = attrs["gene"];
      } else if (attrs["product"]) {
        attrs["Name"] = attrs["product"];
      } else if (attrs["locus_tag"]) {
        attrs["Name"] = attrs["locus_tag"];
      }
      if (feature.type === "source" && attrs["organism"]) {
        attrs["Name"] = attrs["organism"];
      }
      const attributeString = Object.entries(attrs)
        .map(([key, value]) => `${key}=${value.replace(/"/g, "").replace(/;/g, ",")}`)
        .join(";");
      gffOutput.push(
        `${record.locusId}\tdiana\t${feature.type}\t${feature.start}\t${feature.end}\t.\t${feature.strand}\t.\t${attributeString}`
      );
    });
  });

  return {
    gff: gffOutput.join("\n"),
    fasta: fastaOutput.join("\n"),
  };
}
