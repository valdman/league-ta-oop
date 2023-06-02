// Haim
class Human {
	protected firstName: string;
	protected lastName: string;
	protected age: number = NaN;
	#qwe: number = 0;

	public constructor(name: string, age: number) {
		
		const [firstName, lastName] = name.split(' ');
		if(!firstName || !lastName) throw new Error("User name is invalid"); 
		
		this.firstName = firstName;
		this.lastName = lastName;
		this.changeAge(age);
		this.#qwe = 1;
	}
	
	public introduce() {
		console.log(`Hi, I'm ${this.firstName} ${this.lastName} of age ${this.age}`);
	}
		
	public changeAge(newAge: number) {
		if(!Number.isInteger(newAge) || newAge <= 0) throw new Error("User age is invalid");
		if(newAge < 10) throw new Error("User is too young");

		this.age = newAge;
	}
}

class Car {
	introduce() {
		console.log("Beep! ");
		return 0;
	}
}

class Chair {
	assemble() {
		console.log("!");
	}
}

// Moshe
class SingingHuman extends Human {
	sing() {
		console.log(`La-la-la, good day for me, ${this.firstName}!`);
	}
	// sing(vocalize: string) {
	// 	console.log(`${vocalize}-${vocalize}-${vocalize}, good day for me, ${this.firstName}!`);
	// }
	// sing(vocalize: string, times: number) {
	// 	console.log(`${vocalize}-${vocalize}-${vocalize}, good day for me, ${this.firstName}!`);
	// }
}

const boris = new Human("Boris Valdman", 12);
const mark = new SingingHuman("Mark Valman", 30);
const car = new Car();
const chair = new Chair();

boris.#qwe = 1;

console.log({mark});
console.log(Object.getPrototypeOf(mark))

// const userArray = [boris, mark];

// interface Introducable {introduce(): void};
// function greetAll(users: Introducable[]) {
// 	for (const user of users) {
// 		user.introduce();
// 	}
// }

// function singAll(users: SingingHuman[]) {
// 	for (const user of users) {
// 		user.sing();
// 	}
// }

// // singAll(userArray);
// greetAll(userArray);
// greetAll([boris, mark, car]);
