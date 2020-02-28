import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      // store.dispatch(loadUser());
    }
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <p>index</p>
        </header>
      </div>
    </Provider>
  );
}

export default App;
