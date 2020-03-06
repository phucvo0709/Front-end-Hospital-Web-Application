import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// redux
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import createStore from "./store";
//pages
import "./static/sass/styles.scss";
import Routes from "./pages";

function App(props) {
  const { store } = props;

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default withRedux(createStore)(App);
