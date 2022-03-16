const splitCount = 5;
const splitCombinations = [];

// generate nC2 splits
for (let i = 1; i < splitCount; ++i) {
    for (let j = i + 1; j < splitCount; ++j) {
        splitCombinations.push([i, j]);
    }
}


export default class Node {
    constructor (range) {
        const {min, max} = range;
        const unitDistance = (max - min) / splitCount;
        
        this.splits = splitCombinations.map(
            pair => ({ 
                lowerBound: min + pair[0] * unitDistance,
                upperBound: min + pair[1] * unitDistance
            })
        );

    }    
}