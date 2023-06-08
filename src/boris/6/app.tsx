import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  ActionType,
  INITIAL_STATE,
  SIMULATED_ACTIONS,
  State,
  wrappedReducer,
} from "../5";

const StateContext = createContext<{
  state: State;
  dispatch: (action: ActionType) => void;
}>({ dispatch: () => {}, state: INITIAL_STATE });
const { Provider: StateProvider } = StateContext;

export function Html({ scriptHash }: { scriptHash: string }) {
  return (
    <html>
      <head>
        <title>My App</title>
        <style>{STYLES}</style>
      </head>
      <body>
        <div id="root">
          <MyComponent />
          <script src="/index.js" {...{ "data-hash": scriptHash }}></script>
        </div>
      </body>
    </html>
  );
}

export function MyComponent() {
  const [state, dispatch] = useReducer(wrappedReducer, INITIAL_STATE);

  // На каждое изменение текста в поле ввода меняется состояние,
  // и в консоли появляется сообщение о том, что состояние изменилось
  // (см. src/boris/005.tsx @wrappedReducer)
  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    // @ts-ignore Property value is on target
    const newText = e.target.value;

    dispatch({
      type: "CHANGE_SEARCH",
      payload: {
        q: newText,
      },
    });
  }

  useEffect(() => {
    const timeoutIds: Timer[] = [];
    let i = 0;

    // Действия совершаются с задержкой, чтобы сымитировать пользовательский ввод
    for (const action of SIMULATED_ACTIONS) {
      ++i;
      timeoutIds.push(
        setTimeout(() => {
          dispatch(action);
        }, 700 * i)
      );
    }

    // Просто очистка таймеров при удалении компонента
    return function () {
      for (const timeout of timeoutIds) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <StateProvider value={{ state, dispatch }}>
      <h2>Da, tak mozhno</h2>
      <div>
        <input onChange={handleTextChange} value={state.search.q} />
        <div>
          <ResetButton />
        </div>
      </div>
    </StateProvider>
  );
}

export function ResetButton() {
  const { state, dispatch } = useContext(StateContext);
  const defaultQ = "default text";

  function handleClick() {
    dispatch({
      type: "CHANGE_SEARCH",
      payload: {
        q: defaultQ,
      },
    });
  }

  return (
    <button onClick={handleClick}>
      Click to reset: {state.search.q} {"->"} {defaultQ}
    </button>
  );
}

const STYLES =
  // Это просто стили для примера
  `
  body {
    font-family: sans-serif;
    font-size: 28px;
  }

  body :is(input, button) {
    font-size: inherit;
  }

  button {
    margin: 0.8rem 0;
  }
  `;
