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

function sleep(milliseconds: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Run after ${milliseconds} milliseconds`);
    }, milliseconds);
  })
}

function ping(milliseconds: number, message: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(message);
      }, milliseconds);
    })
  }

async function randomBatchPing(messages: string[]) {
    for (const message of messages) {
        const milliseconds = Math.floor(Math.random() * 10000);
        console.log(await ping(milliseconds, message), milliseconds);
    }
}

async function serializePings(messages: string[]) {
    let concatenatedMessages = '';
    
    for (const message of messages) {
        const milliseconds = Math.floor(Math.random() * 10000);
        concatenatedMessages = concatenatedMessages.concat(`${await ping(milliseconds, message) as string} `);
    }
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(concatenatedMessages);
        });
      })
}

async function exampleUsage() {
	  const a = await exampleAsyncFunction(false);
    console.log(a);

	  const b = await sleep(3000);
	  console.log(b);

    const c = await ping(2000, 'Ping pong')
    console.log(c);

    await randomBatchPing(['First', 'Second', 'Third']);

    const d = await serializePings(['First', 'Second', 'Third'])
    console.log(d);
}

exampleUsage();
