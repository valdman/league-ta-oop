class PairNumbers {
	numberOne: number;
	numberTwo: number;

	constructor(numberOne: number, numberTwo: number) {
		this.numberOne = numberOne;
		this.numberTwo = numberTwo;
	}

	classBind = sum;
}

interface Pair {
	numberOne: number;
	numberTwo: number;
}

function sum(this: Pair, otherNumber: number): number {
	console.log(this?.constructor?.name || this);

	return this.numberOne + this.numberTwo + otherNumber;
}

const pair = new PairNumbers(1, 2);

const pairClassBinded = sum.bind(pair);

const obj = {
	numberOne: 3,
	numberTwo: 4,
	sum,
};

const pairObjectBinded = sum.bind(obj);

console.log({
	pairClassBinded: pairClassBinded(5),
	pairClassMember: pair.classBind(6),
	pairObjectBinded: sum.apply(obj, [5]),
	pairObjectMember: obj.sum(1),
});
