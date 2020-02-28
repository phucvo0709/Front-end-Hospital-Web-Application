import {
  SET_SUCCESS,
  UN_SUCCESS,
  SET_ERROR,
  UN_ERROR
} from "./../constants/actionTypes";

//action status success
export const setSuccess = payload => dispatch => {
  dispatch({
    type: SET_SUCCESS,
    payload
  });
};

export const unSuccess = () => dispatch => {
  dispatch({
    type: UN_SUCCESS,
    payload: null
  });
};

//action status error
export const setError = payload => dispatch => {
  dispatch({
    type: SET_ERROR,
    payload
  });
};

export const unError = () => dispatch => {
  dispatch({
    type: UN_ERROR,
    payload: null
  });
};
