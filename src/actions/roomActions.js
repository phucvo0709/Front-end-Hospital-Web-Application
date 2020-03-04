import axios from "./../utils/axiosHospital";
import {
  SET_ERROR,
  SET_ROOMS,
  SET_METADATA_ROOMS,
  SET_ROOM,
  PUSH_ROOM,
  PULL_ROOM,
  SET_ROOM_IN_ROOMS
} from "./../constants/actionTypes";

export const onGetRooms = (metadata, type) => dispatch => {
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
    })
    .catch(err => {
      console.log(err);
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

export const onDeleteRoom = (id, metadata) => dispatch => {
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
