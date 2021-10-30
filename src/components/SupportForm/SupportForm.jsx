import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SupportForm() {
  // local state to store user input
  const [supportFeedback, setSupportFeedback] = useState("");
  // grab the feedbackReducer from the store so the input field clears on POST success
  const feedback = useSelector((store) => store.feedbackReducer);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (supportFeedback === "") {
      // alert if no feedback is entered
      alert("Please enter your feedback");
    } else if (supportFeedback !== "") {
      // dispatches an action and payload to the feedbackReducer
      dispatch({ type: "ADD_SUPPORT", payload: supportFeedback });
    }
  };
  return (
    <>
      <h2>How well are you being supported today?</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={feedback.support}
          type="text"
          id="supportFeedback"
          name="support"
          placeholder="support"
          onChange={(e) => setSupportFeedback(e.target.value)}
        />
        <button type="submit">NEXT</button>
      </form>
    </>
  );
}
