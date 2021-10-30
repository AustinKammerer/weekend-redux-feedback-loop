import { useSelector } from "react-redux";

export default function ReviewFeedback({ submitFeedback }) {
  // grab the feedback data from the store
  const feedback = useSelector((store) => store.feedbackReducer);

  // when 'Submit' is clicked, call the POST request function that App passed as a prop
  return (
    <>
      <h2>Review Your Feedback</h2>
      <h3>Feelings: {feedback.feeling}</h3>
      <h3>Understanding: {feedback.understanding}</h3>
      <h3>Support: {feedback.support}</h3>
      <h3>Comments: {feedback.comments}</h3>
      <button onClick={() => submitFeedback(feedback)}>Submit</button>
    </>
  );
}
