import React, { useState, useEffect, Fragment } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { List, Avatar } from "antd";
import { onGetRoom, onUnmountRoom } from "../actions";
import isEmpty from "../validation/is-empty";

function AddCustomerToRoom() {
  let history = useHistory();
  let { id } = useParams();
  //hooks
  const rooms = useSelector(state => state.rooms);
  const dispatch = useDispatch();
  //state
  const [data, setData] = useState([
    {
      title: "Ant Design Title 1"
    },
    {
      title: "Ant Design Title 2"
    },
    {
      title: "Ant Design Title 3"
    },
    {
      title: "Ant Design Title 4"
    }
  ]);
  const [room, setRoom] = useState({});
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
      } else {
        dispatch(onUnmountRoom());
        history.push("/");
      }
    }
  }, [rooms.successGetRoom, rooms.room, id, history, dispatch]);

  return (
    <Fragment>
      <h3>ID: {id}</h3>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </Fragment>
  );
}

export default AddCustomerToRoom;
