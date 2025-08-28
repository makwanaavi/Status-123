import statusReducer, { editorReducer } from "../components/utilities";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  status: statusReducer,
});

export default rootReducer;

