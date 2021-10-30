import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UnderstandingForm() {
  // local state to store user input
  const [understandingFeedback, setUnderstandingFeedback] = useState("");
  // grab the feedbackReducer from the store so the input field clears on POST success
  const feedback = useSelector((store) => store.feedbackReducer);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation (input required)
    if (understandingFeedback === "") {
      // alert if no feedback is entered
      alert("Please enter your feedback");
    } else if (understandingFeedback !== "") {
      // dispatches an action and payload to the feedbackReducer
      dispatch({ type: "ADD_UNDERSTANDING", payload: understandingFeedback });
    }
  };
  return (
    <>
      <h2>How well are you understanding the content?</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={feedback.understanding}
          type="text"
          id="understandingFeedback"
          name="understanding"
          placeholder="understanding"
          onChange={(e) => setUnderstandingFeedback(e.target.value)}
        />
        <button type="submit">NEXT</button>
      </form>
    </>
  );
}
