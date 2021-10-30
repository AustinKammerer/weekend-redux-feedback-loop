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

// UPDATE REDUCER - so forms know if the user is updating (conditional rendering/routing)
const isUpdatingReducer = (state = false, action) => {
  switch (action.type) {
    // flips truthyness when the user clicks a category in ReviewFeedback
    case "UPDATE":
      return true;
    default:
      return state;
  }
};

// TODO: ADMIN REDUCER

// STORE CREATION
const store = createStore(
  combineReducers({
    feedbackReducer,
    isUpdatingReducer,
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
