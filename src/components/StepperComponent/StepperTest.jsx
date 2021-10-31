// import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import FeelingForm from "../FeelingForm/FeelingForm.jsx";
import UnderstandingForm from "../UnderstandingForm/UnderstandingForm.jsx";
import SupportForm from "../SupportForm/SupportForm.jsx";
import CommentsForm from "../CommentsForm/CommentsForm.jsx";
import ReviewFeedback from "../ReviewFeedback/ReviewFeedback.jsx";
import Confirmation from "../Confirmation/Confirmation.jsx";

const steps = ["Feeling", "Understanding", "Support", "Comments", "Review"];

export default function StepperTest() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const dispatch = useDispatch();

  const params = useParams();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepRoute(step) {
    switch (step) {
      case 0:
        return "/feeling";
      case 1:
        return "/understanding";
      case 2:
        return "/support";
      case 3:
        return "/comments";
      case 4:
        return "/review";
      default:
        return "/feeling";
    }
  }

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const getStepContent = (path) => {
    // let {step} = useParams();
    switch (path) {
      case "/feeling":
        return (
          <FeelingForm
            params={params}
            handleComplete={handleComplete}
            setActiveStep={setActiveStep}
          />
        );
      case "/understanding":
        return (
          <UnderstandingForm
            handleComplete={handleComplete}
            setActiveStep={setActiveStep}
          />
        );
      case "support":
        return (
          <SupportForm
            handleComplete={handleComplete}
            setActiveStep={setActiveStep}
          />
        );
      case "comments":
        return (
          <CommentsForm
            handleComplete={handleComplete}
            setActiveStep={setActiveStep}
          />
        );
      case "/review":
        return (
          <ReviewFeedback
            handleComplete={handleComplete}
            setActiveStep={setActiveStep}
          />
        );
      case "/confirmation":
        return <Confirmation handleReset={handleReset} />;
      default:
        return "Unknown step";
    }
  };

  const feedback = useSelector((store) => store.feedbackReducer);

  const path = useSelector((store) => store.pathReducer);

  const history = useHistory();

  // keep current view and Stepper in sync in case of redux state reset
  // if (feedback.feeling === "") {
  //   history.push("/");
  // }
  console.log(params);
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel color="inherit">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {/* {allStepsCompleted() ? (
          <Route path="/confirmation">
            <Confirmation handleReset={handleReset} />
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Route>
        ) : ( */}
        <Route>{getStepContent(path)}</Route>
        {/* )} */}
      </div>
    </Box>
  );
}
