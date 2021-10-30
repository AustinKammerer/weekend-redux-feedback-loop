import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function SupportForm() {
  // local state to store user input
  const [supportFeedback, setSupportFeedback] = useState("");

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
      setSupportFeedback("");
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
