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

const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

export default store;
