import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function SupportForm() {
  // grab the feedbackReducer from the store
  const feedback = useSelector((store) => store.feedbackReducer);
  // access the current support value so the input field may be initialized with it
  const currentSupport = feedback.support;
  // local state to store user input
  // allows the user to see their currentSupport when returning to this view
  // when the reducer is reset, the input field will also be reset
  const [supportFeedback, setSupportFeedback] = useState(currentSupport);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (supportFeedback === "") {
      // alert if no feedback is entered
      alert("Please enter your feedback");
    } else if (supportFeedback !== "") {
      // dispatches an action and payload to the feedbackReducer
      dispatch({ type: "ADD_SUPPORT", payload: supportFeedback });
      // direct the user to the next form
      history.push("/comments");
    }
  };
  return (
    <>
      <h2>How well are you being supported today?</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={supportFeedback}
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
