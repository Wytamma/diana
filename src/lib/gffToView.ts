import { createBlobURL } from './utils'
import Aioli from "@biowasm/aioli";

function sortGff(gffData: string): string {
    // Split content into lines
    const lines: string[] = gffData.split('\n');

    // Separate header lines and data lines
    const headerLines: string[] = [];
    const dataLines: string[] = [];

    lines.forEach(line => {
        if (line.startsWith('#')) {
            headerLines.push(line);
        } else if (line.trim() !== '') {
            dataLines.push(line);
        }
    });

    // Sort the data lines based on the first column (alphanumeric) and fourth column (numeric)
    dataLines.sort((a, b) => {
        const aCols: string[] = a.split('\t');
        const bCols: string[] = b.split('\t');
        const col1Comparison: number = aCols[0].localeCompare(bCols[0]);
        if (col1Comparison !== 0) {
            return col1Comparison;
        }
        // Ensure numeric comparison for the fourth column
        const col4Comparison: number = parseInt(aCols[3], 10) - parseInt(bCols[3], 10);
        return col4Comparison;
    });

    // Combine header lines and sorted data lines
    const result: string = [...headerLines, ...dataLines].join('\n');

    return result;
}

export function getAssembly(gffData: string): [string, number] {
    const lines: string[] = gffData.split('\n');
    for (const line of lines) {
        if (line.startsWith('##sequence-region')) {
            const parts: string[] = line.split(' ');
            const chromosome: string = parts[1];
            const chromosomeLength: number = parseInt(parts[3], 10);
            return [chromosome, chromosomeLength];
        }
    }
    throw new Error('Could not find the assembly information in the GFF file');
}


export async function gffToView(data:string, name:string, axis:string) {
    const processedData = sortGff(data); 
    
    const CLI = await new Aioli([
        "htslib/tabix/1.17",
	    "htslib/bgzip/1.17",
    ]);
    
    const paths = await CLI.mount([{
        name: name,
        data: processedData
    }]);
    const bgzipOUT = await CLI.exec(`bgzip ${paths[0]}`);
    const output = await CLI.exec(`tabix -p gff ${paths[0]}.gz`);

    const bgzipFileStat = await CLI.fs.stat(`${paths[0]}.gz`);
    const bgzipFile = await CLI.read({path:`${paths[0]}.gz`, length: bgzipFileStat.size});
    const url = createBlobURL(bgzipFile);
    const indexFileStat = await CLI.fs.stat(`${paths[0]}.gz.tbi`);
    const indexFile = await CLI.read({path:`${paths[0]}.gz.tbi`,  length: indexFileStat.size});
    const indexUrl = createBlobURL(indexFile);
    return {
        "alignment": "overlay",
        "linkingId": "SharedXAxis",
        "id": "1-gene",
        "height": 160,
        "data": {
        "url": url,
        "indexUrl": indexUrl,  
          "type": "gff",
          "attributesToFields": [
            {"attribute": "gene_biotype", "defaultValue": "unknown"},
            {"attribute": "Name", "defaultValue": "unknown"}
          ]
        },
        "color": {
          "type": "nominal",
          "field": "gene_biotype",
          "domain": [
            "protein_coding",
            "tRNA",
            "rRNA",
            "ncRNA",
            "pseudogene",
            "unknown"
          ],
          "range": ["#3498db", "#e74c3c", "#1abc9c", "#f1c40f", "#8e44ad", "#2c3e50"]
        },
        "tracks": [
          {
            "dataTransform": [
              {"type": "filter", "field": "type", "oneOf": ["gene"]},
              {"type": "filter", "field": "strand", "oneOf": ["+"]}
            ],
            "mark": "triangleRight",
            "x": {"field": "end", "type": "genomic", "axis": axis},
            "size": {"value": 30}
          },
          {
            "dataTransform": [
              {"type": "filter", "field": "type", "oneOf": ["gene"]}
            ],
            "mark": "text",
            "text": {"field": "Name", "type": "nominal"},
            "x": {"field": "start", "type": "genomic"},
            "xe": {"field": "end", "type": "genomic"},
            "style": {"dy": -15}
          },
          {
            "dataTransform": [
              {"type": "filter", "field": "type", "oneOf": ["gene"]},
              {"type": "filter", "field": "strand", "oneOf": ["-"]}
            ],
            "mark": "triangleLeft",
            "x": {"field": "start", "type": "genomic"},
            "size": {"value": 30},
            "style": {"align": "right"}
          },
          {
            "dataTransform": [
              {"type": "filter", "field": "type", "oneOf": ["gene"]},
              {"type": "filter", "field": "strand", "oneOf": ["+"]}
            ],
            "mark": "rule",
            "x": {"field": "start", "type": "genomic"},
            "strokeWidth": {"value": 10},
            "xe": {"field": "end", "type": "genomic"},
            "style": {"linePattern": {"type": "triangleRight", "size": 5}}
          },
          {
            "dataTransform": [
              {"type": "filter", "field": "type", "oneOf": ["gene"]},
              {"type": "filter", "field": "strand", "oneOf": ["-"]}
            ],
            "mark": "rule",
            "x": {"field": "start", "type": "genomic"},
            "strokeWidth": {"value": 10},
            "xe": {"field": "end", "type": "genomic"},
            "style": {"linePattern": {"type": "triangleLeft", "size": 5}}
          }
        ],
        "row": {"field": "strand", "type": "nominal", "domain": ["+", "-"]},
        "visibility": [
          {
            "operation": "less-than",
            "measure": "width",
            "threshold": "|xe-x|",
            "transitionPadding": 30,
            "target": "mark"
          }
        ],
        "style": {"background": "lightgray", "backgroundOpacity": 0},
        "opacity": {"value": 0.8},
    }
}