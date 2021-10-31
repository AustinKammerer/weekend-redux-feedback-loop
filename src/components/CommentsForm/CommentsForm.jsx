import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CommentsForm({ funcsFromStepper }) {
  // grab the feedbackReducer from the store
  const feedback = useSelector((store) => store.feedbackReducer);
  // access the current comments value so the input field may be initialized with it
  const currentComments = feedback.comments;

  // determine if the user is updating via ReviewFeedback
  const isUpdating = useSelector((store) => store.updateModeReducer);

  // local state to store user input
  const [commentsFeedback, setCommentsFeedback] = useState(currentComments);
  // allows the user to see their currentComments when returning to this view
  // when the reducer is reset, the input field will also be reset

  const dispatch = useDispatch();

  const history = useHistory();

  // keep current view and Stepper in sync in case of redux state reset
  if (feedback.feeling === "") {
    history.push("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (commentsFeedback === "") {
    //   // if no comments are entered, payload is set to " " so conditional rendering will work
    //   dispatch({ type: "ADD_COMMENTS", payload: " " });
    // } else {
    //   // dispatches an action and payload to the feedbackReducer
    dispatch({ type: "ADD_COMMENTS", payload: commentsFeedback });
    // }
    if (isUpdating) {
      // end update mode
      dispatch({ type: "END_UPDATE" });
    }
    // move the Stepper forward
    funcsFromStepper.handleNext();
    // direct the user to review
    history.push("/review");
  };

  const handleSkipClick = () => {
    funcsFromStepper.handleSkip();
    dispatch({ type: "ADD_COMMENTS", payload: " " });
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
        <button type="button" onClick={handleSkipClick}>
          SKIP
        </button>
        <button type="submit">{isUpdating ? "UPDATE" : "NEXT"}</button>
      </form>
    </>
  );
}
