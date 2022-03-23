import { featureSet, numberOfFeatures } from "./train.mjs";

export default class Node {
    dataSet;  // dataSet local to this Node
    children;
    featureID; // what feature this node uses to split its dataSet
    setOfClassIDs = new Set();  // stored unique IDs of classes of dataSet
    entropy;
    classInstanceCount = {'1': 0, '2': 0, '3': 0};
    
    constructor (passedDataSet) {
        this.dataSet = passedDataSet;
        this.children = {left: {}, right: {}};
        this.recordClassInfo();
        this.calculateEntropy();
    }
    
    recordClassInfo () {
        for (const [classID] of this.dataSet){ 
            // recording class info of dataSet
            this.setOfClassIDs.add(classID);
            this.classInstanceCount[classID] += 1;
        }
    }
    
    calculateEntropy () {
        this.entropy = 0;

        for (const classId of this.setOfClassIDs) {
            let proportion = this.classInstanceCount[classId] / this.dataSet;
            this.entropy += -proportion * Math.log2(proportion);
        }

        return this.entropy;
    }
    
    splitDataSet (selectedFeatureID) {
        this.children.left.dataSet = [];
        this.children.right.dataSet = [];
        
        for (const data of this.dataSet) {
            if (data[selectedFeatureID] < featureSet[selectedFeatureID].mid)
                this.children.left.dataSet.push(data);
            else 
                this.children.right.dataSet.push(data);
        }
    }
    
    makeGreedyDecision () {
        let minEntropyOfChildren = Infinity; 
        let optimumNodes;

        for (let selectedFeatureID = 1, entropyOfChildren = 0; selectedFeatureID <= numberOfFeatures; ++selectedFeatureID) {
            this.splitDataSet(selectedFeatureID);
            optimumNodes = [];

            // calculating weighted entropy of children for a particular feature ID
            for (const child of [this.children.left, this.children.right]) {
                let proportion =  (child.dataSet.length / this.dataSet.length);
                let candidateNode = new Node(child.dataSet);
                entropyOfChildren += proportion * (candidateNode.entropy);

                optimumNodes.push(candidateNode);
            }
            
            if (entropyOfChildren < minEntropyOfChildren) {
                minEntropyOfChildren = entropyOfChildren;
                this.children.left.node = optimumNodes[0];
                this.children.right.node = optimumNodes[1];
            }
        }
    }
}