import { configureStore } from "@reduxjs/toolkit";
import statusReducer, { editorReducer } from "../components/utilities";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  status: statusReducer,
  editor: editorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
