import React from "react";
import axios from "axios";
import "./App.css";
import FeelingForm from "../FeelingForm/FeelingForm.jsx";
import UnderstandingForm from "../UnderstandingForm/UnderstandingForm.jsx";
import SupportForm from "../SupportForm/SupportForm.jsx";
import CommentsForm from "../CommentsForm/CommentsForm.jsx";
import ReviewFeedback from "../ReviewFeedback/ReviewFeedback.jsx";
import Confirmation from "../Confirmation/Confirmation.jsx";

function App() {
  // POST request for submitting feedback to the database
  const submitFeedback = (feedback) => {
    console.log("submission:", feedback);
    axios
      .post("/api/feedback", feedback)
      .then((response) => {
        console.log("Successful POST");
        // STRETCH TODO: call a GET for ADMIN
      })
      .catch((err) => {
        console.log("Error in POST", err);
        alert("Error adding feedback to the database");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Feedback!</h1>
        <h4>Don't forget it!</h4>
      </header>
      <FeelingForm />
      <UnderstandingForm />
      <SupportForm />
      <CommentsForm />
      <ReviewFeedback submitFeedback={submitFeedback} />
      <Confirmation />
    </div>
  );
}

export default App;
