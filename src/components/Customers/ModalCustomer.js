import React from "react";
import { Button, Modal, Form, Input } from "antd";
function ModalCustomer(props) {
  const {
    title,
    visible,
    fields,
    onFinish,
    onCancel,
    setFields,
    loading
  } = props;

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
  };
  const validateMessages = {
    required: "This field is required!",
    types: {
      name: "Not a validate name!"
    }
  };
  return (
    <Modal title={title} visible={visible} onCancel={onCancel} footer={null}>
      <Form
        fields={fields}
        {...layout}
        onFinish={onFinish}
        validateMessages={validateMessages}
        onFieldsChange={(changedFields, allFields) => {
          setFields(allFields);
        }}
      >
        <Form.Item
          name={["name"]}
          label="Name"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalCustomer;
