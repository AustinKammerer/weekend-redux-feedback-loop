import React from "react";
import axios from "axios";
import { Route, HashRouter as Router, Redirect } from "react-router-dom";
import "./App.css";
// COMPONENTS
import FeelingForm from "../FeelingForm/FeelingForm.jsx";
import UnderstandingForm from "../UnderstandingForm/UnderstandingForm.jsx";
import SupportForm from "../SupportForm/SupportForm.jsx";
import CommentsForm from "../CommentsForm/CommentsForm.jsx";
import ReviewFeedback from "../ReviewFeedback/ReviewFeedback.jsx";
import Confirmation from "../Confirmation/Confirmation.jsx";
import Header from "../Header/Header.jsx";
import AdminView from "../AdminView/AdminView.jsx";
// HOOKS
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// MUI COMPONENTS
import Box from "@mui/material/Box";

function App() {
  const dispatch = useDispatch();
  // function to store the current page pathname - passed via props to components
  const getPage = (path) =>
    useEffect(() => {
      dispatch({ type: "CHANGE_PAGE", payload: path });
    }, []);

  return (
    <Router>
      <Box sx={{ width: "100%" }}>
        <div className="App">
          <Header />
          <Route exact path="/">
            <Redirect to={{ pathname: "/feeling" }} />
          </Route>
          <Route path="/feeling">
            <FeelingForm getPage={getPage} />
          </Route>
          <Route path="/understanding">
            <UnderstandingForm getPage={getPage} />
          </Route>
          <Route path="/support">
            <SupportForm getPage={getPage} />
          </Route>
          <Route path="/comments">
            <CommentsForm getPage={getPage} />
          </Route>
          <Route path="/review">
            <ReviewFeedback getPage={getPage} />
          </Route>
          <Route path="/confirmation">
            <Confirmation getPage={getPage} />
          </Route>
          <Route path="/admin">
            <AdminView getPage={getPage} />
          </Route>
        </div>
      </Box>
    </Router>
  );
}

export default App;
