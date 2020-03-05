import React from "react";
import { Modal } from "antd";
import FormUI from "../UI/FormUI";
import InputName from "../Form/Input/InputName";

function ModalRoom(props) {
  const { title, visible, onFinish, onCancel, loading, room, setRoom } = props;

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} footer={null}>
      <FormUI
        loading={loading}
        initialValues={room}
        setInitialValues={setRoom}
        onFinish={onFinish}
      >
        <InputName />
      </FormUI>
    </Modal>
  );
}

export default ModalRoom;
