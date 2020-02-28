import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HeadComponent from "../../components/HeadComponent";
import HeaderComponent from "../../components/HeaderComponent";

function PrivateLayout(props) {
  return (
    <div>
      <HeadComponent />
      <HeaderComponent />
      {props.children}
    </div>
  );
}
const PrivateRoute = ({
  component: Component,
  users: { isAuthenticated },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <PrivateLayout>
          <Component {...props} />
        </PrivateLayout>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

PrivateRoute.propTypes = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(PrivateRoute);
