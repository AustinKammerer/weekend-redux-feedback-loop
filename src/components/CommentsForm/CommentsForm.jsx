import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CommentIcon from "@mui/icons-material/Comment";
import { blue } from "@mui/material/colors";

export default function CommentsForm({ funcsFromStepper }) {
  // grab the feedbackReducer from the store
  const feedback = useSelector((store) => store.feedbackReducer);
  // access the current comments value so the input field may be initialized with it
  const currentComments = feedback.comments;

  // determine if the user is updating via ReviewFeedback
  const isUpdating = useSelector((store) => store.updateModeReducer);

  // local state to store user input
  const [commentsFeedback, setCommentsFeedback] = useState(currentComments);
  // allows the user to see their currentComments when returning to this view
  // when the reducer is reset, the input field will also be reset

  const dispatch = useDispatch();

  const history = useHistory();

  // keep current view and Stepper in sync in case of redux state reset
  if (feedback.feeling === "") {
    history.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (commentsFeedback === "") {
    //   // if no comments are entered, payload is set to " " so conditional rendering will work
    //   dispatch({ type: "ADD_COMMENTS", payload: " " });
    // } else {
    //   // dispatches an action and payload to the feedbackReducer
    dispatch({ type: "ADD_COMMENTS", payload: commentsFeedback });
    // }
    if (!isUpdating) {
      // move the Stepper forward
      funcsFromStepper.handleNext();
    } else {
      // end update mode
      dispatch({ type: "END_UPDATE" });
    }
    // direct the user to review
    history.push("/review");
  };

  const handleSkipClick = () => {
    funcsFromStepper.handleSkip();
    dispatch({ type: "ADD_COMMENTS", payload: " " });
    history.push("/review");
  };

  return (
    <Box width="550px" ml="auto" mr="auto">
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Typography variant="h5">Any comments you'd like to leave?</Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          mt={2}
          justifyContent="center"
          alignItems="center"
        >
          <CommentIcon sx={{ color: blue[700], mr: 1 }} />
          <TextField
            autoFocus={true}
            variant="outlined"
            size="small"
            multiline
            value={commentsFeedback}
            type="text"
            id="commentsFeedback"
            label="comments"
            onChange={(e) => setCommentsFeedback(e.target.value)}
            required
          />
          {!isUpdating && (
            <Button
              variant="contained"
              type="button"
              onClick={handleSkipClick}
              sx={{ ml: 3 }}
            >
              SKIP
            </Button>
          )}
          <Button variant="contained" type="submit" sx={{ ml: 3 }}>
            {isUpdating ? "UPDATE" : "NEXT"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
