import { useState } from "react";
import axios from "axios";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { red } from "@mui/material/colors";

export default function AdminDeleteFeedback({ feedback, getFeedback }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <DeleteOutlineIcon sx={{ color: red[700] }} />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="alert-dialog-title">{"Delete Feedback"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete feedback? This action may not be
                        reversed!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => deleteFeedback(feedback.id)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
