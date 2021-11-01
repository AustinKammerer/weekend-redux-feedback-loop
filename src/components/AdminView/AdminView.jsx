import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";

import AdminFeedbackItem from "../AdminFeedbackItem/AdminFeedbackItem.jsx";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// custom table cell function taken from https://mui.com/components/tables/ and tweaked
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.head}:last-of-type`]: {
    width: 130,
  },
}));

export default function AdminView({ getPage }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  // send the current page's pathname to the store
  getPage(location.pathname);

  // send the GET request once on page load
  useEffect(() => {
    getFeedback();
  }, []);

  // GET request
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

  // DELETE request
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

  const allFeedback = useSelector((store) => store.adminReducer);

  return (
    <Box maxWidth="lg" mx="auto">
      <TableContainer component={Paper}>
        <Table sx={{ overflow: "scroll" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Feeling</StyledTableCell>
              <StyledTableCell>Understanding</StyledTableCell>
              <StyledTableCell>Support</StyledTableCell>
              <StyledTableCell>Comments</StyledTableCell>
              <StyledTableCell
                size="small"
                // sx={{ width: 130 }}
              ></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allFeedback.map((feedback, i) => (
              <AdminFeedbackItem
                key={i}
                feedback={feedback}
                deleteFeedback={deleteFeedback}
                flagFeedback={flagFeedback}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={() => history.push("/")}
      >
        Log Out
      </Button>
    </Box>
  );
}
