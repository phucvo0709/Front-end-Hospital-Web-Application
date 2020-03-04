import {
  PUSH_ROOM,
  PULL_ROOM,
  SET_ROOMS,
  UN_ROOMS,
  SET_ROOM,
  UN_ROOM,
  SET_METADATA_ROOMS,
  UN_METADATA_ROOMS,
  UN_SUCCESS_ROOM,
  SET_ROOM_IN_ROOMS
} from "./../constants/actionTypes";

const initialState = {
  rooms: [],
  metadataRooms: {},
  room: {},
  successRoom: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload
      };
    case UN_ROOMS:
      return {
        ...state,
        rooms: []
      };

    case SET_METADATA_ROOMS:
      return {
        ...state,
        metadataRooms: action.payload
      };
    case UN_METADATA_ROOMS:
      return {
        ...state,
        metadataRooms: {}
      };

    case SET_ROOM:
      return {
        ...state,
        room: action.payload
      };
    case UN_ROOM:
      return {
        ...state,
        room: {}
      };
    case PUSH_ROOM:
      return {
        ...state,
        successRoom: true,
        rooms: [action.payload, ...state.rooms]
      };
    case PULL_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter(room => room._id !== action.payload)
      };
    case SET_ROOM_IN_ROOMS:
      return {
        ...state,
        successRoom: true,
        rooms: state.rooms.map(room => {
          if (room._id === action.payload._id) {
            return action.payload;
          }
          return room;
        })
      };
    case UN_SUCCESS_ROOM:
      return {
        ...state,
        successRoom: false
      };
    default:
      return state;
  }
};

export default reducer;
