import type { GeneInsertResult } from '$lib/utils/generateGeneInsertSites';
import { WebR } from 'webr';
import type { RList } from 'webr';

export interface CompareResults {
  seqId: string;
  id: number;
  name: string;
  start: number;
  stop: number;
  strand: string;
  logFC: number; // Log Fold Change for comparison
  logCPM: number; // Log Counts Per Million for comparison
  pValue: number; // P-value for comparison
  qValue: number; // Q-value for comparison
}

async function evaluateR(controlData: GeneInsertResult[][], treatmentData: GeneInsertResult[][]) {
  const baseUrl = `${window.location.origin}/tools/webR`;
  const webR = new WebR({ baseUrl: `${baseUrl}/webr-0.4.2/` });
  await webR.init();
  // Load necessary packages
  await webR.evalR(`
        webr::mount(mountpoint = "/usr/lib/R/library/statmod", source = "${baseUrl}/packages/statmod_1.5.0.tgz");
        webr::mount(mountpoint = "/usr/lib/R/library/Rcpp", source = "${baseUrl}/packages/Rcpp_1.0.13.tgz");
        webr::mount(mountpoint = "/usr/lib/R/library/limma", source = "${baseUrl}/packages/limma_3.61.12.tgz");
        webr::mount(mountpoint = "/edgeR", source = "${baseUrl}/packages/edgeR/library.data");
        .libPaths(c(.libPaths(), "/edgeR"));
        library(edgeR);
        message("Running differential analysis with edgeR")
    `);

  const controlDataConverted = controlData.map((group) => group.map((item) => ({ ...item })));
  const treatmentDataConverted = treatmentData.map((group) => group.map((item) => ({ ...item })));
  // write a for loop that will append each group from the controlDataConverted and treatmentDataConverted to the controlData and treatmentData one at a time
  for (let i = 0; i < controlDataConverted.length; i++) {
    await webR.objs.globalEnv.bind(`controlDataPart`, controlDataConverted[i]);
    await webR.evalR(`
        # check if controlData exists
        if (!exists("controlData")) {
          controlData <- list()
        }
        controlData[[${i + 1}]] <- controlDataPart
        # clean up
        rm(controlDataPart)
      `);
  }
  for (let i = 0; i < treatmentDataConverted.length; i++) {
    await webR.objs.globalEnv.bind(`treatmentDataPart`, treatmentDataConverted[i]);
    await webR.evalR(`
        # check if treatmentData exists
        if (!exists("treatmentData")) {
          treatmentData <- list()
        }
        treatmentData[[${i + 1}]] <- treatmentDataPart
        # clean up
        rm(treatmentDataPart)
      `);
  }

  try {
    const result = (await webR.evalR(`
        # Function to process input data and perform differential expression analysis
        load_data <- function(control_list, treatment_list) {
          # Merge control and treatment data for filtering
          all_list <- c(control_list, treatment_list)
          read_counts <- do.call(cbind, lapply(all_list, function(x) { x$readCount }))

          # Apply filtering for non-zero counts
          zeros <- apply(apply(read_counts, 1, ">", 0), 2, any)
          noness_list <- lapply(all_list, function(x) { x[zeros, ] })

          # Build count matrix and treatments factor
          count_mat <- do.call(cbind, lapply(noness_list, function(x) { x$readCount }))
          conds <- factor(c(rep("ctrl", length(control_list)), rep("cond", length(treatment_list))))

          list(count_mat = count_mat, conds = conds, noness_list = noness_list)
        }
        
        perform_differential_expression <- function(count_mat, conds, noness_list) {
            # Perform edgeR differential expression analysis
            d <- DGEList(counts = count_mat, group = conds)
            d <- calcNormFactors(d)
            d <- estimateCommonDisp(d)
            d <- estimateTagwiseDisp(d)
            de.tgw <- exactTest(d, pair = c("ctrl", "cond"))

            # Prepare differential expression results
            ctrl1_noness <- noness_list[[1]]
            diff <- cbind(ctrl1_noness[, c("seqId", "name", "start", "end", "strand")], de.tgw$table, QValue = p.adjust(de.tgw$table$PValue, "BH"))

            return(diff)
        }

        data <- load_data(controlData, treatmentData)
        diff_results <- perform_differential_expression(data$count_mat, data$conds, data$noness_list)
        diff_results
      `)) as RList;
    return await result.toD3();
  } finally {
    webR.close();
  }
}

// Main function to compare gene insert sites and return results in the specified format
export async function compareGeneInsertSites(
  controlData: GeneInsertResult[][],
  treatmentData: GeneInsertResult[][]
): Promise<CompareResults[]> {
  const results = await evaluateR(controlData, treatmentData);
  // Format the output as an array of CompareResults objects
  return results.map((result: any, index: number) => ({
    id: index,
    seqId: result.seqId,
    name: result.name,
    start: result.start,
    stop: result.end,
    strand: result.strand,
    logFC: result.logFC,
    logCPM: result.logCPM,
    pValue: result.PValue || Number.MIN_VALUE,
    qValue: result.QValue || Number.MIN_VALUE
  }));
}
