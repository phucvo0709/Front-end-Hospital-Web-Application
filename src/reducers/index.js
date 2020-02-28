import { combineReducers } from "redux";
import userReducer from "./userReducer";
import statusReducer from "./statusReducer";

export default combineReducers({
  users: userReducer,
  status: statusReducer
});
