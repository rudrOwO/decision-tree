import { featureSet } from "./train.mjs";

export default class Node {
    dataSet;  // dataSet local to this Node
    featureID; // what feature this node uses to split its dataSet
    classIDs = new Set();  // stored unique IDs of classes of dataSet
    entropy;
    children;
    classInstanceCount = {'1': 0, '2': 0, '3': 0};
    
    constructor (dataSet) {
        this.dataSet = dataSet;

        // Recording class info of each data in dataset
        for (const [classID] of dataSet) { 
            this.classIDs.add(classID);
            this.classInstanceCount[classID] += 1;
        }
        
        // use classIDs.size to determine halting of recursion
    }
    
    calculateEntropy () {
        this.entropy = 0;

        for (const id of this.classIDs) {
            let proportion = this.classInstanceCount[id] / this.dataSet.length;
            this.entropy += -proportion * Math.log2(proportion);
        }

        return this.entropy;
    }
    
    generateOptimumSplit () {
       let minEntropyOfChildren = Infinity; 
        
       
    }
}