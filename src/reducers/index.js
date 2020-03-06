import { combineReducers } from "redux";
import socketReducer from "./socketReducer";

import alertReducer from "./alertReducer";
import userReducer from "./userReducer";
import statusReducer from "./statusReducer";
import roomReducer from "./roomReducer";
import customerReducer from "./customerReducer";

export default combineReducers({
  socket: socketReducer,
  alert: alertReducer,
  users: userReducer,
  status: statusReducer,
  rooms: roomReducer,
  customers: customerReducer
});
