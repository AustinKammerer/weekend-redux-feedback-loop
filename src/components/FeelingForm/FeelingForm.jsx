import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function FeelingForm() {
  // grab the feedbackReducer from the store
  const feedback = useSelector((store) => store.feedbackReducer);
  // access the current feeling value so the input field may be initialized with it
  const currentFeeling = feedback.feeling;
  // local state to store user input - initialized with currentFeeling
  // allows the user to see their currentFeeling when returning to this view
  // when the reducer is reset, the input field will also be reset
  const [feelingFeedback, setFeelingFeedback] = useState(currentFeeling);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation (input required)
    if (feelingFeedback === "") {
      // alert if no feedback is entered
      alert("Please enter your feedback");
    } else if (feelingFeedback !== "") {
      // dispatches an action and payload to the feedbackReducer
      dispatch({ type: "ADD_FEELING", payload: feelingFeedback });
      // direct the user to the next form
      history.push("/understanding");
    }
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
