import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";

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

export default function FeedbackItem({ feedback }) {
  return (
    <StyledTableRow key={feedback.id}>
      <StyledTableCell component="th" scope="row">
        {feedback.feeling}
      </StyledTableCell>
      <StyledTableCell>{feedback.understanding}</StyledTableCell>
      <StyledTableCell>{feedback.support}</StyledTableCell>
      <StyledTableCell>{feedback.comments}</StyledTableCell>
      <StyledTableCell size="small">
        <Button>
          <DeleteOutlineIcon />
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  );
}
