import axios from "./../utils/axiosHospital";
import {
  SET_ERROR,
  SET_CUSTOMERS,
  SET_METADATA_CUSTOMERS,
  SET_CUSTOMER,
  PUSH_CUSTOMER,
  PULL_CUSTOMER,
  SET_CUSTOMER_IN_CUSTOMERS
} from "./../constants/actionTypes";

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
      dispatch({
        type: PUSH_CUSTOMER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const onUpdateCustomer = (id, data) => dispatch => {
  axios
    .put(`customers/${id}/`, data)
    .then(res => {
      dispatch({
        type: SET_CUSTOMER_IN_CUSTOMERS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const onDeleteCustomer = id => dispatch => {
  axios
    .delete(`customers/${id}/`)
    .then(res => {
      dispatch({
        type: PULL_CUSTOMER,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
    });
};
