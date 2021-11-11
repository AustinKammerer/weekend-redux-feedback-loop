
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import AdminFeedbackItem from "../AdminFeedbackItem/AdminFeedbackItem.jsx";
import axios from "axios";

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
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";

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
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

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

    const allFeedback = useSelector((store) => store.adminReducer);

    return (
        <Box maxWidth="lg" mx="auto">
            <TableContainer component={Paper}>
                <Table sx={{ overflow: "scroll" }}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>
                                <InsertEmoticonIcon
                                    sx={{
                                        mr: 1,
                                        verticalAlign: "middle",
                                    }}
                                />
                                Feeling
                            </StyledTableCell>
                            <StyledTableCell>
                                <LightbulbIcon
                                    sx={{
                                        mr: 1,
                                        verticalAlign: "middle",
                                    }}
                                />
                                Understanding
                            </StyledTableCell>
                            <StyledTableCell>
                                <FavoriteIcon
                                    sx={{
                                        mr: 1,
                                        verticalAlign: "middle",
                                    }}
                                />
                                Support
                            </StyledTableCell>
                            <StyledTableCell>
                                <CommentIcon
                                    sx={{
                                        mr: 1,
                                        verticalAlign: "middle",
                                    }}
                                />
                                Comments
                            </StyledTableCell>
                            <StyledTableCell size="small"></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allFeedback.map((feedback, i) => (
                            <AdminFeedbackItem
                                key={i}
                                feedback={feedback}
                                getFeedback={getFeedback}
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
