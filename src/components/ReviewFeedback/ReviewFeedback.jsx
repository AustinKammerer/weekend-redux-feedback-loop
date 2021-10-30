import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function ReviewFeedback() {
  // grab the feedback data from the store
  const feedback = useSelector((store) => store.feedbackReducer);

  const history = useHistory();

  const submitFeedback = (feedback) => {
    console.log("submission:", feedback);
    axios
      .post("/api/feedback", feedback)
      .then((response) => {
        console.log("Successful POST");
        history.push("/confirmation");
        // STRETCH TODO: call a GET for ADMIN
      })
      .catch((err) => {
        console.log("Error in POST", err);
        alert("Error adding feedback to the database");
      });
  };

  // when 'Submit' is clicked, call the POST request function that App passed as a prop
  return (
    <>
      <h2>Review Your Feedback</h2>
      <h3>Feelings: {feedback.feeling}</h3>
      <h3>Understanding: {feedback.understanding}</h3>
      <h3>Support: {feedback.support}</h3>
      <h3>Comments: {feedback.comments}</h3>
      <button
        onClick={() => {
          submitFeedback(feedback);
          //   history.push("/confirmation");
        }}
      >
        Submit
      </button>
    </>
  );
}
