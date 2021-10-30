import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FeelingForm() {
  // local state to store user input
  const [feelingFeedback, setFeelingFeedback] = useState("");
  // grab the feedbackReducer from the store so the input field clears on POST success
  const feedback = useSelector((store) => store.feedbackReducer);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation (input required)
    if (feelingFeedback === "") {
      // alert if no feedback is entered
      alert("Please enter your feedback");
    } else if (feelingFeedback !== "") {
      // dispatches an action and payload to the feedbackReducer
      dispatch({ type: "ADD_FEELING", payload: feelingFeedback });
    }
  };
  return (
    <>
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={feedback.feeling}
          type="text"
          id="feelingFeedback"
          name="feeling"
          placeholder="feeling"
          onChange={(e) => setFeelingFeedback(e.target.value)}
        />
        <button type="submit">NEXT</button>
      </form>
    </>
  );
}
