import { dataSet } from "./data.mjs";
import Node from "./node.mjs";
import Queue from "./queue.mjs";

const root = new Node(dataSet, 0);
const queue = new Queue();

const displayer = [];
for (let i = 1; i < 20; ++i) displayer.push([]);

// BFS Tree Traversal
function train () {
  queue.enqueue(root);

  while (!queue.isEmpty()) {
    let frontNode = queue.deque();
    frontNode.makeGreedyDecision();

    displayer[frontNode.depth].push([frontNode.feature.id, frontNode.entropy]);

    for (const [, child] of Object.entries(frontNode.children)) {
      if (child.node !== undefined) {
        queue.enqueue(child.node);
      }
    }
  }
}

export {train, root, displayer}