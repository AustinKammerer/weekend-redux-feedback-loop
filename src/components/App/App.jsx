import React from "react";
import axios from "axios";
import "./App.css";
import FeelingForm from "../FeelingForm/FeelingForm.jsx";
import UnderstandingForm from "../UnderstandingForm/UnderstandingForm.jsx";
import SupportForm from "../SupportForm/SupportForm.jsx";
import CommentsForm from "../CommentsForm/CommentsForm.jsx";
import ReviewFeedback from "../ReviewFeedback/ReviewFeedback.jsx";
import Confirmation from "../Confirmation/Confirmation.jsx";
import { Route, HashRouter as Router, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Feedback!</h1>
          <h4>Don't forget it!</h4>
        </header>
        <Route exact path="/">
          <Redirect to={{ pathname: "/feeling" }} />
        </Route>
        <Route path="/feeling">
          <FeelingForm />
        </Route>
        <Route path="/understanding">
          <UnderstandingForm />
        </Route>
        <Route path="/support">
          <SupportForm />
        </Route>
        <Route path="/comments">
          <CommentsForm />
        </Route>
        <Route path="/review">
          <ReviewFeedback />
        </Route>
        <Route path="/confirmation">
          <Confirmation />
        </Route>
      </div>
    </Router>
  );
}

export default App;
