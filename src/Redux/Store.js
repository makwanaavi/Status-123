import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk";

// Load persisted state from localStorage
function loadState() {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

// Save state to localStorage
function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {}
}

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  const { status, user, editor } = store.getState();
  saveState({ status, user, editor });
});

export default store;
