/*
Задание - в этом файле вы найдете пример асинхронной функции. На её примере реализуйте похожие:
   - `sleep` - принимает число миллисекунд и возвращает Promise, который резолвится через указанное время
   - `ping` - принимает строку и число и возвращает Promise, который резолвится через указанное время с указанной строкой.
   - `randomBatchPing` - принимает массив строк. Для каждой строки создает `ping` со случайным временем. Каждая строка - результат вызова `ping` с рандомным числом и строкой из массива.
   - `serializePings` - принимает массив строк и возвращает Promise, который резолвится через указанное время со строкой вида `ping1 ping2 ping3...`, где `ping1` - результат вызова `ping` с рандомным числом и первой строкой из массива и т.д.
*/

let i = 0;

function exampleAsyncFunction(isBroken: boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Hello world! " + i++);
    }, 1000);
  });
}

async function exampleUsage() {
  const a = await exampleAsyncFunction(false);
  const b = await exampleAsyncFunction(true);

  console.log(a, b);
}

exampleUsage();

const sleep = (miliseconds: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Promise is resolved in ${miliseconds} miliseconds`);
    }, miliseconds);
  });
};

const callSleep = async (miliseconds: number) => {
  console.log(await sleep(miliseconds));
};

callSleep(2000);

const ping = (miliseconds: number, string: string) => {
  console.log(`miliseconds ${miliseconds}, string ${string}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(string);
    }, miliseconds);
  });
};

//1 to 10 seconds range
const getRandomMiliseconds = () => {
  return Math.ceil(Math.random() * 10000);
};

const randomBatchPing = async (strings: string[]) => {
  for (let string of strings) {
    console.log(await ping(getRandomMiliseconds(), string));
  }
};

randomBatchPing(["ping 1", "ping 2", "ping 3"]);

const serializePings = async (strings: string[]) => {
  const promiseArray = strings.map((string) =>
    ping(getRandomMiliseconds(), string)
  );

  const results = await Promise.all(promiseArray);
  console.log(results);
};

serializePings(["ping 1", "ping 2", "ping 3"]);
