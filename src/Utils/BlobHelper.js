function blob2Base64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const base64 = reader.result?.toString() || '';
            resolve(base64);
        });
        reader.addEventListener('error', () => {
            reject(new Error('message'));
        });
        reader.readAsDataURL(blob);
    });
}
