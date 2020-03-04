import React from "react";
import { Switch } from "react-router-dom";
import PublicRoute from "../pages/Routes/PublicRoute";
import PrivateRoute from "../pages/Routes/PrivateRoute";
// pages
import Rooms from "./Rooms";
import Customers from "./Customers";
import NotFound from "./NotFound";

function Routes() {
  return (
    <section className="container">
      <Switch>
        <PrivateRoute exact path="/" component={Rooms} />
        <PrivateRoute exact path="/customers" component={Customers} />
        <PublicRoute component={NotFound} />
      </Switch>
    </section>
  );
}

export default Routes;
