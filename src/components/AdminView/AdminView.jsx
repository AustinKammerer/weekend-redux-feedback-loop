import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import FeedbackItem from "./FeedbackItem.jsx";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

export default function AdminView({ getPage }) {
  const dispatch = useDispatch();

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = () => {
    axios
      .get("/api/feedback")
      .then((res) => {
        console.log("GET Success", res.data);
        dispatch({ type: "GET_FEEDBACK", payload: res.data });
      })
      .catch((err) => {
        console.log("Error getting feedback", err);
      });
  };

  const deleteFeedback = (id) => {
    axios
      .delete(`/api/feedback/delete/${id}`)
      .then((res) => {
        console.log("Feedback deleted successfully");
        getFeedback();
      })
      .catch((err) => {
        console.log("Error deleting feedback from the database", err);
        alert("Unable to delete feedback!");
      });
  };

  const allFeedback = useSelector((store) => store.adminReducer);

  return (
    <Box width={1000} mx="auto">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: 175 }}>Feeling</StyledTableCell>
              <StyledTableCell sx={{ width: 175 }}>
                Understanding
              </StyledTableCell>
              <StyledTableCell sx={{ width: 175 }}>Support</StyledTableCell>
              <StyledTableCell>Comments</StyledTableCell>
              <StyledTableCell
                size="small"
                sx={{ width: 80 }}
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allFeedback.map((feedback, i) => (
              <FeedbackItem
                key={i}
                feedback={feedback}
                deleteFeedback={deleteFeedback}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
