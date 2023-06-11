function main() {
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

    console.log(calculateObjectDiffRecursive(state1, state2));
}

main();

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

function calculateObjectDiffRecursive(cachedState: State, state: State): string[] {
    const finalChanges: string[] = [];
    const changes = calculateStateDiff(cachedState, state);
    if (changes) {
        for (let change of changes) {
            if (cachedState.hasOwnProperty(change) && state.hasOwnProperty(change)) {
                const changesFromF = calculateObjectDiffRecursive(cachedState[change], state[change]);
                for (let changeFromF of changesFromF) {
                    finalChanges.push(change + '.' + changeFromF);
                }
                finalChanges.push(change);
            }
        }
        return finalChanges;
    } else {
        return finalChanges;
    }
}


// console.log({
//     result: calculateStateDiff(
//         // HOMEWORK: explain why this is a TS error but works
//         // The function calculateDiff gets only State in arguments, but we put a string to it
//         // It will work because all types only for TS, and after compilation it will be JS code, without any accurate types
//         cachedState.items[3].comments[1].text,
//         state.items[3].comments[1].text
//     ),
// });