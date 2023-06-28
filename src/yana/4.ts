function main() {
  // Test from lesson
  console.log({ result: calculateStateDiffRecursive(state1, state2) });
  // console.log({
  //   result: calculateStateDiff(
	// 	// HOMEWORK: explain why this is a TS error but works
  //     cachedState.items[3].comments[1].text,
  //     state.items[3].comments[1].text
  //   ),
  // });
}
const state1 = {
  a: 1,
  b: {
      c: 2,
      d: 3,
      t: {
        l: 5
      }
  },
  e: 4,
};

const state2 = {
  a: 1,
  b: {
      c: 20,
      d: 3,
      t: {
        g: 8,
        l: 6
      }
  },
  e: {
      f: 5,
  },
  u: {
    h: 7
  }
};

type State = Record<string, unknown>;

function calculateStateDiff(cachedState: State, state: State) {
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

function calculateStateDiffRecursive(cachedState: State, newState: State): string[] {
  const results : string[] = [];
  const changedKeys = calculateStateDiff(cachedState, newState);

  for (const changedKey of changedKeys) {
    if (Object.hasOwn(cachedState, changedKey) && typeof cachedState[changedKey] === 'object') {
      const newKeys = calculateStateDiffRecursive(cachedState[changedKey] as State, newState[changedKey] as State);
      for (const newKey of newKeys) {
        results.push(`${changedKey}.${newKey}`)
      }
    }
    else {
      results.push(changedKey);
    }
  }
  console.log(results);
  return results;
}

const array = main();