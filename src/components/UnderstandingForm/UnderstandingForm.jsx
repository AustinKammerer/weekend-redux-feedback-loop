import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import { blue } from "@mui/material/colors";
import Rating from '@mui/material/Rating';


export default function UnderstandingForm({ getPage }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // send the current page's pathname to the store
    getPage(location.pathname);

    // grab the feedbackReducer from the store.
    const feedback = useSelector((store) => store.feedbackReducer);

    // access the current understanding value so the input field may be initialized with it.
    const currentUnderstanding = feedback.understanding;

    // determine if the user is updating via ReviewFeedback
    const isUpdating = useSelector((store) => store.updateModeReducer);

    // local state to store user input.
    const [understandingFeedback, setUnderstandingFeedback] =
        useState(currentUnderstanding);
    // allows the user to see their currentUnderstanding when returning to this view.
    // when the reducer is reset, the input field will also be reset.

    // keep current view and Stepper in sync in case of redux state reset
    if (feedback.feeling === "") {
        history.push("/");
    }

    // set a min and max for the input (not used with rating input)
    const validateNumber = (event) => {
        const value = event.target.value;
        //if the input value is less than 1 or greater than 6, then don't change the input value (empty string allowed for backspacing)
        const setValue =
            (value >= 1 && value <= 6) || value === ""
                ? value
                : understandingFeedback;
        setUnderstandingFeedback(setValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // validation (input required)
        if (understandingFeedback === "") {
            // alert if no feedback is entered
            alert("Please enter your feedback");
        } else if (understandingFeedback !== "") {
            // dispatches an action and payload to the feedbackReducer
            dispatch({ type: "ADD_UNDERSTANDING", payload: understandingFeedback });
            // check if in update mode
            if (!isUpdating) {
                // update the stepReducer
                dispatch({ type: "INCREMENT_STEP" });
                // direct the user to the next form if answering for the first time
                history.push("/support");
            } else {
                // end update mode
                dispatch({ type: "END_UPDATE" });
                // direct the user back to ReviewFeedback if updating answer
                history.push("/review");
            }
        }
    };

    return (
        <Box maxWidth="sm" ml="auto" mr="auto">
            <Paper elevation={3} sx={{ padding: "2rem" }}>
                <Typography variant="h5">
                    How well are you understanding the content?
                </Typography>
                {/* <Typography variant="subtitle2" fontStyle="italic">
                    Enter a Value 1 - 6
                </Typography> */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    mt={4}
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                >
                    {/* <LightbulbIcon sx={{ color: blue[700], mr: 1 }} />
          <TextField
            autoFocus={true}
            variant="outlined"
            size="small"
            value={understandingFeedback}
            type="number"
            id="understandingFeedback"
            label="Understanding"
            onChange={validateNumber}
            required
          /> */}
                    <Rating
                        name="size-large"
                        value={Number(understandingFeedback)}
                        icon={<LightbulbIcon fontSize="inherit" />}
                        emptyIcon={<LightbulbOutlinedIcon fontSize="inherit" />}
                        size="large"
                        onChange={(e) => {
                            setUnderstandingFeedback(e.target.value);
                        }} />
                    <Button variant="contained" type="submit" sx={{ mt: 4 }}>
                        {isUpdating ? "UPDATE" : "NEXT"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
