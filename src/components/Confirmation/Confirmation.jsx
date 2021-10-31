import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

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
    <Box width="550px" ml="auto" mr="auto">
      <Paper elevation={3} sx={{ padding: "2rem" }}>
        <Typography variant="h4">Thank You!</Typography>
        <Typography variant="h5" mt={3}>
          Your Feedback Has Been Received
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleClick}>
          Leave New Feedback
        </Button>
      </Paper>
    </Box>
  );
}
