import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//  import Redux
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import logger from "redux-logger";

var middlewares = (middlewares = applyMiddleware(thunk, logger));

const store = createStore(reducers, middlewares);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
