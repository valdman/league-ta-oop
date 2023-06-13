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
      resolve('Hello world! ' + i++);
    }, 1000);
  });
}

function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolve');
    }, ms);
  });
}

function ping(ms: number, string: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(string);
    }, ms);
  });
}

async function randomBatchPing(stringArr: string[], maxTime: number) {
  const promises = [];
  for (let string of stringArr) {
    const random = Math.floor(Math.random() * (maxTime + 1));
    promises.push(await ping(random, string));
  }
  return promises;
}

function serializePings(stringArr: string[], ms: number, maxTime: number) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      resolve(await randomBatchPing(stringArr, maxTime));
    }, ms);
  });
}

async function exampleUsage() {
  const a = await exampleAsyncFunction(false);
  const b = await exampleAsyncFunction(true);

  const c = await sleep(2000);
  const d = await ping(3000, 'asdasd');

  const arr = ['asdasd', 'sadaxcz', 'aseqw'];
  const e = await randomBatchPing(arr, 3000);

  const arr1 = ['asdasasd23d', 'sa132412daxcz', 'aseq1234w'];
  const f = await serializePings(arr1, 5000, 3000);

  console.log(a, b, c, d, e, f);
}



exampleUsage();
