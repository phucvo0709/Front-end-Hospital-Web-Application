import React from "react";
import { Modal } from "antd";
import FormUI from "../UI/FormUI";
import InputName from "../Form/Input/InputName";

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
        loading={loading}
        initialValues={customer}
        setInitialValues={setCustomer}
        onFinish={onFinish}
      >
        <InputName />
      </FormUI>
    </Modal>
  );
}

export default ModalCustomer;
