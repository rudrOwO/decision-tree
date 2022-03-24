import { dataSet } from "./data.mjs";
import Node from "./node.mjs";

const test = new Node(dataSet);
test.makeGreedyDecision();

const c = test.children.left.node;
const d = test.children.right.node;

// console.log(c.entropy)
// console.log(d.entropy)

c.makeGreedyDecision();

const cc = c.children.left.node; 
const dd = c.children.right.node; 

// console.log(cc.dataSet.length, dd.dataSet.length)
// console.log(cc.entropy, dd.entropy)

dd.makeGreedyDecision();
const ddd = dd.children.left.node;
// console.log(ddd.entropy)

ddd.makeGreedyDecision()

const cccc = ddd.children.left.node; 
const dddd = ddd.children.right.node; 

console.log(cccc.dataSet.length, dddd.dataSet.length);
console.log(cccc.entropy, dddd.entropy);
