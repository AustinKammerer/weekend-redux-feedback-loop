import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Confirmation({ funcsFromStepper }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const handleClick = () => {
    dispatch({ type: "CLEAR_FEEDBACK" });
    // reset the Stepper
    funcsFromStepper.handleReset();
    // TODO route the user back to feeling page
    history.push("/");
  };
  return (
    <div>
      <h2>Thank You!</h2>
      <h3>Your Feedback Has Been Received</h3>
      <button onClick={handleClick}>Leave New Feedback</button>
    </div>
  );
}
