import React from "react";
import { Switch } from "react-router-dom";
import PublicRoute from "../pages/Routes/PublicRoute";
import PrivateRoute from "../pages/Routes/PrivateRoute";
// pages
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import NotFound from "./NotFound";

function Routes() {
  return (
    <section className="container">
      <Switch>
        {/* public */}
        <PublicRoute exact path="/home" component={Home} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        {/* private */}
        <PrivateRoute exact path="/profile" component={Profile} />
        {/* not found */}
        <PublicRoute component={NotFound} />
      </Switch>
    </section>
  );
}

export default Routes;
