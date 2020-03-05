import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  onGetCustomers,
  onDeleteCustomer,
  onAddCustomer,
  onUnSuccessCustomer,
  onUpdateCustomer,
  onGetCustomer,
  onUnmountCustomer
} from "../actions/";
import { Popconfirm, Divider, Button, Row, Col, Table } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import ModalCustomer from "../components/Customers/ModalCustomer";
import isEmpty from "../validation/is-empty";
import { dateFormat } from "../utils/dateFormat";
import {
  TEXT_CONFIRM_DELETE,
  TEXT_CREATE_CUSTOMER,
  TEXT_UPDATE_CUSTOMER
} from "../constants/message";

function Customers(props) {
  //hooks
  const customers = useSelector(state => state.customers);
  const dispatch = useDispatch();
  //state
  const [columnCustomers] = useState([
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
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
  const [dataCustomers, setDataCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [loadingTable, setLoadingTable] = useState(true);
  //modal
  const [actionModalCustomer, setActionModalCustomer] = useState(
    TEXT_CREATE_CUSTOMER
  );
  const [loadingButtonCustomer, setLoadingButtonCustomer] = useState(false);
  const [showModalCustomer, setShowModalCustomer] = useState(false);

  // customers
  useEffect(() => {
    dispatch(onGetCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (customers.customers !== dataCustomers) {
      setLoadingTable(false);
      setDataCustomers(customers.customers);
    }
  }, [customers.customers, dataCustomers]);

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

  function handleDeleteRecord(id) {
    dispatch(onDeleteCustomer(id));
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
      dispatch(onAddCustomer(values));
    } else {
      dispatch(onUpdateCustomer(customer._id, values));
    }
  }

  return (
    <div>
      <Helmet>
        <title>Customers</title>
      </Helmet>
      <Row>
        <Col span={24}>
          <Button
            style={{ float: "right", marginBottom: "15px" }}
            type="primary"
            onClick={() => handleModalCustomer()}
          >
            {TEXT_CREATE_CUSTOMER}
          </Button>
        </Col>
        <ModalCustomer
          title={actionModalCustomer}
          visible={showModalCustomer}
          customer={customer}
          setCustomer={setCustomer}
          onCancel={handleCancel}
          onFinish={handleSubmitCustomer}
          loading={loadingButtonCustomer}
        />
      </Row>
      <div className="container-table">
        <Table
          rowKey={"_id"}
          columns={columnCustomers}
          dataSource={dataCustomers}
          loading={loadingTable}
        />
      </div>
    </div>
  );
}

export default Customers;
