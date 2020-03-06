import { SET_SOCKET_ID } from "../constants/actionTypes";

export const onSetSocketId = data => async dispatch => {
  dispatch({
    type: SET_SOCKET_ID,
    payload: data
  });
};
