import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function FeelingForm({ funcsFromStepper }) {
  // grab the feedbackReducer from the store.
  const feedback = useSelector((store) => store.feedbackReducer);

  // determine if the user is updating via ReviewFeedback
  const isUpdating = useSelector((store) => store.updateModeReducer);

  // access the current feeling state so the input field may be initialized with it.
  const currentFeeling = feedback.feeling;

  // local state to store user input - initialized with currentFeeling.
  const [feelingFeedback, setFeelingFeedback] = useState(currentFeeling);
  // allows the user to see their currentFeeling when returning to this view.
  // when the reducer is reset, the input field will also be reset.

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
      // check if in update mode
      if (!isUpdating) {
        // move the Stepper forward
        funcsFromStepper.handleNext();
        // direct the user to the next form if answering for the first time
        history.push("/understanding");
      } else {
        // end update mode
        dispatch({ type: "END_UPDATE" });
        // direct the user back to ReviewFeedback if updating answer
        history.push("/review");
      }
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
        <button type="submit">{isUpdating ? "UPDATE" : "NEXT"}</button>
      </form>
    </>
  );
}
