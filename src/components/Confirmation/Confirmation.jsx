import { useDispatch } from "react-redux";

export default function Confirmation() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: "CLEAR_FEEDBACK" });
    // TODO route the user back to feeling page
  };
  return (
    <div>
      <h2>Thank You!</h2>
      <h3>Your Feedback Has Been Received</h3>
      <button onClick={handleClick}>Leave New Feedback</button>
    </div>
  );
}
