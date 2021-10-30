import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CommentsForm() {
  // local state to store user input
  const [commentsFeedback, setCommentsFeedback] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatches an action and payload to the feedbackReducer
    dispatch({ type: "ADD_COMMENTS", payload: commentsFeedback });
    setCommentsFeedback("");
  };
  return (
    <>
      <h2>Any comments you'd like to leave?</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={commentsFeedback}
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
