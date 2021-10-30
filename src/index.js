import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";

// FEEDBACK REDUCER
// all form actions are dispatched to this
// state object placeholder:
const base = {
  feeling: "",
  understanding: "",
  support: "",
  comments: "",
};

const feedbackReducer = (state = base, action) => {
  switch (action.type) {
    // give the 'feeling' property a value (user input)
    case "ADD_FEELING":
      return { ...state, feeling: action.payload };
    // give the 'understanding' property a value (user input)
    case "ADD_UNDERSTANDING":
      return { ...state, understanding: action.payload };
    // give the 'support' property a value (user input)
    case "ADD_SUPPORT":
      return { ...state, support: action.payload };
    // give the 'comments' property a value (user input)
    case "ADD_COMMENTS":
      return { ...state, comments: action.payload };
    // return to base state when survey is reset
    case "CLEAR_FEEDBACK":
      return base;
    // default for when nothing is dispatched
    default:
      return state;
  }
};

// ADMIN REDUCER
// for storing the database data in the store
const adminReducer = (state = [], action) => {
  switch (action.type) {
    // dispatched by client GET request function (gets feedback entries from database)
    case "STORE_FEEDBACK":
      return action.payload;
    // default for when nothing is dispatched
    default:
      return state;
  }
};

// STORE CREATION
const store = createStore(
  combineReducers({
    feedbackReducer,
    adminReducer,
  }),
  applyMiddleware(logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();
