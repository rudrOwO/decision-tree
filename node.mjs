const maxDepth = 3; // testing features indexed from 1 to limit; breaking condition for recursion
const splitCount = 5;
const splitCombinations = [];

// generate nC2 splits
for (let i = 1; i < splitCount; ++i) {
	for (let j = i + 1; j < splitCount; ++j) splitCombinations.push([i, j]);
}

export default class Node {
	constructor(decisionIndex, wineList, depth) {
		let featureValue = {
			min: Infinity,
			max: -Infinity,
		};

		wineList.forEach((wine) => {
			featureValue.min = Math.min(featureValue.min, wine[decisionIndex]);
			featureValue.max = Math.max(featureValue.max, wine[decisionIndex]);
		});

		const unitDistance = (featureValue.max - featureValue.min) / splitCount;

		this.depth = depth;
		this.wineList = wineList;
		this.decisionIndex = decisionIndex;
		this.splits = splitCombinations.map((pair) => ({
			lowerBound: featureValue.min + pair[0] * unitDistance,
			upperBound: featureValue.min + pair[1] * unitDistance,
		}));
		this.children = new Array(4);
	}

	getOptimumDecision() {
		// Breaking condition
		if (this.depth === maxDepth) return this.calcWeightedEntropy();

		this.entropy = Infinity;

		// Iterating through the splits
		this.splits.forEach((currentSplit) => {
			const wineForChildren = new Array(4);

			wineForChildren[1] = this.wineList.filter(
				(wine) => wine[this.decisionIndex] <= currentSplit.lowerBound
			);
			wineForChildren[2] = this.wineList.filter(
				(wine) =>
					wine[this.decisionIndex] > currentSplit.lowerBound &&
					wine[this.decisionIndex] <= currentSplit.upperBound
			);
			wineForChildren[3] = this.wineList.filter(
				(wine) => wine[this.decisionIndex] > currentSplit.upperBound
			);

			// Enumerating children with decisions
			let entropy = 0;
			for (let i = 1; i <= 3; ++i)
				entropy += this.calcWeightedEntropy(wineForChildren[i], i);

			let minChildEntropy = [0, Infinity, Infinity, Infinity];
			// caculating average entropy of children
			for (let childIndex = 1; childIndex <= 3; ++childIndex) {
				for (let i = 1; i <= 7; ++i) {
					let child = new Node(
						i,
						wineForChildren[childIndex],
						this.depth + 1
					);
					child.getOptimumDecision();
					minChildEntropy[childIndex] = Math.min(
						child.entropy,
						minChildEntropy[childIndex]
					);
				}
			}

			let weighedEntropyOfChildren = 0;
			for (let i = 1; i <= 3; ++i) {
				weighedEntropyOfChildren +=
					minChildEntropy[i] *
					(wineForChildren.length / this.wineList.length);
			}

			this.informationGain = this.entropy - weighedEntropyOfChildren;
		});
	}

	calcWeightedEntropy(childrenWineList, decisionIndex) {
		const classfiedWines = childrenWineList.filter(
			(wine) => wine[0] === decisionIndex
		);

		const probability = classfiedWines.length / childrenWineList.length;

		if (probability === 0) return Infinity;

		const weightedEntropy =
			-(childrenWineList.length / this.wineList.length) *
			probability *
			Math.log2(probability);

		return weightedEntropy;
	}
}
