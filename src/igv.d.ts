declare module 'igv' {
    const igv: {
        Browser: any;
        createBrowser: (div: HTMLElement, options: any) => Promise<any>;
    };

    export default igv;
}