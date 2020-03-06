import axios from "./../utils/axiosHospital";
import {
  SET_ERROR,
  SET_CUSTOMERS,
  SET_METADATA_CUSTOMERS,
  SET_CUSTOMER,
  PUSH_CUSTOMER,
  PULL_CUSTOMER,
  SET_CUSTOMER_IN_CUSTOMERS,
  SET_SUCCESS_CUSTOMER
} from "./../constants/actionTypes";
import isEmpty from "../validation/is-empty";
import { onGetRoom } from "./roomActions";
import socketIo from "../utils/socketIo";

export const onGetCustomers = metadata => dispatch => {
  axios
    .get("customers/", {
      params: metadata
    })
    .then(res => {
      dispatch({
        type: SET_CUSTOMERS,
        payload: res.data
      });
      dispatch({
        type: SET_METADATA_CUSTOMERS,
        payload: res.data.metadata
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    });
};

export const onGetCustomer = id => dispatch => {
  axios
    .get(`customers/${id}/`)
    .then(res => {
      dispatch({
        type: SET_CUSTOMER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const onAddCustomer = data => dispatch => {
  axios
    .post(`customers/`, data)
    .then(res => {
      socketIo.emit("newCustomers");
      dispatch({
        type: PUSH_CUSTOMER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const onUpdateCustomer = (idCustomer, data, idRoom) => dispatch => {
  console.log(idRoom);
  axios
    .put(`customers/${idCustomer}/`, data)
    .then(res => {
      if (isEmpty(idRoom)) {
        dispatch({
          type: SET_CUSTOMER_IN_CUSTOMERS,
          payload: res.data
        });
      } else {
        dispatch(onGetRoom(idRoom));
        dispatch({
          type: SET_SUCCESS_CUSTOMER
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const onDeleteCustomer = (idCustomer, idRoom) => dispatch => {
  axios
    .delete(`customers/${idCustomer}/`)
    .then(res => {
      if (isEmpty(idRoom)) {
        dispatch({
          type: PULL_CUSTOMER,
          payload: idCustomer
        });
      } else {
        dispatch(onGetRoom(idRoom));
      }
    })
    .catch(err => {
      console.log(err);
    });
};
