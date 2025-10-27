export function createBlobURL(data: string) {
  // Create a new Blob object using the text
  const blob = new Blob([data], { type: 'application/octet-stream' });

  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);

  // Return the URL
  return url;
}

  // Helper function to strip .gz extension
export function stripGzExtension(filename: string): string {
    return filename.endsWith('.gz') ? filename.slice(0, -3) : filename;
}