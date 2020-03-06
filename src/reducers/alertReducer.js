import { SET_ALERT, UN_ALERT } from "./../constants/actionTypes";

const initialState = {
  showAlert: false,
  dataAlert: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        showAlert: true,
        dataAlert: action.payload
      };
    case UN_ALERT:
      return {
        ...state,
        showAlert: false,
        dataAlert: {}
      };

    default:
      return state;
  }
};

export default reducer;
