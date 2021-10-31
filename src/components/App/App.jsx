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
import StepperComponent from "../StepperComponent/StepperComponent.jsx";
import Header from "../Header/Header.jsx";
// HOOKS
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
// MUI COMPONENTS
import Box from "@mui/material/Box";

function App() {
  // functions in the StepperComponent need to be sent to the other components in order for the Stepper to work
  const [funcsFromStepper, setFuncsFromStepper] = useState({});
  // this function is sent to StepperComponent so the needed functions can be passed from here:
  const getStepperFuncs = (stepperFunctions) =>
    setFuncsFromStepper(stepperFunctions);

  return (
    <Router>
      <Box sx={{ width: "100%" }}>
        <div className="App">
          <Header />
          <StepperComponent getStepperFuncs={getStepperFuncs} />
          <Route exact path="/">
            <Redirect to={{ pathname: "/feeling" }} />
          </Route>
          <Route path="/feeling">
            <FeelingForm funcsFromStepper={funcsFromStepper} />
          </Route>
          <Route path="/understanding">
            <UnderstandingForm funcsFromStepper={funcsFromStepper} />
          </Route>
          <Route path="/support">
            <SupportForm funcsFromStepper={funcsFromStepper} />
          </Route>
          <Route path="/comments">
            <CommentsForm funcsFromStepper={funcsFromStepper} />
          </Route>
          <Route path="/review">
            <ReviewFeedback funcsFromStepper={funcsFromStepper} />
          </Route>
          <Route path="/confirmation">
            <Confirmation funcsFromStepper={funcsFromStepper} />
          </Route>
        </div>
      </Box>
    </Router>
  );
}

export default App;
