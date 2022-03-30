import { train, displayer, root } from "./train.mjs";
import { dataSet } from "./data.mjs";

train();

// Tree display
for (const line of displayer) {
  if (line.length === 0) break;
  console.log(line);
}

// Choose Test Set | 80% choice rate at random
const chosenDataSet = [];

for (const data of dataSet) {
  if (Math.random() < 0.2) chosenDataSet.push(data);
  console.log(data[0], root.classify(data));
}
