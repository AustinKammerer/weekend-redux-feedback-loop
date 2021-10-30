import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CommentsForm() {
  // local state to store user input
  const [commentsFeedback, setCommentsFeedback] = useState("");
  // grab the feedbackReducer from the store so the input field clears on POST success
  const feedback = useSelector((store) => store.feedbackReducer);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatches an action and payload to the feedbackReducer
    dispatch({ type: "ADD_COMMENTS", payload: commentsFeedback });
  };
  return (
    <>
      <h2>Any comments you'd like to leave?</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={feedback.comments}
          type="text"
          id="commentsFeedback"
          name="comments"
          placeholder="comments"
          onChange={(e) => setCommentsFeedback(e.target.value)}
        />
        <button type="submit">NEXT</button>
      </form>
    </>
  );
}
