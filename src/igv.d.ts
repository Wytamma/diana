declare module 'igv' {
  const igv: {
    Browser: any;
    createBrowser: (div: HTMLElement, options: any) => Promise<any>;
    removeBrowser: (browser: any) => void;
  };

  export default igv;
}
