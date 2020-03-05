import React, { useState, useEffect, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetRoom,
  onUnmountRoom,
  onUnmountCustomer,
  onUnSuccessCustomer,
  onAddCustomerToRoom,
  onAddCustomerToProcessing,
  onDeleteCustomer
} from "../actions";
import isEmpty from "../validation/is-empty";
import ModalCustomer from "../components/Customers/ModalCustomer";
import { dateFormat } from "../utils/dateFormat";
import { TEXT_CONFIRM_DELETE } from "../constants/message";
import {
  Popconfirm,
  Table,
  Row,
  Col,
  Button,
  Typography,
  Alert,
  Divider
} from "antd";
import { CaretRightFilled, EditFilled, DeleteFilled } from "@ant-design/icons";
const { Title } = Typography;

function AddCustomerToRoom() {
  let history = useHistory();
  let { id } = useParams();
  //hooks
  const rooms = useSelector(state => state.rooms);
  const customers = useSelector(state => state.customers);
  const dispatch = useDispatch();
  //state
  const [room, setRoom] = useState({});
  const [customer, setCustomer] = useState({});
  const [columnCustomers] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Created At",
      dataIndex: "",
      key: "createdAt",
      render: (text, record) => {
        return dateFormat(record.createdAt);
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
              icon={<EditFilled />}
              onClick={() => handleModalCustomer(record._id)}
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
  const [columnCustomersFinished] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Created At",
      dataIndex: "",
      key: "createdAt",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        return a.createdAt.localeCompare(b.createdAt);
      },
      render: (text, record) => {
        return dateFormat(record.createdAt);
      }
    }
  ]);
  // state modal
  const [loadingButtonCustomer, setLoadingButtonCustomer] = useState(false);
  const [showModalCustomer, setShowModalCustomer] = useState(false);
  const [loadingNextCustomer, setLoadingNextCustomer] = useState(false);

  // effects
  useEffect(() => {
    dispatch(onGetRoom(id));
    return () => {
      dispatch(onUnmountRoom());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!isEmpty(rooms.successGetRoom)) {
      if (rooms.successGetRoom) {
        setRoom(rooms.room);
        setLoadingNextCustomer(false);
      } else {
        dispatch(onUnmountRoom());
        history.push("/");
      }
    }
  }, [rooms.successGetRoom, rooms.room, id, history, dispatch]);

  useEffect(() => {
    if (customers.successCustomer) {
      setLoadingButtonCustomer(false);
      setShowModalCustomer(false);
      setCustomer({});
      dispatch(onUnmountCustomer());
    }
  }, [customers.successCustomer, dispatch]);

  // function
  function handleModalCustomer() {
    dispatch(onUnSuccessCustomer());
    setShowModalCustomer(!showModalCustomer);
  }
  function handleCancel() {
    setShowModalCustomer(false);
  }
  function handleSubmitCustomer(values) {
    setLoadingButtonCustomer(true);
    dispatch(onAddCustomerToRoom(room._id, values));
  }
  function handleSubmitNextCustomer() {
    const { customers, currentCustomer } = room;
    setLoadingNextCustomer(true);
    if (isEmpty(customers)) {
      if (!isEmpty(currentCustomer)) {
        const data = {
          id: room._id,
          idCustomer: room.currentCustomer
        };
        dispatch(onAddCustomerToProcessing(data));
      }
    } else {
      const customer = customers[0];
      const data = {
        id: room._id,
        idCustomer: customer._id
      };
      dispatch(onAddCustomerToProcessing(data));
    }
  }
  function handleDeleteRecord(idCustomer) {
    dispatch(onDeleteCustomer(idCustomer, id));
  }
  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <Button
            style={{
              float: "right",
              marginBottom: "15px"
            }}
            default
            icon={<CaretRightFilled />}
            onClick={() => handleSubmitNextCustomer()}
            loading={loadingNextCustomer}
            disabled={
              isEmpty(room.customers) && isEmpty(room.currentCustomer)
                ? true
                : false
            }
          >
            Next Customer
          </Button>
          <Button
            style={{
              float: "right",
              marginBottom: "15px",
              marginRight: "15px"
            }}
            type="primary"
            onClick={() => handleModalCustomer()}
          >
            Create Customer
          </Button>
        </Col>
        <ModalCustomer
          title="Create and add customer to room"
          visible={showModalCustomer}
          customer={customer}
          setCustomer={setCustomer}
          onCancel={handleCancel}
          onFinish={handleSubmitCustomer}
          loading={loadingButtonCustomer}
        />
      </Row>
      <Alert
        message={`Current Customer: ${
          isEmpty(room.currentCustomer) ? "empty" : room.currentCustomer.name
        }
            `}
        type="info"
        showIcon
      />
      <Divider />
      <div className="container-customers">
        <Title level={3}>Customers Is Quere</Title>
        <Table
          rowKey={"_id"}
          columns={columnCustomers}
          dataSource={room.customers}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
        />
      </div>

      <div className="container-customers-finished">
        <Title level={3}>Customers Finished In Room</Title>
        <Table
          rowKey={"_id"}
          columns={columnCustomersFinished}
          dataSource={room.finishedCustomers}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
        />
      </div>
    </Fragment>
  );
}

export default AddCustomerToRoom;
