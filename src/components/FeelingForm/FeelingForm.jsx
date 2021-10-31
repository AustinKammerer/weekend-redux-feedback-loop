import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

export default function FeelingForm({ funcsFromStepper }) {
  // grab the feedbackReducer from the store.
  const feedback = useSelector((store) => store.feedbackReducer);

  // determine if the user is updating via ReviewFeedback
  const isUpdating = useSelector((store) => store.updateModeReducer);

  // access the current feeling state so the input field may be initialized with it.
  const currentFeeling = feedback.feeling;

  // local state to store user input - initialized with currentFeeling.
  const [feelingFeedback, setFeelingFeedback] = useState(currentFeeling);
  // allows the user to see their currentFeeling when returning to this view.
  // when the reducer is reset, the input field will also be reset.

  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation (input required)
    if (feelingFeedback === "") {
      // alert if no feedback is entered
      alert("Please enter your feedback");
    } else if (feelingFeedback !== "") {
      // dispatches an action and payload to the feedbackReducer
      dispatch({ type: "ADD_FEELING", payload: feelingFeedback });
      // check if in update mode
      if (!isUpdating) {
        // move the Stepper forward
        funcsFromStepper.handleNext();
        // direct the user to the next form if answering for the first time
        history.push("/understanding");
      } else {
        // end update mode
        dispatch({ type: "END_UPDATE" });
        // direct the user back to ReviewFeedback if updating answer
        history.push("/review");
      }
    }
  };

  return (
    <Box width="550px" ml="auto" mr="auto">
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Typography variant="h5">How are you feeling today?</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          mt={2}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            autoFocus={true}
            variant="outlined"
            size="small"
            value={feelingFeedback}
            type="number"
            id="feelingFeedback"
            label="Feeling"
            onChange={(e) => setFeelingFeedback(e.target.value)}
            required
          />
          <Button variant="contained" type="submit" sx={{ ml: 3 }}>
            {isUpdating ? "UPDATE" : "NEXT"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
