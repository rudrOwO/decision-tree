import data from './data.mjs';
import Node from './node.mjs';

const featureLimit = 13;
const nodeArray = [];

// feature engineering 
for (let featureIndex = 1; featureIndex <= featureLimit; ++featureIndex) {  // Index 0 holds the predermined class
    let range = {
        min: Infinity,
        max: -Infinity
    };

    data.forEach(features => {
        range.min = Math.min(range.min, features[featureIndex]);
        range.max = Math.max(range.max, features[featureIndex]);     
    });
    
    new Node(range);
}