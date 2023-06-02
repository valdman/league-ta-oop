function main() {
  const values = [1];
  const obj = { xxx: values };

  obj.xxx.push(3);
  obj.xxx = [1, 2];

  // Test from lesson
  console.log({ result: calculateStateDiff(cachedState, state) });
  console.log({ result: calculateStateDiff(cachedState.items, state.items) });
  console.log({
    result: calculateStateDiff(cachedState.items[3], state.items[3]),
  });
  console.log({
    result: calculateStateDiff(
      cachedState.items[3].comments,
      state.items[3].comments
    ),
  });
  console.log({
    result: calculateStateDiff(
      cachedState.items[3].comments[1],
      state.items[3].comments[1]
    ),
  });
  console.log({
    result: calculateStateDiff(
		// HOMEWORK: explain why this is a TS error but works
      cachedState.items[3].comments[1].text,
      state.items[3].comments[1].text
    ),
  });

  return obj.xxx;
}

const myArray = main();
const myArray2 = main();

// console.log({ isSame: myArray === myArray2 }); -> false

// React (FLUX)

// state -> view -> actions
// ^-----------------<|

let state = {
  currentlyOpen: 1,
  currentUser: {},
  cart: [1, 2, 3],
  items: {
    1: {},
    2: {},
    3: {
      comments: {
        1: {
          text: "good",
        },
        2: {
          text: "bad",
        },
      },
    },
  },
};

// render(state) -> <html><cart/><itemList><item>{oldText}</item></itemList></html>

const action = {
  type: "changeComment",
  itemId: 3 as const,
  commentId: 1 as const,
  newText: "very bad",
};

const cachedState = { ...state };

// state.items[action.itemId].comments[action.commentId].text = action.newText;
state = {
  ...state,
  items: {
    ...state.items,
    [action.itemId]: {
      ...state.items[action.itemId],
      comments: {
        ...state.items[action.itemId].comments,
        [action.commentId]: { text: action.newText },
      },
    },
  },
};

// render(state2) -> <html><cart/><itemList><item>{newText}</item></itemList></html>

type State = Record<string, unknown>;

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
