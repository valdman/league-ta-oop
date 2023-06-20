/*
	План урока: Разработка гибких и расширяемых API с помощью паттернов "Стратегия" (Strategy), "Команда" (Command), "Цепочка обязанностей" (Chain of Responsibility).
*/

import express from "express";

const app = express();

// // Задаем роуты для API
// app.get("/users/:id", (req, res) => {
//   // Код обработки запроса
//   getRequestHandler.handleRequest(req, res);
// });

// app.post("/users", (req, res) => {
//   // Код обработки запроса
//   postRequestHandler.handleRequest(req, res);
// });

// app.put("/users/:id", (req, res) => {
//   // Код обработки запроса
//   putRequestHandler.handleRequest(req, res);
// });

// app.delete("/users/:id", (req, res) => {
//   // Код обработки запроса
//   deleteRequestHandler.handleRequest(req, res);
// });

// Используем паттерн "Команда" для разделения логики API в отдельные классы-команды

// Класс для получения данных о пользователе
class GetUserCommand {
  async execute(id: string): Promise<User> {
    // Код получения данных из БД или другого источника
    console.log("get");
    return { id: "TEST" };
  }
}

// Класс для создания нового пользователя
class CreateUserCommand {
  async execute(user: User): Promise<void> {
    // Код создания нового пользователя
    console.log("create");
  }
}

// Класс для обновления данных о пользователе
class UpdateUserCommand {
  async execute(id: string, user: User): Promise<void> {
    // Код обновления данных в БД или другом источнике
    console.log("update");
  }
}

// Класс для удаления пользователя
class DeleteUserCommand {
  async execute(id: string): Promise<void> {
    // Код удаления пользователя из БД или другого источника
    console.log("delete");
  }
}

// Используем паттерн "Стратегия" для выбора соответствующей команды в зависимости от типа запроса

// Общий интерфейс для всех стратегий
interface CommandStrategy {
  execute(...args: any): Promise<any>;
}

// Стратегия для GET запросов - получение данных
class GetCommandStrategy implements CommandStrategy {
  async execute(id: string): Promise<User> {
    const command = new GetUserCommand();
    return await command.execute(id);
  }
}

// Стратегия для POST запросов - создание нового пользователя
class PostCommandStrategy implements CommandStrategy {
  async execute(user: User): Promise<void> {
    const command = new CreateUserCommand();
    return await command.execute(user);
  }
}

// Стратегия для PUT запросов - обновление данных о пользователе
class PutCommandStrategy implements CommandStrategy {
  async execute(id: string, user: User): Promise<void> {
    const command = new UpdateUserCommand();
    return await command.execute(id, user);
  }
}

// Стратегия для DELETE запросов - удаление пользователя
class DeleteCommandStrategy implements CommandStrategy {
  async execute(id: string): Promise<void> {
    const command = new DeleteUserCommand();
    return await command.execute(id);
  }
}

// Используем паттерн "Цепочка обязанностей" для выбора правильной стратегии в зависимости от типа запроса

// Базовый класс для всех обработчиков запросов
abstract class RequestHandler {
  protected nextHandler?: RequestHandler;

  setNext(handler: RequestHandler): RequestHandler {
    this.nextHandler = handler;
    return handler;
  }

  continue(req: express.Request, res: express.Response) {
    if (this.nextHandler) {
      return this.nextHandler.handleRequest(req, res);
    }
    res.sendStatus(404);
    return Promise.resolve();
  }

  abstract handleRequest(
    req: express.Request,
    res: express.Response
  ): Promise<void>;
}

// Обработчик запросов на получение данных
class GetRequestHandler extends RequestHandler {
  handleRequest(req: express.Request, res: express.Response): Promise<void> {
    console.log("get request");
    if (req.method !== "GET") {
      return this.continue(req, res);
    }
    const strategy = new GetCommandStrategy();
    const id = req.params.id;
    return strategy.execute(id).then((user) => {
      res.json(user);
    });
  }
}

// Обработчик запросов на создание нового пользователя
class PostRequestHandler extends RequestHandler {
  handleRequest(req: express.Request, res: express.Response): Promise<void> {
    console.log("post request");
    if (req.method !== "POST") {
      return this.continue(req, res);
    }
    const strategy = new PostCommandStrategy();
    const user = req.body as User;
    return strategy.execute(user).then(() => {
      res.sendStatus(201);
    });
  }
}

// Обработчик запросов на обновление данных о пользователе
class PutRequestHandler extends RequestHandler {
  handleRequest(req: express.Request, res: express.Response): Promise<void> {
    if (req.method !== "PUT") {
      return this.continue(req, res);
    }
    const strategy = new PutCommandStrategy();
    const id = req.params.id;
    const user = req.body as User;
    return strategy.execute(id, user).then(() => {
      res.sendStatus(204);
    });
  }
}

// Обработчик запросов на удаление пользователя
class DeleteRequestHandler extends RequestHandler {
  handleRequest(req: express.Request, res: express.Response): Promise<void> {
    if (req.method !== "DELETE") {
      return this.continue(req, res);
    }
    const strategy = new DeleteCommandStrategy();
    const id = req.params.id;
    return strategy.execute(id).then(() => {
      res.sendStatus(204);
    });
  }
}
// Создаем цепочку обязанностей для обработки запросов

const getRequestHandler = new GetRequestHandler();
const postRequestHandler = new PostRequestHandler();
const putRequestHandler = new PutRequestHandler();
const deleteRequestHandler = new DeleteRequestHandler();

const apiHandler = getRequestHandler;
apiHandler
  .setNext(postRequestHandler)
  .setNext(putRequestHandler)
  .setNext(deleteRequestHandler);

app.use(async (req, res, next) => {
  // Do request for users
  console.log("out request");
  if (req.path.startsWith("/users")) {
    console.log("in request");
    await apiHandler.handleRequest(req, res);
    return;
  }
  res.sendStatus(404);
  next();
});

// Запускаем сервер
app.listen(3000, () => {
  console.log("Server started on port 3000");
});

interface User {
  id: string;
}
