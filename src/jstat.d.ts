declare module 'jstat' {
    const jStat: {
        mean: (arr: number[]) => number;
        // ...
        gamma: {
            pdf: (x: number, shape: number, rate: number) => number;
            cdf: (x: number, shape: number, rate: number) => number;
        };
        exponential: {
            pdf: (x: number, rate: number) => number;
            cdf: (x: number, rate: number) => number;
        };
    };

    export default jStat;
}