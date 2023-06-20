
let baseState = {
  currentlyOpen: 1,
  currentlyClosed: 2,
  user: { username: "gena"},
  cart: [1, 2, 3],
  updatablecart: [1, 2, 3],

};

const structuredClone = (obj: any) => JSON.parse(JSON.stringify(obj));
let newState = structuredClone(baseState);
newState.currentlyOpen = 1;
newState.currentlyClosed = 2;
newState.name = "alex";
newState.user = { username: "alex", login: 123}
newState.computer = { compname: "444"}
newState.updatablecart = [0, -1]
newState.newcart = [4, 5, 6]


//type State = Record<string, unknown>;


const changedKeys = [];
const fullPath = ""
function calculateStateDiff(cachedEntries: [string, unknown][], entries: [string, unknown][], fullPath: string) {
  
  for (const [newStateKey, newStateKeyValue] of entries) {
    
    function isKeyMatched([cacheStateKey, cacheStateValue]: [string, unknown]) {
      const isKeysSame = cacheStateKey === newStateKey;
      return isKeysSame;
    }
    
    const found = cachedEntries.find(isKeyMatched);
    
    if (!found) {
      changedKeys.push(fullPath === "" ? fullPath.concat(newStateKey) : fullPath.substring(0, fullPath.length - 1)); //rewriting parent element intead of new child
      continue;
    }

    const [foundKey, foundValue] = found;
    if (newStateKeyValue === foundValue) continue;

    if(newStateKeyValue instanceof Object && !(newStateKeyValue instanceof Array) && found) {
      const [foundKey, foundValue] = found;
      calculateStateDiff(Object.entries(foundValue), Object.entries(newStateKeyValue), fullPath.concat(newStateKey.concat(".")))
      continue
   }
    
    changedKeys.push(fullPath.concat(foundKey));
  }

  return changedKeys;
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
  m: {
    q: 4
  }
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
      f: {
        q: {
          q: 4
        }
      },
  },
  u: {
    h: 7
  },
  m: "s"
};

const cachedEntries = Object.entries(baseState);
const entries = Object.entries(newState);
const diff = calculateStateDiff(cachedEntries, entries, fullPath)

//const cachedEntries = Object.entries(state1);
//const entries = Object.entries(state2);
//const diff = calculateStateDiff(cachedEntries, entries, fullPath)
console.log(diff)

