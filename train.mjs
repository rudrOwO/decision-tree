import { dataSet } from "./data.mjs";
import Node from "./node.mjs";
import Queue from "./queue.mjs";

const root = new Node(dataSet);
const queue = new Queue();

// Breadth-first tree construction
queue.enqueue(root);

while (!queue.isEmpty()) {
  let frontNode = queue.deque();
  frontNode.makeGreedyDecision();
  console.log(frontNode.featureID);

  for (const [, child] of Object.entries(frontNode.children)) {
    if (child.node !== undefined) {
      queue.enqueue(child.node);
    }
  }
}
