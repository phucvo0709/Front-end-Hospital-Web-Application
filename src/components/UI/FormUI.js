import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import isEmpty from "../../validation/is-empty";

function FormUI(props) {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [formLayout, setFormLayout] = useState("horizontal");
  const { initialValues, setInitialValues, loading, onFinish } = props;

  function onFormChange(key, value) {
    setInitialValues(value);
  }

  function onFormFinish(values) {
    onFinish(values);
  }

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  //set layout
  useEffect(() => {
    if (!isEmpty(props.formLayout)) {
      if (props.formLayout !== formLayout) {
        // horizontal
        //    vertical
        //    inline
        setFormLayout(props.formLayout);
      }
    }
  }, [props.formLayout, formLayout, setFormLayout]);

  //set initialValues
  useEffect(() => {
    if (!isEmpty(initialValues)) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [form, initialValues]);

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
      : null;

  const buttonItemLayout =
    formLayout === "horizontal"
      ? {
          wrapperCol: { span: 14, offset: 4 }
        }
      : null;

  return (
    <div>
      <Form
        {...formItemLayout}
        layout={formLayout}
        form={form}
        onValuesChange={onFormChange}
        onFinish={onFormFinish}
      >
        <Form.Item
          name={["name"]}
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your nickname"
            }
          ]}
        >
          <Input placeholder="Eneter a name" />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" loading={loading} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormUI;
