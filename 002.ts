// Types
type MyArray = Array<unknown>;

const a: MyArray = [1, 2, 3, 4, 5];
const b: MyArray = ["a", "b", "c"];
const c: MyArray = [1, "a", true, null, undefined, {}, []];

type MyObject = {
	foo: string;
}

const someObject = {
	foo: "bar",
};

class MyClass {
	public foo: string;
}

const myClassInstance = new MyClass();

const defaulDict = new Proxy({} as Record<string, string>, {
	get: (target, prop) => {
		if(!(prop in target)) {
			target[prop] = "default";
		}
		return target[prop];
	}
})

function foo(a: MyObject) {
	console.log(a.foo);
}

// Enumerable properties of custom objects
// LinkedList
class LinkedListNode<T> {
	public value: T;
	public next: LinkedListNode<T> | null = null;

	public constructor(value: T) {
		this.value = value;
	}

	// Iterator interface
	public [Symbol.iterator]() {
		const firstNode = this;
		let current: LinkedListNode<T> | null = this;

		return {
			next() {
				if(current === null) {
					return {done: true, value: null};
				}
				const value = current.value;
				current = current.next;

				if(current === firstNode) {
					return {done: true, value};
				}
				return {done: false, value};
			}
		}
	}
}

class LinkedList<T> {
	public head: LinkedListNode<T> | null = null;
	public tail: LinkedListNode<T> | null = null;

	public push(value: T) {
		const newNode = new LinkedListNode(value);
		if(this.head === null) {
			this.head = newNode;
			this.tail = newNode;
			return;
		}

		this.tail!.next = newNode;
		this.tail = newNode;
	}

	public [Symbol.iterator]() {
		if(this.head === null) return [].values();
		return this.head[Symbol.iterator]();
	}
}

const node1 = new LinkedListNode(1);
const node2 = new LinkedListNode(2);
const node3 = new LinkedListNode(3);
//
node1.next = node2;
node2.next = node3;
node3.next = node1;

const linkedList = new LinkedList<number>();
linkedList.push(1);
linkedList.push(2);
linkedList.push(3);

// for (const elementOfList of node1) {
// 	console.log({elementOfList});
// }

console.log({array: [...node1]})
