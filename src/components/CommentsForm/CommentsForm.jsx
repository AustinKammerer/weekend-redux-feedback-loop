import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CommentsForm() {
  // grab the feedbackReducer from the store
  const feedback = useSelector((store) => store.feedbackReducer);
  // access the current comments value so the input field may be initialized with it
  const currentComments = feedback.comments;
  // local state to store user input
  // allows the user to see their currentComments when returning to this view
  // when the reducer is reset, the input field will also be reset
  const [commentsFeedback, setCommentsFeedback] = useState(currentComments);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatches an action and payload to the feedbackReducer
    dispatch({ type: "ADD_COMMENTS", payload: commentsFeedback });
    // direct the user to review
    history.push("/review");
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
