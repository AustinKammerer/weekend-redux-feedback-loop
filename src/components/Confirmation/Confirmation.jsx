import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Confirmation({ getPage }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // send the current page's pathname to the store
  getPage(location.pathname);

  const handleClick = () => {
    // reset the feedback and step reducers
    dispatch({ type: "CLEAR_FEEDBACK" });
    history.push("/");
  };
  return (
    <Box maxWidth="sm" ml="auto" mr="auto">
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
