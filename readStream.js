const fs = require('fs');

const readStream = fs.createReadStream('example.csv');

let sum = 0;
let unprocessed = '';
readStream.on('data', (chunk) => {
    let chunkString = unprocessed + chunk.toString();
    unprocessed = '';

    let startIndex = 0;
    for (let ch = startIndex; ch < chunkString.length; ch++) {
        if (chunkString[ch] === '\n') {
            const line = chunkString.slice(startIndex, ch);
            const idx = line.indexOf(',');
            const cost = line.slice(idx + 1);
            sum += parseFloat(cost);
            startIndex = ch + 1;
        }
    }
})