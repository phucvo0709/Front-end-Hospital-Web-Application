import { combineReducers } from "redux";
import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import statusReducer from "./statusReducer";
import roomReducer from "./roomReducer";
import customerReducer from "./customerReducer";

export default combineReducers({
  alert: alertReducer,
  users: userReducer,
  status: statusReducer,
  rooms: roomReducer,
  customers: customerReducer
});
