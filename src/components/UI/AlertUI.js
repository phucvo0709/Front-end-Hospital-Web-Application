import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "antd";
import { onSetAlert } from "../../actions";
import socket from "../../utils/socketIo";

function AlertUI() {
  const dispatch = useDispatch();

  const alert = useSelector(state => state.alert);

  socket.on("haveNewRooms", function() {
    dispatch(
      onSetAlert({
        type: "info",
        text: "Have new rooms"
      })
    );
  });

  socket.on("haveNewCustomers", function() {
    dispatch(
      onSetAlert({
        type: "info",
        text: "Have new customers"
      })
    );
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
