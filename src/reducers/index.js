import { combineReducers } from "redux";
import userReducer from "./userReducer";
import statusReducer from "./statusReducer";
import roomReducer from "./roomReducer";
import customerReducer from "./customerReducer";

export default combineReducers({
  users: userReducer,
  status: statusReducer,
  rooms: roomReducer,
  customers: customerReducer
});
