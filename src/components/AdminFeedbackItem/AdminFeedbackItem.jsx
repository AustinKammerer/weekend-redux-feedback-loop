import AdminDeleteFeedback from "../AdminDeleteFeedback/AdminDeleteFeedback.jsx";

import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import ReviewsIcon from "@mui/icons-material/Reviews";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";

// custom table cell and row functions taken from https://mui.com/components/tables/
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
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
}));

export default function AdminFeedbackItem({
  feedback,
  deleteFeedback,
  flagFeedback,
}) {
  // this component has access to the database information for the feedback item

  // table cells are red and bold if the feedback entry is flagged
  return (
    <StyledTableRow key={feedback.id}>
      <StyledTableCell
        sx={feedback.flagged ? { color: red[700], fontWeight: "bold" } : null}
      >
        {feedback.feeling}
      </StyledTableCell>
      <StyledTableCell
        sx={feedback.flagged ? { color: red[700], fontWeight: "bold" } : null}
      >
        {feedback.understanding}
      </StyledTableCell>
      <StyledTableCell
        sx={feedback.flagged ? { color: red[700], fontWeight: "bold" } : null}
      >
        {feedback.support}
      </StyledTableCell>
      <StyledTableCell
        sx={feedback.flagged ? { color: red[700], fontWeight: "bold" } : null}
      >
        {feedback.comments}
      </StyledTableCell>
      <StyledTableCell size="small" align="center">
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
            deleteFeedback={deleteFeedback}
          />
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
}
