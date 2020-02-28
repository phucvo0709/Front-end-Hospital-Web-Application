import axios from "axios";

import setAuthToken from "../utils/setAuthToken";
import { SET_USER, SET_ERROR } from "../constants/actionTypes";

// Load User
export const onGetProfireUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: SET_USER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ERROR,
      payload: "auth error"
    });
  }
};
