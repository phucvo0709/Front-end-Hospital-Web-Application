import axios from "./../utils/axiosHospital";
import {
  SET_ERROR,
  SET_ROOMS,
  SET_METADATA_ROOMS,
  SET_ROOM,
  PUSH_ROOM,
  PULL_ROOM,
  SET_ROOM_IN_ROOMS,
  SET_SUCCESS_GET_ROOM,
  UN_SUCCESS_GET_ROOM
} from "./../constants/actionTypes";

export const onGetRooms = metadata => dispatch => {
  axios
    .get("rooms/", {
      params: metadata
    })
    .then(res => {
      dispatch({
        type: SET_ROOMS,
        payload: res.data
      });
      dispatch({
        type: SET_METADATA_ROOMS,
        payload: res.data.metadata
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ERROR,
        payload: err
      });
    });
};

export const onGetRoom = id => dispatch => {
  axios
    .get(`rooms/${id}/`)
    .then(res => {
      dispatch({
        type: SET_ROOM,
        payload: res.data
      });
      dispatch({
        type: SET_SUCCESS_GET_ROOM
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: UN_SUCCESS_GET_ROOM
      });
    });
};

export const onAddRoom = data => dispatch => {
  axios
    .post(`rooms/`, data)
    .then(res => {
      dispatch({
        type: PUSH_ROOM,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const onUpdateRoom = (id, data) => dispatch => {
  axios
    .put(`rooms/${id}/`, data)
    .then(res => {
      dispatch({
        type: SET_ROOM_IN_ROOMS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const onDeleteRoom = id => dispatch => {
  axios
    .delete(`rooms/${id}/`)
    .then(res => {
      dispatch({
        type: PULL_ROOM,
        payload: id
      });
    })
    .catch(err => {
      console.log(err);
    });
};
