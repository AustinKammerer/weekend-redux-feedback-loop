import { useState } from "react";
import { useDispatch } from "react-redux";

export default function FeelingForm() {
  // local state to store user input
  const [feelingFeedback, setFeelingFeedback] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatches an action and payload to the feedbackReducer
    dispatch({ type: "ADD_FEELING", payload: feelingFeedback });
  };
  return (
    <>
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={feelingFeedback}
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
