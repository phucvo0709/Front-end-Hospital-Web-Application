import React from "react";
import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import PublicRoute from "../pages/Routes/PublicRoute";
import PrivateRoute from "../pages/Routes/PrivateRoute";
// pages
import Rooms from "./Rooms";
import Customers from "./Customers";
import NotFound from "./NotFound";
import AddCustomerToRoom from "./AddCustomerToRoom";
import socketIo from "../utils/socketIo";
import { onSetSocketId } from "../actions";

function Routes() {
  const dispatch = useDispatch();
  socketIo.on("connect", () => {
    dispatch(onSetSocketId(socketIo.id));
  });

  return (
    <section className="container">
      <Switch>
        <PrivateRoute exact path="/" component={Rooms} />
        <PrivateRoute
          exact
          path="/add-customer-to-room/:id"
          component={AddCustomerToRoom}
        />
        <PrivateRoute exact path="/customers" component={Customers} />
        <PublicRoute component={NotFound} />
      </Switch>
    </section>
  );
}

export default Routes;
