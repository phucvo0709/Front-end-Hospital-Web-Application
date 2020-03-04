//AUTH
export { onGetProfireUser } from "./authActions";
//STATUS
export { setSuccess, unSuccess, setError, unError } from "./statusActions";
// UNMOUNT
export {
  onUnmountStatus,
  onUnmountCustomers,
  onUnmountCustomer,
  onUnSuccessCustomer,
  onUnmountRooms,
  onUnmountRoom,
  onUnSuccessRoom
} from "./unMountActions";
//ROOMS
export {
  onGetRooms,
  onGetRoom,
  onAddRoom,
  onUpdateRoom,
  onDeleteRoom
} from "./roomActions";
//CUSTOMERS
export {
  onGetCustomers,
  onGetCustomer,
  onAddCustomer,
  onUpdateCustomer,
  onDeleteCustomer
} from "./customerActions";
