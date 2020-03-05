import React from "react";
import { Form, Input } from "antd";
import {
  MESSAGE_REQUIRED_NAME,
  MESSAGE_PLACEHOLDER_NAME
} from "../../../constants/message";

function InputName() {
  return (
    <Form.Item
      name={["name"]}
      label="Name"
      rules={[
        {
          required: true,
          message: MESSAGE_REQUIRED_NAME
        }
      ]}
    >
      <Input placeholder={MESSAGE_PLACEHOLDER_NAME} />
    </Form.Item>
  );
}

export default InputName;
