# Правила
1) Каждое ДЗ должно быть в файле в `src` вида `src/<имя>/<номер урока>.ts`. Либо, несколько файлов, если задача большая
2) ДЗ должно быть сделано в отдельной ветке, которая называется `lesson-<номер урока>`. Например, `lesson-1`
3) Отправка происходит как Pull-Request в ветку `master` в этом репозитории на Github

### Запуск кода
Как запускать код на `TypeScript`? Если вам не нужна сборка для веба или `Node.js`, то можно запускать через `ts-node` или `bun`. Пример:
```bash
npx ts-node src/boris/3.ts

bun src/boris/3.ts
```
0) Установите `Node.js` или `Bun JS`, если не установлено
1) Установки пакетов (1 из 3 команд на выбор) - `npm i` / `yarn` / `bun i`
2) Пример скриптов запуска в `package.json` - скрипты `start:example:`. Не для редактирования - для примера!
3) Не нужно писать свои скрипты запуска в `package.json`, просто запускайте файлы напрямую через `npx ts-node` или `bun`

## ДЗ урок 3
1) Сделать обертку над существующей функцией `calculateStateDiff` (либо её вариант) из файла `./src/boris/4.ts` - `calculateObjectDiffRecursive`, ,  которая ищет различия в объектах, вложенных в объекты. Пример:
```js
const state1 = {
  a: 1,
  b: {
	c: 2,
	d: 3,
  },
  e: 4,
};

const state2 = {
  a: 1,
  b: {
	c: 20,
	d: 3,
  },
  e: {
	f: 5,
  },
};

calculateObjectDiffRecursive(state1, state2) // -> ["b.c", "e"]
```
2) Написать тесты на новую функцию `calculateStateDiff`
3) На строке 29 в файле `./src/boris/4.ts` есть ошибка TS. Напишите, почему она там, но различия между строками ищутся

## ДЗ урок 2
Расширить класс LinkedList
1) Ознакомиться с докой по JS итераторам (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)
2) Поддержать интерфейс reducable (пример в `./src/boris/2_2.ts`)
3) Сделать LinkedList с предохранителем от циклов (и конечно с `[Symbol.iterator]`)
