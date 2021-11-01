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
const updateModeReducer = (state = false, action) => {
  switch (action.type) {
    // flips truthyness when the user clicks a category in ReviewFeedback
    case "UPDATE":
      return true;
    case "END_UPDATE":
      return false;
    default:
      return state;
  }
};

// PATH REDUCER - keep track of the current pathname (no real use right now)
const pathReducer = (state = "/feeling", action) => {
  if (action.type === "CHANGE_PAGE") {
    return action.payload;
  }
  return state;
};

// STEP REDUCER - keep track of the current step in the form process (no real use right now)
const stepReducer = (state = 1, action) => {
  switch (action.type) {
    case "INCREMENT_STEP":
      return state + 1;
    case "DECREMENT_STEP":
      return state - 1;
    case "CLEAR_FEEDBACK":
      return 1;
  }
  return state;
};

// ADMIN REDUCER - for storing database data in the store
const adminReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_FEEDBACK":
      return action.payload;
  }
  return state;
};

// STORE CREATION
const store = createStore(
  combineReducers({
    feedbackReducer,
    updateModeReducer,
    pathReducer,
    stepReducer,
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
