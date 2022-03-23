import { dataSet, Feature } from "./data.mjs";
import Node from "./node.mjs";
const featureSet = {};
const numberOfFeatures = dataSet[0].length - 1;

for (let i = 1; i <= numberOfFeatures; ++i)
    featureSet[i] = new Feature(i);

export { featureSet };

const test = new Node(dataSet);
console.log(test.entropy);