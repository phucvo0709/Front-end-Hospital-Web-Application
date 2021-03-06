import { batch } from "react-redux";
import {
  UN_STATUS,
  UN_ROOMS,
  UN_ROOM,
  UN_METADATA_ROOMS,
  UN_CUSTOMERS,
  UN_CUSTOMER,
  UN_METADATA_CUSTOMERS,
  UN_SUCCESS_ROOM,
  UN_SUCCESS_CUSTOMER,
  UN_ALERT,
  UN_SOCKET_ID
} from "../constants/actionTypes";

export const onUnSocket = () => dispatch => {
  return batch(() => {
    dispatch({
      type: UN_SOCKET_ID
    });
  });
};

export const onUnmountStatus = () => dispatch => {
  return dispatch({
    type: UN_STATUS
  });
};

//rooms
export const onUnmountRooms = () => dispatch => {
  return batch(() => {
    dispatch({
      type: UN_STATUS
    });
    dispatch({
      type: UN_ROOMS
    });
    dispatch({
      type: UN_METADATA_ROOMS
    });
    dispatch({
      type: UN_SUCCESS_ROOM
    });
  });
};

export const onUnmountRoom = () => dispatch => {
  return batch(() => {
    dispatch({
      type: UN_ROOM
    });
    dispatch({
      type: UN_SUCCESS_ROOM
    });
  });
};

export const onUnSuccessRoom = () => dispatch => {
  return batch(() => {
    dispatch({
      type: UN_SUCCESS_ROOM
    });
  });
};

// customers
export const onUnmountCustomers = () => dispatch => {
  return batch(() => {
    dispatch({
      type: UN_STATUS
    });
    dispatch({
      type: UN_CUSTOMERS
    });
    dispatch({
      type: UN_METADATA_CUSTOMERS
    });
    dispatch({
      type: UN_SUCCESS_CUSTOMER
    });
  });
};

export const onUnmountCustomer = () => dispatch => {
  return batch(() => {
    dispatch({
      type: UN_CUSTOMER
    });
    dispatch({
      type: UN_SUCCESS_CUSTOMER
    });
  });
};

export const onUnSuccessCustomer = () => dispatch => {
  return batch(() => {
    dispatch({
      type: UN_SUCCESS_CUSTOMER
    });
  });
};

export const onUnAlert = () => dispatch => {
  return batch(() => {
    dispatch({
      type: UN_ALERT
    });
  });
};
