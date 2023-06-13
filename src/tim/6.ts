/*
Задание - в этом файле вы найдете пример асинхронной функции. На её примере реализуйте похожие:
   - `sleep` - принимает число миллисекунд и возвращает Promise, который резолвится через указанное время
   - `ping` - принимает строку и число и возвращает Promise, который резолвится через указанное время с указанной строкой.
   - `randomBatchPing` - принимает массив строк. Для каждой строки создает `ping` со случайным временем. Каждая строка - результат вызова `ping` с рандомным числом и строкой из массива.
   - `serializePings` - принимает массив строк и возвращает Promise, который резолвится через указанное время со строкой вида `ping1 ping2 ping3...`,
    где `ping1` - результат вызова `ping` с рандомным числом и первой строкой из массива и т.д.
*/

function sleep(milliseconds: number): Promise<String> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello world after ' + (milliseconds/1000) + ' seconds')
    }, milliseconds)
  })
}


function ping(str: string, milliseconds: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(str)
    }, milliseconds)
  })
}


async function randomBatchPing(strs: string[]) { //last undefiend
    return Promise.all(
      strs.map(async (str) => await ping(str, Math.floor(Math.random() * 10000)))
    )
}

async function serializePings(strs: string[], milliseconds: number) { //last undefiend
  
  return new Promise(async (resolve, reject) => {
    const result = strs.map((str) => ping(str, Math.floor(Math.random() * 10000)))
    setTimeout(() => {
      resolve(Promise.all(result))
    }, milliseconds)
  })
}

async function exampleUsage() {
  const c = await sleep(5000);
  const d = await ping('abc', 4000);
  const e = await randomBatchPing(['alex', 'ivan', 'serg'])
  const f = await serializePings(['alex', 'ivan', 'serg'], 5000);

	console.log(
    c,
    d,
    e,
    f
    );
}

exampleUsage();


