import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { blue } from "@mui/material/colors";

export default function SupportForm({ funcsFromStepper }) {
  // grab the feedbackReducer from the store
  const feedback = useSelector((store) => store.feedbackReducer);

  // access the current support value so the input field may be initialized with it.
  const currentSupport = feedback.support;

  // determine if the user is updating via ReviewFeedback
  const isUpdating = useSelector((store) => store.updateModeReducer);

  // local state to store user input.
  const [supportFeedback, setSupportFeedback] = useState(currentSupport);
  // allows the user to see their currentSupport when returning to this view.
  // when the reducer is reset, the input field will also be reset.

  const dispatch = useDispatch();

  const history = useHistory();

  // keep current view and Stepper in sync in case of redux state reset
  if (feedback.feeling === "") {
    history.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (supportFeedback === "") {
      // alert if no feedback is entered
      alert("Please enter your feedback");
    } else if (supportFeedback !== "") {
      // dispatches an action and payload to the feedbackReducer
      dispatch({ type: "ADD_SUPPORT", payload: supportFeedback });
      // check if in update mode
      if (!isUpdating) {
        // move the Stepper forward
        funcsFromStepper.handleNext();
        // direct the user to the next form if answering for the first time
        history.push("/comments");
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
        <Typography variant="h5">
          How well are you being supported today?
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          mt={2}
          justifyContent="center"
          alignItems="center"
        >
          <FavoriteIcon sx={{ color: blue[700], mr: 1 }} />
          <TextField
            autoFocus={true}
            variant="outlined"
            size="small"
            value={supportFeedback}
            type="number"
            id="supportFeedback"
            label="Support"
            onChange={(e) => setSupportFeedback(e.target.value)}
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
