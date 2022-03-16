const featureLimit = 7;
const splitCount = 5;
const splitCombinations = [];

// generate nC2 splits
for (let i = 1; i < splitCount; ++i) {
    for (let j = i + 1; j < splitCount; ++j) {
        splitCombinations.push([i, j]);
    }
}

export default class Node {
    constructor (featureIndex, wineList) {
        let featureValue = {
            min: Infinity,
            max: -Infinity
        };

        wineList.forEach(wine => {
            featureValue.min = Math.min(featureValue.min, wine[featureIndex]);
            featureValue.max = Math.max(featureValue.max, wine[featureIndex]);     
        });
        
        const unitDistance = (featureValue.max - featureValue.min) / splitCount;
        
        this.wineList = wineList;
        this.featureIndex = featureIndex;
        this.splits = splitCombinations.map(
            pair => ({ 
                lowerBound: featureValue.min + pair[0] * unitDistance,
                upperBound: featureValue.min + pair[1] * unitDistance
            })
        );
    }    
    
    calcOptimumSplit() {
        
    }
    
    calcEntropy() {
        
    }
}