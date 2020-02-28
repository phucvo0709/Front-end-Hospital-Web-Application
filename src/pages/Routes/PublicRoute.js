import React from "react";
import { Route } from "react-router-dom";
import HeadComponent from "../../components/HeadComponent";

function PublicLayout(props) {
  return (
    <div>
      <HeadComponent />
      {props.children}
    </div>
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
