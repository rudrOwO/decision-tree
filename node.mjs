import { featureSet, numberOfFeatures } from "./train.mjs";

export default class Node {
    dataSet = {};  // dataSet local to this Node
    featureID; // what feature this node uses to split its dataSet
    setOfClassIDs = new Set();  // stored unique IDs of classes of dataSet
    entropy;
    classInstanceCount = {'1': 0, '2': 0, '3': 0};
    
    constructor (passedDataSet) {
        this.dataSet.full = passedDataSet;
        this.recordClassInfo();
        this.calculateEntropy();
    }
    
    recordClassInfo () {
        for (const [classID] of this.dataSet.full) { 
            // recording class info of dataSet
            this.setOfClassIDs.add(classID);
            this.classInstanceCount[classID] += 1;
        }
    }
    
    calculateEntropy () {
        this.entropy = 0;

        for (const classId of this.setOfClassIDs) {
            let proportion = this.classInstanceCount[classId] / this.dataSet.full.length;
            this.entropy += -proportion * Math.log2(proportion);
        }

        return this.entropy;
    }
    
    splitDataSet (selectedFeatureID) {
        this.dataSet.leftChild = [];
        this.dataSet.rightChild = [];
        
        for (const data of this.dataSet.full) {
            if (data[selectedFeatureID] < featureSet[selectedFeatureID].mid)
                this.dataSet.leftChild.push(data);
            else 
                this.dataSet.rightChild.push(data);
        }
    }
    
    makeGreedyDecision () {
        let minEntropyOfChildren = Infinity; 
        let selectedFeatureID; 
        
        for (selectedFeatureID = 1; selectedFeatureID <= numberOfFeatures; ++selectedFeatureID) {
            
        }
    }
}