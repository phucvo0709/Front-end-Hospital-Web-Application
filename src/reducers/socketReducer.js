import { SET_SOCKET_ID, UN_SOCKET_ID } from "./../constants/actionTypes";

const initialState = {
  socketId: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET_ID:
      return {
        ...state,
        socketId: action.payload
      };
    case UN_SOCKET_ID:
      return {
        ...state,
        socketId: ""
      };

    default:
      return state;
  }
};

export default reducer;
