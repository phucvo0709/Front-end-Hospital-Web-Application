import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "antd";
import { onSetAlert } from "../../actions";
import socketIo from "../../utils/socketIo";

function AlertUI() {
  const dispatch = useDispatch();
  const socket = useSelector(state => state.socket);
  const alert = useSelector(state => state.alert);

  socketIo.on("haveNewRooms", function(id) {
    if (socket.socketId) {
      if (socket.socketId !== id) {
        dispatch(
          onSetAlert({
            type: "info",
            text: "Have new Rooms"
          })
        );
      }
    }
  });

  socketIo.on("haveNewCustomers", function(id) {
    if (socket.socketId) {
      if (socket.socketId !== id) {
        dispatch(
          onSetAlert({
            type: "info",
            text: "Have new customers"
          })
        );
      }
    }
  });

  return (
    alert.showAlert && (
      <Alert
        style={{ margin: "10px" }}
        type={alert.dataAlert.type}
        message={alert.dataAlert.text}
        closable
      />
    )
  );
}

export default AlertUI;
