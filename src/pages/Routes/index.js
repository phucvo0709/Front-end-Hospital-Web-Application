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
        {/* public */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        {/* private */}
        <PrivateRoute excat path="/profile" component={Profile} />
        {/* not found */}
        <Route component={NotFound} />
      </Switch>
    </section>
  );
}

export default Routes;
