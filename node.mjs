import { calcDataMid, numberOfFeatures } from "./data.mjs";

export default class Node {
  depth;
  dataSet; // dataSet local to this Node
  children = { left: {}, right: {} };
  feature = {
    id: 'x',
    mid: null
  }
  setOfClassIDs = new Set(); // stored unique IDs of classes of dataSet
  assignedClass = null;
  entropy;
  classInstanceCount = { 1: 0, 2: 0, 3: 0 };

  constructor(passedDataSet, depth) {
    this.dataSet = passedDataSet;
    this.depth = depth;
    this.recordClassInfo();
    this.calculateEntropy();
  }

  recordClassInfo() {
    for (const [classID] of this.dataSet) {
      // recording class info of dataSet
      this.setOfClassIDs.add(classID);
      this.classInstanceCount[classID] += 1;
    }
  }

  calculateEntropy() {
    this.entropy = 0;

    for (const classId of this.setOfClassIDs) {
      let proportion = this.classInstanceCount[classId] / this.dataSet.length;
      this.entropy += -proportion * Math.log2(proportion);
    }

    return this.entropy;
  }

  splitDataSet(selectedFeatureID) {
    this.children.left.dataSet = [];
    this.children.right.dataSet = [];
    const dataMid = calcDataMid(selectedFeatureID, this.dataSet);

    for (const data of this.dataSet) {
      if (data[selectedFeatureID] < dataMid)
        this.children.left.dataSet.push(data);
      else this.children.right.dataSet.push(data);
    }
    
    return dataMid;
  }
  
  classify (data) {
    if (this.assignedClass !== null)
      return this.assignedClass;
    
    if(data[this.feature.id] < this.feature.mid)
      return this.children.left.node.classify(data)
    else
      return this.children.right.node.classify(data)
  }

  // This method is responsible for generating new nodes
  makeGreedyDecision() {
    // Assign class and break recursion
    if (this.setOfClassIDs.size === 1) {
      for (const classID in this.classInstanceCount) {
        if (this.classInstanceCount[classID] > 0)
          this.assignedClass = classID;
      }
      return;
    }

    let minEntropyOfChildren = Infinity;
    let optimumNodes;

    for (
      let selectedFeatureID = 1;
      selectedFeatureID <= numberOfFeatures;
      ++selectedFeatureID
    ) {
      let weightedEntropyOfChildren = 0;
      const dataMid = this.splitDataSet(selectedFeatureID);
      optimumNodes = [];

      // calculating weighted entropy of children for a particular feature ID
      for (const [, child] of Object.entries(this.children)) {
        let proportion = child.dataSet.length / this.dataSet.length;
        let candidateNode = new Node(child.dataSet, this.depth + 1);
        weightedEntropyOfChildren += proportion * candidateNode.entropy;
        optimumNodes.push(candidateNode);
      }

      if (weightedEntropyOfChildren < minEntropyOfChildren) {
        this.feature.id = selectedFeatureID;
        this.feature.mid = dataMid;
        minEntropyOfChildren = weightedEntropyOfChildren;
        this.children.left.node = optimumNodes[0];
        this.children.right.node = optimumNodes[1];
      }
    }
  }
}
