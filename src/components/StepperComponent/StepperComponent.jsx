import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";

const steps = ["Feeling", "Understanding", "Support", "Comments", "Review"];

export default function StepperComponent({ getStepperFuncs }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 3;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  // move the Stepper forward - 'Next' and 'Submit' buttons use this
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  // visually skip over the Stepper step - 'Skip' in CommentsFrom uses this
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // skip validation
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  // resets the Stepper to the first step - 'Leave New Feedback' button uses this
  const handleReset = () => {
    setActiveStep(0);
  };

  // send functions back to app so the other components can use them (only once)
  useEffect(() => {
    getStepperFuncs({
      handleNext: handleNext,
      handleSkip: handleSkip,
      handleReset: handleReset,
    });
  }, []);

  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        if (isStepOptional(index)) {
          labelProps.optional = (
            <Typography variant="caption">Optional</Typography>
          );
        }
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}
