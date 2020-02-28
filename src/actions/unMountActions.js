import { UN_STATUS } from "../constants/actionTypes";

export const onUnmountStatus = () => dispatch => {
  return dispatch({
    type: UN_STATUS
  });
};
