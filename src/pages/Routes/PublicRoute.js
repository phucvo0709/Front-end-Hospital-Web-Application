import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import HeadComponent from "../../components/HeadComponent";

function PublicLayout(props) {
  return (
    <Fragment>
      <HeadComponent />
      {props.children}
    </Fragment>
  );
}

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <PublicLayout>
        <Component {...props} />
      </PublicLayout>
    )}
  />
);

export default PublicRoute;
