import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetRooms,
  onDeleteRoom,
  onAddRoom,
  onUnSuccessRoom,
  onUpdateRoom,
  onGetRoom,
  onUnmountRoom
} from "../actions/";
import { Popconfirm, Divider, Button, Row, Col, Table } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import ModalRoom from "../components/Rooms/ModalRoom";
import isEmpty from "../validation/is-empty";

function Rooms(props) {
  //hooks
  const rooms = useSelector(state => state.rooms);
  const dispatch = useDispatch();
  //state
  const [columnRooms] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record) => {
        return (
          <span className="container-buttons">
            <Button
              type="primary"
              icon={<EditFilled />}
              onClick={() => handleModalRoom(record._id)}
            />
            <Divider type="vertical" />
            <Popconfirm
              placement="bottomRight"
              title="Confirm Delete!"
              onConfirm={() => handleDeleteRecord(record._id)}
            >
              <Button type="danger" icon={<DeleteFilled />} />
            </Popconfirm>
          </span>
        );
      }
    }
  ]);
  const [dataRooms, setDataRooms] = useState([]);
  const [room, setRoom] = useState({});
  const [loadingTable, setLoadingTable] = useState(true);
  //modal
  const [actionModalRoom, setActionModalRoom] = useState("Create Room");
  const [loadingButtonRoom, setLoadingButtonRoom] = useState(false);
  const [showModalRoom, setShowModalRoom] = useState(false);
  const [fields, setFields] = useState([{ name: "name", value: "" }]);

  useEffect(() => {
    dispatch(onGetRooms());
  }, [dispatch]);

  useEffect(() => {
    if (rooms.successRoom) {
      setLoadingButtonRoom(false);
      setShowModalRoom(false);
      dispatch(onUnmountRoom());
    }
  }, [rooms.successRoom, dispatch]);

  useEffect(() => {
    if (rooms.rooms !== dataRooms) {
      setLoadingTable(false);
      setDataRooms(rooms.rooms);
    }
  }, [rooms.rooms, dataRooms]);

  useEffect(() => {
    if (rooms.room !== room) {
      setRoom(rooms.room);
      if (isEmpty(rooms.room)) {
        setActionModalRoom("Create Room");
        setFields([{ name: "name", value: "" }]);
      } else {
        setActionModalRoom("Edit Room");
        setFields([{ name: "name", value: rooms.room.name }]);
      }
    }
  }, [rooms.room, room]);

  function handleModalRoom(id) {
    if (id) {
      dispatch(onGetRoom(id));
    }
    dispatch(onUnSuccessRoom());
    setShowModalRoom(!showModalRoom);
  }

  function handleDeleteRecord(id) {
    dispatch(onDeleteRoom(id));
  }
  function handleCancel() {
    setShowModalRoom(false);
    if (!isEmpty(room)) {
      dispatch(onUnmountRoom());
    }
  }

  function handleSubmitRoom(values) {
    setLoadingButtonRoom(true);
    const data = {
      name: values.name
    };
    if (actionModalRoom === "Create Room" && isEmpty(room)) {
      dispatch(onAddRoom(data));
    } else {
      dispatch(onUpdateRoom(room._id, data));
    }
  }

  return (
    <div>
      <Helmet>
        <title>Rooms</title>
      </Helmet>
      <Row>
        <Col span={24}>
          <Button
            style={{ float: "right", marginBottom: "15px" }}
            type="primary"
            onClick={() => handleModalRoom()}
          >
            Create Room
          </Button>
        </Col>
        <ModalRoom
          title={actionModalRoom}
          visible={showModalRoom}
          fields={fields}
          setFields={setFields}
          onCancel={handleCancel}
          onFinish={handleSubmitRoom}
          loading={loadingButtonRoom}
        />
      </Row>
      <div className="container-table">
        <Table
          rowKey={"_id"}
          columns={columnRooms}
          dataSource={dataRooms}
          loading={loadingTable}
        />
      </div>
    </div>
  );
}

export default Rooms;
