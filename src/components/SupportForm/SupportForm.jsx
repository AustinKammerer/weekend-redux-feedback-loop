import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { blue } from "@mui/material/colors";
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

// custom styling for heart icons
const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff3d47',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

export default function SupportForm({ getPage }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    // send the current page's pathname to the store
    getPage(location.pathname);

    // grab the feedbackReducer from the store
    const feedback = useSelector((store) => store.feedbackReducer);

    // access the current support value so the input field may be initialized with it.
    const currentSupport = feedback.support;

    // determine if the user is updating via ReviewFeedback
    const isUpdating = useSelector((store) => store.updateModeReducer);

    // local state to store user input.
    const [supportFeedback, setSupportFeedback] = useState(currentSupport);
    // allows the user to see their currentSupport when returning to this view.
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
            (value >= 1 && value <= 6) || value === "" ? value : supportFeedback;
        setSupportFeedback(setValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (supportFeedback === "") {
            // alert if no feedback is entered
            alert("Please enter your feedback");
        } else if (supportFeedback !== "") {
            // dispatches an action and payload to the feedbackReducer
            dispatch({ type: "ADD_SUPPORT", payload: supportFeedback });
            // check if in update mode
            if (!isUpdating) {
                // update the step reducer
                dispatch({ type: "INCREMENT_STEP" });
                // direct the user to the next form if answering for the first time
                history.push("/comments");
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
                    How well are you being supported today?
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
                    {/* <FavoriteIcon sx={{ color: blue[700], mr: 1 }} />
          <TextField
            autoFocus={true}
            variant="outlined"
            size="small"
            value={supportFeedback}
            type="number"
            id="supportFeedback"
            label="Support"
            onChange={validateNumber}
            required
          /> */}
                    <StyledRating
                        value={Number(supportFeedback)}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        onChange={(e) => {
                            setSupportFeedback(e.target.value);
                        }}
                    />
                    <Button variant="contained" type="submit" sx={{ mt: 4 }}>
                        {isUpdating ? "UPDATE" : "NEXT"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
}
