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
  onDeleteCustomer,
  onGetCustomer,
  onUpdateCustomer,
  onUpdateRoom
} from "../actions";
import isEmpty from "../validation/is-empty";
import ModalCustomer from "../components/Customers/ModalCustomer";
import { dateFormat } from "../utils/dateFormat";
import {
  TEXT_CONFIRM_DELETE,
  TEXT_CREATE_CUSTOMER,
  TEXT_UPDATE_CUSTOMER
} from "../constants/message";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
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
import TableDrag from "../components/UI/TableDrag";
const { Title } = Typography;

function AddCustomerToRoom() {
  //table
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
    }
  ]);
  const [loadingNextCustomer, setLoadingNextCustomer] = useState(false);

  // state modal
  const [actionModalCustomer, setActionModalCustomer] = useState(
    TEXT_CREATE_CUSTOMER
  );
  const [loadingButtonCustomer, setLoadingButtonCustomer] = useState(false);
  const [showModalCustomer, setShowModalCustomer] = useState(false);

  // effects
  useEffect(() => {
    dispatch(onGetRoom(id));
    return () => {
      dispatch(onUnmountRoom());
    };
  }, [dispatch, id]);

  //customer
  useEffect(() => {
    setCustomer(customers.customer);
  }, [customers.customer]);

  useEffect(() => {
    if (customers.successCustomer) {
      setLoadingButtonCustomer(false);
      setShowModalCustomer(false);
      setCustomer({});
      dispatch(onUnmountCustomer());
    }
  }, [customers.successCustomer, dispatch]);
  //room
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

  // function
  function handleModalCustomer(id) {
    if (!isEmpty(id)) {
      setActionModalCustomer(TEXT_UPDATE_CUSTOMER);
      dispatch(onGetCustomer(id));
    } else {
      setActionModalCustomer(TEXT_CREATE_CUSTOMER);
      dispatch(onUnSuccessCustomer());
    }
    setShowModalCustomer(!showModalCustomer);
  }

  function handleCancel() {
    setShowModalCustomer(false);
    if (!isEmpty(customer)) {
      dispatch(onUnmountCustomer());
    }
  }

  function handleSubmitCustomer(values) {
    setLoadingButtonCustomer(true);
    if (actionModalCustomer === TEXT_CREATE_CUSTOMER) {
      dispatch(onAddCustomerToRoom(room._id, values));
    } else {
      dispatch(onUpdateCustomer(customer._id, values, id));
    }
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

  function moveRow(dragIndex, hoverIndex) {
    console.log(dragIndex, hoverIndex);
    const dragRow = room.customers[dragIndex];

    const newData = update(room, {
      customers: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow]
        ]
      }
    });
    dispatch(onUpdateRoom(room._id, newData, "inRoom"));
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
            Create Customer In Room
          </Button>
        </Col>
        <ModalCustomer
          title={TEXT_CREATE_CUSTOMER}
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
        <DndProvider backend={HTML5Backend}>
          <Table
            rowKey={"_id"}
            columns={columnCustomers}
            dataSource={room.customers}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 240 }}
            components={{
              body: {
                row: TableDrag
              }
            }}
            onRow={(record, index) => ({
              index,
              moveRow
            })}
          />
        </DndProvider>
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
