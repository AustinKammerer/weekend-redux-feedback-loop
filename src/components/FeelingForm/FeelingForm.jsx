import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { blue } from "@mui/material/colors";

export default function FeelingForm({ getPage }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // send the current page's pathname to the store
  getPage(location.pathname);

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

  // set a min and max for the input
  const validateNumber = (event) => {
    const value = event.target.value;
    //if the input value is less than 1 or greater than 6, then don't change the input value (empty string allowed for backspacing)
    const setValue =
      (value >= 1 && value <= 6) || value === "" ? value : feelingFeedback;
    setFeelingFeedback(setValue);
  };

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
        // update the step reducer
        dispatch({ type: "INCREMENT_STEP" });
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
    <Box maxWidth="sm" ml="auto" mr="auto">
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Typography variant="h5">How are you feeling today?</Typography>
        <Typography variant="subtitle2" fontStyle="italic">
          Enter a Value 1 - 6
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          mt={2}
          justifyContent="center"
          alignItems="center"
        >
          <InsertEmoticonIcon sx={{ color: blue[700], mr: 1 }} />
          <TextField
            autoFocus={true}
            variant="outlined"
            size="small"
            value={feelingFeedback}
            type="number"
            id="feelingFeedback"
            label="Feeling"
            onChange={validateNumber}
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
