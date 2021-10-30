import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function UnderstandingForm() {
  // local state to store user input
  const [understandingFeedback, setUnderstandingFeedback] = useState("");

  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation (input required)
    if (understandingFeedback === "") {
      // alert if no feedback is entered
      alert("Please enter your feedback");
    } else if (understandingFeedback !== "") {
      // dispatches an action and payload to the feedbackReducer
      dispatch({ type: "ADD_UNDERSTANDING", payload: understandingFeedback });
      setUnderstandingFeedback("");
      history.push("/support");
    }
  };
  return (
    <>
      <h2>How well are you understanding the content?</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={understandingFeedback}
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
