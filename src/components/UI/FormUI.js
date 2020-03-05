import React, { useState, useEffect } from "react";
import { Form, Button } from "antd";
import isEmpty from "../../validation/is-empty";
import { TEXT_SUBMIT_BUTTON } from "../../constants/message";

function FormUI(props) {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [formLayout, setFormLayout] = useState("horizontal");
  const { loading, initialValues, setInitialValues, onFinish } = props;

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
        {props.children}
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" loading={loading} htmlType="submit">
            {TEXT_SUBMIT_BUTTON}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormUI;
