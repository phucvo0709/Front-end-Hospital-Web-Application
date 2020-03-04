import { SET_USER, UN_USER } from "./../constants/actionTypes";

const initialState = {
  isAuthenticated: true,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case UN_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};

export default reducer;
