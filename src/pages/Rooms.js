import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { EditFilled, DeleteFilled, FileAddFilled } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import ModalRoom from "../components/Rooms/ModalRoom";
import isEmpty from "../validation/is-empty";
import {
  TEXT_CONFIRM_DELETE,
  TEXT_CREATE_ROOM,
  TEXT_UPDATE_ROOM
} from "../constants/message";

function Rooms(props) {
  let history = useHistory();
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
      title: "Customers In Quere",
      dataIndex: "customerQuere",
      key: "customerQuere",
      sorter: (a, b) => a.customers.length - b.customers.length,
      render: (text, record) => {
        return record.customers.length;
      }
    },
    {
      title: "Customers In Processing",
      dataIndex: "customerProcessing",
      key: "customerProcessing",
      render: (text, record) => {
        return isEmpty(record.currentCustomer)
          ? "No Customer"
          : record.currentCustomer.name;
      }
    },
    {
      title: "Customers In Finished",
      dataIndex: "customerFinished",
      key: "customerFinished",
      sorter: (a, b) => a.finishedCustomers.length - b.finishedCustomers.length,
      render: (text, record) => {
        return record.finishedCustomers.length;
      }
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
              icon={<FileAddFilled />}
              onClick={() => handleRedirectToRoom(record._id)}
            />
            <Divider type="vertical" />
            <Button
              type="primary"
              icon={<EditFilled />}
              onClick={() => handleModalRoom(record._id)}
            />
            <Divider type="vertical" />
            <Popconfirm
              placement="bottomRight"
              title={TEXT_CONFIRM_DELETE}
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
  const [actionModalRoom, setActionModalRoom] = useState(TEXT_CREATE_ROOM);
  const [loadingButtonRoom, setLoadingButtonRoom] = useState(false);
  const [showModalRoom, setShowModalRoom] = useState(false);

  // rooms
  useEffect(() => {
    dispatch(onGetRooms());
  }, [dispatch]);

  useEffect(() => {
    if (rooms.rooms !== dataRooms) {
      setLoadingTable(false);
      setDataRooms(rooms.rooms);
    }
  }, [rooms.rooms, dataRooms]);

  //room
  useEffect(() => {
    setRoom(rooms.room);
  }, [rooms.room]);

  useEffect(() => {
    if (rooms.successRoom) {
      setLoadingButtonRoom(false);
      setShowModalRoom(false);
      dispatch(onUnmountRoom());
    }
  }, [rooms.successRoom, dispatch]);

  // function
  function handleRedirectToRoom(id) {
    history.push({
      pathname: "/add-customer-to-room/" + id
    });
  }
  function handleModalRoom(id) {
    if (!isEmpty(id)) {
      setActionModalRoom(TEXT_UPDATE_ROOM);
      dispatch(onGetRoom(id));
    } else {
      setActionModalRoom(TEXT_CREATE_ROOM);
      dispatch(onUnSuccessRoom());
    }
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
    if (actionModalRoom === TEXT_CREATE_ROOM) {
      dispatch(onAddRoom(values));
    } else {
      dispatch(onUpdateRoom(room._id, values));
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
            {TEXT_CREATE_ROOM}
          </Button>
        </Col>
        <ModalRoom
          title={actionModalRoom}
          visible={showModalRoom}
          room={room}
          setRoom={setRoom}
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
