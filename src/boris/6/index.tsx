import { hydrateRoot } from "react-dom/client";
import { MyComponent } from "./app";

// Обратите внимание, что эта функция выполняется при импорте модуля
// Это нужно для того, чтобы при импорте этого модуля в браузере, React начал работать
runReact();

function runReact() {
  // @ts-ignore Lib DOM уже установлен в ./tsconfig.json. Откуда баг?
  const root = document.getElementById("root");

  hydrateRoot(root, <MyComponent />);
}
