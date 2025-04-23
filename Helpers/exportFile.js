const exportFile = (element, data, fileType) => {
    const blob = new Blob([data], {type: fileType});
    element.href = URL.createObjectURL(blob);

    element.download = 'data';
}

export default exportFile;