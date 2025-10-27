# Gene Essentiality

Diana uses the [biotradis](https://github.com/sanger-pathogens/Bio-Tradis) algorithm to perform gene essentiality testing which uses [edgeR](https://bioconductor.org/packages/devel/bioc/html/edgeR.html) for differential analysis.

The results of this analysis are visualised in a volcano plot which shows the comparison between the log2 fold-change (x-axis) and the -log10(Q-Value) for each gene. The logFC represents the log2 fold-change between control and treatment read counts for each gene. The -log10(Q-Value) represents the negative log10 of the Q-Value, which is a measure of the significance of the difference in insert counts between control and treatment samples.

![](./images/compare.png)

Statistically essential genes (features) will be found in the top left quadrant of the plot i.e. those with fewer inserts and significant differences in treatment features. Selecting point on the plot will filter the associated table to only show these results.

![](./images/compare-select.png)

Gene essentiality is a powerful analyses that can tell us which genes are essential for survival under different environmental conditions.

![](./images/compare-van.png)
