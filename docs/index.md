# Introduction

<img src="./images/logo.webp" alt="logo" width="200" style="align: center; margin: auto; display: block;"/>

Diana ([diana.cpg.org.au](https://diana.cpg.org.au/)) is a browser-based tool for the visualisation, exploration, and differential analysis of Transposon-Insertion Sequencing (TIS) data, such as TraDIS.

!!! info
    
    Diana runs entirely in the browser using WebAssembly (Wasm) and webR (R compiled to Wasm), enabling interactive, private, and installation-free analysis of large genomic datasets. You data never leaves your computer!

## What is Transposon-Insertion Sequencing?

Understanding bacterial phenotypes, such as antibiotic resistance or environmental persistence, requires genome-wide screening tools. Transposon-Insertion Sequencing (abbreviated as TIS, HITS, INSeq, TraDIS, and Tn-Seq) is a powerful functional genomics technique used to determine the roles of genes across an entire genome. TIS combines random transposon mutagenesis with high-throughput sequencing of the transposon insertion sites to identify essential genes, virulence factors, and genes involved in antibiotic resistance or environmental persistence.

Although TIS methods differ in methods, they all rely on the same basic principles: a transposon is inserted randomly into the genome of a bacterium, and the resulting mutant library is subjected to high-throughput sequencing. The sequencing data is then analysed to identify the locations of the transposon insertions and to determine which genes are essential for growth or survival under specific conditions.

## How can I create TIS data?

There are many ways to generate TIS data e.g. TraDIS, HITS, INSeq, Tn-Seq. See [Krause et al. (2025)](https://www.biorxiv.org/content/10.1101/2025.03.03.641140v1.abstract) for our recommended pipeline for generating transposon-directed insertion-site sequencing data using Nanopore sequencing. 

Once you have generated TIS count data see the [Loading data](/docs/data/) section for information on how to load your data into Diana.

## Citation

Citation in progress...

## Used by Diana
Diana is built using a number of open-source components, including:

- webR: R language compiled to Wasm for in-browser analysis
- IGV.js: Embeddable genomic visualization component based on the Integrative Genomics Viewer
- edgeR: Differential expression and insertion analysis
- biowasm: Run C/C++ genomics tools in the browser 
