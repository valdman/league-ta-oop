import { setIn } from "immutable";
import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { NeverError } from "./005_1";

interface Actions {
  login: {
    type: "LOGIN";
    payload: {
      user: User;
    };
  };
  logout: {
    type: "LOGOUT";
  };
  changeSearch: {
    type: "CHANGE_SEARCH";
    payload: { q: string };
  };
  superAction: {
    type: "SUPER_ACTION";
  };
}

type ActionType = Actions[keyof Actions];

const actions: ActionType[] = [
  {
    type: "LOGIN" as const,
    payload: { user: {} },
  },
  {
    type: "CHANGE_SEARCH" as const,
    payload: { q: "new search text" },
  },
  {
    type: "LOGOUT" as const,
  },
  {
    type: "SUPER_ACTION" as const,
  },
];

interface User {}

const INITIAL_STATE = {
  search: {
    q: "",
    results: [],
  },
  user: null as User | null,
};

export type State = typeof INITIAL_STATE;

function appReducer(state: State, action: ActionType): State {
  switch (action.type) {
    case "LOGIN":
      return setIn(state, ["user"], action.payload.user);
    case "LOGOUT":
      return setIn(state, ["user"], null);
    case "CHANGE_SEARCH":
      return setIn(state, ["search", "q"], action.payload.q);
    case "SUPER_ACTION":
      return state;
    default:
      throw new NeverError(action, "Action is unfamiliar to reducer");
  }
  return state;
}

interface Reducer {
  (state: State, action: ActionType): State;
}

function wrapReducer(reducer: Reducer): Reducer {
  const result: Reducer = function (state, action) {
    const changedState = reducer(state, action);
    console.log({
      action: action.type,
      diff: calculateObjectDiffRecursive(state, changedState),
    });
    return changedState;
  };

  return result;
}

const wrappedReducer = wrapReducer(appReducer);
const newState = actions.reduce(wrappedReducer, INITIAL_STATE);

console.log({ newState });

// Allowed actions
// CHANGE_SEARCH
// LOGIN/LOGOUT
// GET_PRODUCT_LIST_SUCCESSFUL

export function calculateStateDiff(cachedState: State, state: State) {
  const cachedEntries = Object.entries(cachedState);
  const entries = Object.entries(state);

  const changedKeys = [];
  for (const [newStateKey, newStateKeyValue] of entries) {
    function isKeyMatched([cacheStateKey, cacheStateValue]: [string, unknown]) {
      const isKeysSame = cacheStateKey === newStateKey;

      return isKeysSame;
    }

    const found = cachedEntries.find(isKeyMatched);

    if (!found) {
      changedKeys.push(newStateKey);
      continue;
    }

    const [foundKey, foundValue] = found;
    if (newStateKeyValue === foundValue) continue;

    changedKeys.push(foundKey);
  }

  return changedKeys;
}

function calculateObjectDiffRecursive(
  cachedState: State,
  state: State
): string[] {
  const finalChanges: string[] = [];
  const changes = calculateStateDiff(cachedState, state);
  if (changes) {
    for (let change of changes) {
      const wasKey = cachedState[change] == null;
      const hasKey = state[change] == null;

      if ((!wasKey && hasKey) || (wasKey && !hasKey)) {
        finalChanges.push(change);
        continue;
      }

      const wasString = typeof cachedState[change] === "string";
      const hasString = typeof state[change] === "string";

      if (wasKey && hasString && cachedState[change] === state[change]) {
        continue;
      }

      if (wasString || hasString) {
        finalChanges.push(change);
        continue;
      }

      if (cachedState.hasOwnProperty(change) && state.hasOwnProperty(change)) {
        const changesFromF = calculateObjectDiffRecursive(
          cachedState[change],
          state[change]
        );
        for (let changeFromF of changesFromF) {
          finalChanges.push(change + "." + changeFromF);
        }
        finalChanges.push(change);
      }
    }
    return finalChanges;
  } else {
    return finalChanges;
  }
}

const StateContext = createContext<{
  state: State;
  dispatch: (action: ActionType) => void;
}>({ dispatch: () => {}, state: INITIAL_STATE });

function MyComponent() {
  const [state, dispatch] = useReducer(wrappedReducer, INITIAL_STATE);

  function handleTextChange(e: Event) {
    const newText = e.target?.value;

    dispatch({
      type: "CHANGE_SEARCH",
      payload: {
        q: newText,
      },
    });
  }

  useEffect(() => {
    const timeoutId = setInterval(() => {
      dispatch({
        type: "CHANGE_SEARCH",
        payload: {
          q: "newText",
        },
      });
    }, 200);
    return () => clearInterval(timeoutId);
  }, []);

  const res = (
    <StateContext.Provider value={{state, dispatch}}>
      <div>
        <input onChange={handleTextChange} value={state.search.q} />
        <div>
          <p>{}</p>
          <MyStuff />
        </div>
      </div>
    </StateContext.Provider>
  );

  console.log(res);

  return res;
}

function MyStuff() {
  const {state, dispatch} = useContext(StateContext);

  function handleClick() {
	dispatch({
		type: "CHANGE_SEARCH",
		payload: {
			q: "newText",
		},
	});
  }

  return <p onClick={handleClick}>{state.search.q}</p>;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
