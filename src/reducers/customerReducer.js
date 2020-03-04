import {
  PUSH_CUSTOMER,
  PULL_CUSTOMER,
  SET_CUSTOMERS,
  UN_CUSTOMERS,
  SET_CUSTOMER,
  UN_CUSTOMER,
  SET_METADATA_CUSTOMERS,
  UN_METADATA_CUSTOMERS,
  UN_SUCCESS_CUSTOMER,
  SET_CUSTOMER_IN_CUSTOMERS
} from "./../constants/actionTypes";

const initialState = {
  customers: [],
  metadataCustomers: {},
  customer: {},
  successCustomer: false
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
    case PUSH_CUSTOMER:
      return {
        ...state,
        successCustomer: true,
        customers: [action.payload, ...state.customers]
      };
    case PULL_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer._id !== action.payload
        )
      };
    case SET_CUSTOMER_IN_CUSTOMERS:
      return {
        ...state,
        successCustomer: true,
        customers: state.customers.map(customer => {
          if (customer._id === action.payload._id) {
            return action.payload;
          }
          return customer;
        })
      };
    case UN_SUCCESS_CUSTOMER:
      return {
        ...state,
        successCustomer: false
      };
    default:
      return state;
  }
};

export default reducer;
