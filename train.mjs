import dataSet from "./data.mjs";
import Node from "./node.mjs";

const test = new Node(1, dataSet, 1);
test.getOptimumDecision();
console.log(test.entropy);
