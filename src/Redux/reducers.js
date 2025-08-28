import statusReducer, { editorReducer } from "../components/utilities";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  status: statusReducer,
  editor: editorReducer,
});

export default rootReducer;

