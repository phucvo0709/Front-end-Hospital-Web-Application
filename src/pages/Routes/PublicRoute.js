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

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <PublicLayout>
          <Component {...props} />
        </PublicLayout>
      )}
    />
  );
}

export default PublicRoute;
