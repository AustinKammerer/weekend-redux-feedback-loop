import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { blue } from "@mui/material/colors";

export default function ReviewFeedback({ getPage }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // send the current page's pathname to the store
  getPage(location.pathname);

  // grab the feedback data from the store
  const feedback = useSelector((store) => store.feedbackReducer);

  // direct the user to the beginning if redux state is wiped (page refresh)
  if (
    feedback.feeling === "" &&
    feedback.understanding === "" &&
    feedback.support === ""
  ) {
    history.push("/");
  }

  // POST request
  const submitFeedback = (feedback) => {
    console.log("submission:", feedback);
    // only allow POST request if values are not empty
    if (
      feedback.feeling === "" ||
      feedback.understanding === "" ||
      feedback.support === ""
    ) {
      alert(
        "Please Update Feedback (Feeling, Understanding, Support Are Required!"
      );
    } else {
      axios
        .post("/api/feedback", feedback)
        .then((response) => {
          console.log("Successful POST");
          // update the stepReducer
          dispatch({ type: "INCREMENT_STEP" });
          // direct user back to the confirmation view on successful POST
          history.push("/confirmation");
          // GET request is called in AdminView
        })
        .catch((err) => {
          console.log("Error in POST", err);
          alert("Error adding feedback to the database");
        });
    }
  };

  // CLICK CATEGORY TO RETURN AND CHANGE
  const updateAnswer = (path) => {
    // sets updateModeReducer to true for conditional rendering/routing
    dispatch({ type: "UPDATE" });
    // direct the user to the view corresponding to what they clicked
    history.push(`/${path}`);
  };

  return (
    // <Route path="/review">
    <Box maxWidth="sm" ml="auto" mr="auto">
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Typography variant="h4">Review Your Feedback</Typography>
        <Box display="flex" alignItems="center" mt={3}>
          <InsertEmoticonIcon
            sx={{
              color: blue[700],
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            onClick={() => updateAnswer("feeling", 0)}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Feelings: {feedback.feeling}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={3}>
          <LightbulbIcon sx={{ color: blue[700], mr: 1 }} />
          <Typography
            variant="h5"
            onClick={() => updateAnswer("understanding", 1)}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Understanding: {feedback.understanding}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={3}>
          <FavoriteIcon sx={{ color: blue[700], mr: 1 }} />
          <Typography
            variant="h5"
            onClick={() => updateAnswer("support", 2)}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Support: {feedback.support}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt={3}>
          <CommentIcon sx={{ color: blue[700], mr: 1 }} />
          <Typography
            variant="h5"
            onClick={() => updateAnswer("comments", 3)}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Comments: {feedback.comments}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="end">
          <Button
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => submitFeedback(feedback)}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
