import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function ReviewFeedback() {
  // grab the feedback data from the store
  const feedback = useSelector((store) => store.feedbackReducer);

  const dispatch = useDispatch();

  const history = useHistory();

  // POST request
  const submitFeedback = (feedback) => {
    console.log("submission:", feedback);
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
          // direct user back to the confirmation view on successful POST
          history.push("/confirmation");
          // STRETCH TODO: call a GET for ADMIN
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
    <>
      <h2>Review Your Feedback</h2>
      <h3 onClick={() => updateAnswer("feeling")}>
        Feelings: {feedback.feeling}
      </h3>
      <h3 onClick={() => updateAnswer("understanding")}>
        Understanding: {feedback.understanding}
      </h3>
      <h3 onClick={() => updateAnswer("support")}>
        Support: {feedback.support}
      </h3>
      <h3 onClick={() => updateAnswer("comments")}>
        Comments: {feedback.comments}
      </h3>
      <button onClick={() => submitFeedback(feedback)}>Submit</button>
    </>
  );
}
