import React from "react";
import { message } from "antd";
import isEmpty from "./../../validation/is-empty";

export function renderMessage(type, text) {
  let renderData = "";
  switch (type) {
    case "success":
      renderData = text !== "Successfully" && (
        <div>{message.success(text)}</div>
      );
      break;
    case "warning":
      renderData = <div>{message.warning(text)}</div>;
      break;
    case "error":
      renderData = <div>{message.error(text)}</div>;
      break;
    default:
      break;
  }
  return renderData;
}

export function renderMessageStatus(status) {
  if (!isEmpty(status)) {
    if (
      !isEmpty(status.success) &&
      isEmpty(status.warning) &&
      isEmpty(status.error)
    ) {
      return renderMessage("success", status.success);
    }
    if (
      isEmpty(status.success) &&
      !isEmpty(status.warning) &&
      isEmpty(status.error)
    ) {
      return renderMessage("warning", status.warning);
    }
    if (
      isEmpty(status.success) &&
      isEmpty(status.warning) &&
      !isEmpty(status.error)
    ) {
      return renderMessage("error", status.error);
    }
  }
}
