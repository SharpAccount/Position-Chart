export default {
    create: (data, fileType) => {
        const blob = new Blob([data], {type: fileType});
        return URL.createObjectURL(blob);
    },
    remove: (url) => {
        URL.revokeObjectURL(url);
    }
}