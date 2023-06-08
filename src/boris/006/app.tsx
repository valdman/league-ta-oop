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
} from "../005";

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
      </head>
      <body>
        <div id="root">
          <MyComponent />
          <script src="/index.js" nonce={scriptHash}></script>
        </div>
      </body>
    </html>
  );
}

export function MyComponent() {
  const [state, dispatch] = useReducer(wrappedReducer, INITIAL_STATE);

  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
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

    for (const action of SIMULATED_ACTIONS) {
      ++i;
      timeoutIds.push(
        setTimeout(() => {
          dispatch(action);
        }, 10 * i)
      );
    }

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
          <MyStuff />
        </div>
      </div>
    </StateProvider>
  );
}

export function MyStuff() {
  const { state, dispatch } = useContext(StateContext);
  const defaultQ = "default text";

  function handleClick() {
    dispatch({
      type: "CHANGE_SEARCH",
      payload: {
        q: defaultQ
      },
    });
  }

  return (
    <button onClick={handleClick}>Click to reset: {state.search.q} {'->'} {defaultQ}</button>
  );
}
