export const removeFileExtension = (filename: string) => {
    return filename.replace(/\.[^/.]+$/, "");
}