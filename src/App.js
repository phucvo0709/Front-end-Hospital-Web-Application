import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import "./static/sass/styles.scss";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      // store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <p className="test-css">index</p>
    </Provider>
  );
}

export default App;
