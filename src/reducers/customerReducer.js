import {
  SET_CUSTOMERS,
  UN_CUSTOMERS,
  SET_CUSTOMER,
  UN_CUSTOMER,
  SET_METADATA_CUSTOMERS,
  UN_METADATA_CUSTOMERS
} from "./../constants/actionTypes";

const initialState = {
  customers: [],
  metadataCustomers: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    case UN_CUSTOMERS:
      return {
        ...state,
        customers: []
      };

    case SET_METADATA_CUSTOMERS:
      return {
        ...state,
        metadataCustomers: action.payload
      };
    case UN_METADATA_CUSTOMERS:
      return {
        ...state,
        metadataCustomers: {}
      };

    case SET_CUSTOMER:
      return {
        ...state,
        customer: action.payload
      };
    case UN_CUSTOMER:
      return {
        ...state,
        customer: {}
      };
    default:
      return state;
  }
};

export default reducer;
