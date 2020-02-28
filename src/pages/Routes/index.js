import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Register from "../Register";
import Login from "../Login";
import Profile from "../Profile";
import NotFound from "../NotFound";

function Routes() {
  return (
    <section className="container">
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute excat path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
}

export default Routes;
