import { dataSet } from "./data.mjs";
import Node from "./node.mjs";
import Queue from "./queue.mjs";

const root = new Node(dataSet, 0);
const queue = new Queue();

const display = [];
for (let i = 1; i < 13; ++i) display.push([]);

// BFS Tree Traversal
queue.enqueue(root);

while (!queue.isEmpty()) {
  let frontNode = queue.deque();
  frontNode.makeGreedyDecision();

  display[frontNode.depth].push(frontNode.feature.mid);

  for (const [, child] of Object.entries(frontNode.children)) {
    if (child.node !== undefined) {
      queue.enqueue(child.node);
    }
  }
}

for (const line of display) console.log(line);
