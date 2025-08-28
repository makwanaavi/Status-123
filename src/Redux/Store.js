import { configureStore } from "@reduxjs/toolkit";
import statusReducer, { editorReducer } from "../components/utilities";
import { combineReducers } from "redux";

// Load the status object from localStorage, but remove categories if present
function loadState() {
  try {
    const serializedStatus = localStorage.getItem("reduxStatus");
    if (serializedStatus === null) return undefined;
    const status = JSON.parse(serializedStatus);
    // Remove categories if present in localStorage
    if (status && status.categories) {
      delete status.categories;
    }
    return { status };
  } catch (e) {
    return undefined;
  }
}

// Save the status object to localStorage, but exclude categories
function saveState(state) {
  try {
    const { categories, ...statusWithoutCategories } = state.status || {};
    const serializedStatus = JSON.stringify(statusWithoutCategories);
    localStorage.setItem("reduxStatus", serializedStatus);
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

// Subscribe to store changes and save only statuses array
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
