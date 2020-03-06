import { SET_ALERT } from "../constants/actionTypes";

export const onSetAlert = data => async dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: data
  });
};
