const splitData = (data, chunk) =>{
    const chunks = [];
    for (let i = 0; i < data.length; i += chunk) {
        chunks.push(data.slice(i, i + chunk));
    }
    return chunks;
}

export default splitData;