# Chromosomal location bias

Explore the chromosomal location bias of the insertions in your dataset. Chromosomal location bias can cause bias in downstream analysis if it's not corrected. 

![](./images/bias.png)

The insert index is the number of inserts in a feature divided by the feature length. If you're dataset contains chromosomal location bias you will see structure in these plots i.e. large sections where the average insert index is lower or higher then the rest of the chromosome (see insert plot).  


For a more detailed analysis and bias correction tool see [ChromoCorrect](https://github.com/BarquistLab/ChromoCorrect).


!!! note 

    You can use the `Export` button to export data in a format compatible with ChromoCorrect 