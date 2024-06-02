import { createBlobURL } from './utils';

function convertUserPlotDataToCSV(userPlotData: string) {
    // Split the userPlotData string by newline characters
    const lines = userPlotData.split('\n');

    // Create an array to store the CSV data
    let csvData: string[] = [];

    // Iterate over each line in the userPlotData
    let lineNumber = 0;
    for (const line of lines) {
        // Split the line by spaces
        lineNumber++;
        const [plus, minus] = line.split(' ');
        if (plus === '0' && minus === '0') {
            continue;
        }
        const values = [lineNumber.toString(), plus, minus, parseInt(plus) + parseInt(minus)];
        csvData.push(values.join(','));
    }
    // Return the CSV data as a string
    return csvData.join('\n');
}

export function userPlotToView(userPlotData: string, name: string) {
    // console.log("userPlotData", userPlotData);
            // Base64 encoded data

    let userPlotDataCSV = convertUserPlotDataToCSV(userPlotData);
    let blobURL = createBlobURL(userPlotDataCSV);
    let domain = [0, 17];
    return {
        "alignment": "overlay",
        "height": 100,
        "tracks":[
          {
              "layout": "linear",
              "data": {
                  "url": blobURL,
                  "type": "csv",
                  "genomicFields": ["position", "plus", "minus", "total"],
                  "headerNames": ["position", "plus", "minus", "total"],
              },
              "x": {"field": "position", "type": "genomic", "linkingId": "SharedXAxis", "axis": "none"},
              "y": {"field": "plus", "type": "quantitative", "axis": "none", "domain": domain},
              "title": name,
              "mark": "bar",
              "color": {"value": "#3498db"},
          },
          {
              "layout": "linear",
              "data": {
                  "url": blobURL,
                  "type": "csv",
                  "genomicFields": ["position", "plus", "minus"],
                  "headerNames": ["position", "plus", "minus"],
              },
              "x": {"field": "position", "type": "genomic", "linkingId": "SharedXAxis", "axis": "none"},
              "y": {"field": "minus", "type": "quantitative", "axis": "none", "domain": domain},
              "mark": "bar",
              "color": {"value": "#2ecc71"}
          },
        ]
      }
}