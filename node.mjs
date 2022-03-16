const splitCount = 5;
const splitCombinations = [];

// generate splits
for (let i = 1; i < splitCount; ++i) {
    for (let j = i + 1; j < splitCount; ++j) {
        splitCombinations.push([i, j]);
    }
}

console.log(splitCombinations);

export default class Node {
    constructor (range) {
        const {min, max} = range;
        const unitDistance = (max - min) / splitCount;
        
        this.splits = splitCombinations.map(
            pair => [ min + pair[0] * unitDistance, min + pair[1] * unitDistance ]
        );
        
    }    
}