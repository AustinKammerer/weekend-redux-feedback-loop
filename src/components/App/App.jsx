import React from "react";
import axios from "axios";
import "./App.css";
import FeelingForm from "../FeelingForm/FeelingForm.jsx";
import UnderstandingForm from "../UnderstandingForm/UnderstandingForm.jsx";
import SupportForm from "../SupportForm/SupportForm.jsx";
import CommentsForm from "../CommentsForm/CommentsForm.jsx";

function App() {
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
    </div>
  );
}

export default App;
