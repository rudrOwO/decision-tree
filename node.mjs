const featureLimit = 3; // testing features indexed from 1 to limit; breaking condition for recursion
const splitCount = 5;
const splitCombinations = [];

// generate nC2 splits
for (let i = 1; i < splitCount; ++i) {
	for (let j = i + 1; j < splitCount; ++j) {
		splitCombinations.push([i, j]);
	}
}

export default class Node {
	constructor(featureIndex, wineList, classifierID) {
		let featureValue = {
			min: Infinity,
			max: -Infinity,
		};

		wineList.forEach((wine) => {
			featureValue.min = Math.min(featureValue.min, wine[featureIndex]);
			featureValue.max = Math.max(featureValue.max, wine[featureIndex]);
		});

		const unitDistance = (featureValue.max - featureValue.min) / splitCount;

		this.classifierID = classifierID;
		this.wineList = wineList;
		this.featureIndex = featureIndex;
		this.splits = splitCombinations.map((pair) => ({
			lowerBound: featureValue.min + pair[0] * unitDistance,
			upperBound: featureValue.min + pair[1] * unitDistance,
		}));
		this.children = { left: null, middle: null, right: null };
	}

	calcOptimumSplit() {
		if (this.featureIndex === featureLimit) return this.calcEntropy();

		this.splits.forEach((currentSplit) => {
			const wineForChildren = {
				left: [],
				middle: [],
				right: [],
			};

			wineForChildren.left = this.wineList.filter(
				(wine) => wine[this.featureIndex] <= currentSplit.lowerBound
			);
			wineForChildren.middle = this.wineList.filter(
				(wine) =>
					wine[this.featureIndex] > currentSplit.lowerBound &&
					wine[this.featureIndex] <= currentSplit.upperBound
			);
			wineForChildren.right = this.wineList.filter(
				(wine) => wine[this.featureIndex] > currentSplit.upperBound
			);

			// make new nodes and compare entropies
			this.children.left = new Node(
				this.featureIndex + 1,
				wineForChildren.left,
				1
			);
			this.children.middle = new Node(
				this.featureIndex + 1,
				wineForChildren.middle,
				2
			);
			this.children.right = new Node(
				this.featureIndex + 1,
				wineForChildren.right,
				3
			);
		});
	}

	calcEntropy() {
		const classfiedWines = this.wineList.filter(
			(wine) => wine[0] === this.classifierID
		);

		const probability = classfiedWines.length / this.wineList.length;
		this.entropy = -probability * Math.log2(probability);
		return this.entropy;
	}
}
