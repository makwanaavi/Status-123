import { configureStore } from "@reduxjs/toolkit";
import statusReducer, { editorReducer } from "../components/utilities";
import { combineReducers } from "redux";

// Load state from localStorage
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
  } catch (e) {
    // Ignore write errors
  }
}

const rootReducer = combineReducers({
  status: statusReducer,
});



const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
