import {
  SET_SUCCESS,
  UN_SUCCESS,
  SET_ERROR,
  UN_ERROR,
  UN_STATUS
} from "./../constants/actionTypes";

const initialState = {
  success: "",
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //reducer success
    case SET_SUCCESS:
      return {
        ...state,
        success: action.payload,
        error: ""
      };
    case UN_SUCCESS:
      return {
        ...state,
        success: ""
      };
    //reducer error
    case SET_ERROR:
      return {
        ...state,
        success: "",
        error: action.payload
      };
    case UN_ERROR:
      return {
        ...state,
        error: ""
      };
    case UN_STATUS:
      return {
        ...state,
        success: "",
        error: ""
      };
    default:
      return state;
  }
};

export default reducer;
