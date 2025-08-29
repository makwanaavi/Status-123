import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import statusReducer from "../components/utilities";
import { thunk } from "redux-thunk";

// Get the initial state from the reducer (for categories)
const initialStatusState = statusReducer(undefined, {});

// Load the status object from localStorage, but remove categories if present
function loadState() {
  try {
    const serializedStatus = localStorage.getItem("reduxStatus");
    if (serializedStatus === null) return undefined;
    const loadedStatus = JSON.parse(serializedStatus);
    // Merge loaded state with initial state to ensure categories always exist
    return {
      status: {
        ...initialStatusState,
        ...loadedStatus,
        categories: initialStatusState.categories,
      },
    };
  } catch (e) {
    return undefined;
  }
}

function saveState(state) {
  try {
    // Save only statuses, activeCategory, etc. (not categories, which are static)
    const { categories, ...statusToSave } = state.status || {};
    const serializedStatus = JSON.stringify(statusToSave);
    localStorage.setItem("reduxStatus", serializedStatus);
  } catch (e) {
    // Ignore write errors
  }
}

const preloadedState = loadState();
const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

// Subscribe to store changes and save only statuses array
store.subscribe(() => {
  saveState(store.getState());
  applyMiddleware(thunk)
});

export default store;
