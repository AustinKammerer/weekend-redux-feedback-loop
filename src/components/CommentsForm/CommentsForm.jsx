import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CommentIcon from "@mui/icons-material/Comment";
import { blue } from "@mui/material/colors";

export default function CommentsForm({ getPage }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // send the current page's pathname to the store
  getPage(location.pathname);

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

  // keep current view and Stepper in sync in case of redux state reset
  if (feedback.feeling === "") {
    history.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatches an action and payload to the feedbackReducer
    dispatch({ type: "ADD_COMMENTS", payload: commentsFeedback });
    if (!isUpdating) {
      // update the stepReducer
      dispatch({ type: "INCREMENT_STEP" });
    } else {
      // end update mode
      dispatch({ type: "END_UPDATE" });
    }
    // direct the user to review
    history.push("/review");
  };

  return (
    <Box maxWidth="sm" ml="auto" mr="auto">
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
          />
          <Button variant="contained" type="submit" sx={{ ml: 3 }}>
            {isUpdating ? "UPDATE" : "NEXT"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
