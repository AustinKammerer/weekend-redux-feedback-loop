import AdminDeleteFeedback from "../AdminDeleteFeedback/AdminDeleteFeedback.jsx";
import axios from "axios";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";

// custom table cell and row functions taken from https://mui.com/components/tables/ and tweaked
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    // style the td's if the row is 'flagged' (feedback.flagged)
    "&.flagged td": {
        fontWeight: "bold",
        backgroundColor: red[100]
    },
}));

export default function AdminFeedbackItem({ feedback, getFeedback }) {

    // PUT request to toggle 'flagged' status
    const flagFeedback = (id) => {
        axios
            .put(`/api/feedback/flag/${id}`)
            .then((res) => {
                console.log("Feedback update successful");
                getFeedback();
            })
            .catch((err) => {
                console.log("Error updateing feedback", err);
                alert("Unable to update feedback!");
            });
    };
    // this component has access to the database information for the feedback item

    // table cells are red and bold if the feedback entry is flagged
    return (
        <StyledTableRow
            className={feedback.flagged ? "flagged" : null}
            key={feedback.id}
        >
            <StyledTableCell>{feedback.feeling}</StyledTableCell>
            <StyledTableCell>{feedback.understanding}</StyledTableCell>
            <StyledTableCell>{feedback.support}</StyledTableCell>
            <StyledTableCell>{feedback.comments}</StyledTableCell>
            <StyledTableCell size="small">
                <Stack direction="row" justifyContent="flex-end">
                    <Button onClick={() => flagFeedback(feedback.id)}>
                        <ReviewsIcon
                            sx={
                                feedback.flagged
                                    ? { color: red[700] }
                                    : { color: "action.active" }
                            }
                        />
                    </Button>
                    <AdminDeleteFeedback
                        feedback={feedback}
                    />
                </Stack>
            </StyledTableCell>
        </StyledTableRow>
    );
}
