import {nanoid} from "nanoid";
console.log("Hello via Bun!");

const array = Array(10).fill(nanoid(10));
console.log(array)