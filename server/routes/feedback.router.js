const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// POST route
router.post("/", (req, res) => {
  console.log("/api/feedback POST");
  // req.body corresponds to the feedbackReducer object
  const feedbackToSend = req.body;
  const queryText = `INSERT INTO "feedback" ("feeling", "understanding", "support", "comments")
    VALUES ($1, $2, $3, $4);`;
  // feeling, understanding, and support need to be sanitized and converted to numbers for the database
  const values = [
    Number(feedbackToSend.feeling),
    Number(feedbackToSend.understanding),
    Number(feedbackToSend.support),
    feedbackToSend.comments,
  ];
  pool
    .query(queryText, values)
    .then((result) => {
      console.log("Feedback successfully sent to database");
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error sending feedback to database:", err);
      res.sendStatus(500);
    });
});

module.exports = router;