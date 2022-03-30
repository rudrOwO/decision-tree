import { train, displayer, root, testingSet } from "./train.mjs";
import { dataSet } from "./data.mjs";

train();

// Tree display
// for (const line of displayer) {
//   if (line.length === 0) break;
//   console.log(line);
// }

let accuracy = 0;

for (const data of testingSet) {
    if (data[0] == root.classify(data))
        ++accuracy;
}

accuracy = 100 * (accuracy / testingSet.length)
console.log(accuracy)