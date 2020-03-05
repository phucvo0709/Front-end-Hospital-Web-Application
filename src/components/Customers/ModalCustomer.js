import React from "react";
import { Button, Modal, Form, Input } from "antd";
import FormUI from "../UI/FormUI";
function ModalCustomer(props) {
  const {
    title,
    visible,
    onFinish,
    onCancel,
    loading,
    customer,
    setCustomer
  } = props;

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} footer={null}>
      <FormUI
        initialValues={customer}
        setInitialValues={setCustomer}
        loading={loading}
        onFinish={onFinish}
      />
    </Modal>
  );
}

export default ModalCustomer;
