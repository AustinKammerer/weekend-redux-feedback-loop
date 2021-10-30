import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function UnderstandingForm() {
  // grab the feedbackReducer from the store.
  const feedback = useSelector((store) => store.feedbackReducer);

  // access the current understanding value so the input field may be initialized with it.
  const currentUnderstanding = feedback.understanding;

  // determine if the user is updating via ReviewFeedback
  const isUpdating = useSelector((store) => store.updateModeReducer);

  // local state to store user input.
  const [understandingFeedback, setUnderstandingFeedback] =
    useState(currentUnderstanding);
  // allows the user to see their currentUnderstanding when returning to this view.
  // when the reducer is reset, the input field will also be reset.

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
      if (!isUpdating) {
        // direct the user to the next form if answering for the first time
        history.push("/support");
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
        <button type="submit">{isUpdating ? "UPDATE" : "NEXT"}</button>
      </form>
    </>
  );
}
