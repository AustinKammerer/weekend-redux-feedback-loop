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
  // value validation - make sure feeling, understanding, and support are valid numbers
  // first filter out the numbers, the see if any of them are NaN
  values.length === 0 ||
  values
    .filter((value) => typeof value === "number")
    .filter((num) => isNaN(num)).length > 0
    ? res.sendStatus(400)
    : pool
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

// GET ROUTE
router.get("/", (req, res) => {
  console.log("/api/feedback GET");
  const queryText = `SELECT * FROM "feedback" ORDER BY "id" DESC;`;
  pool
    .query(queryText)
    .then((result) => {
      console.log("Feedback successfully retrieved from database");
      res.send(result.rows); // send the table back to the client
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

// DELETE ROUTE
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(`DELETE request at /api/feedback/delete/${id}`);
  const queryText = `DELETE FROM "feedback" WHERE "id" = $1;`;
  pool
    .query(queryText, [id])
    .then((result) => {
      console.log("Feedback successfully deleted from database");
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}:`, err);
      res.sendStatus(500);
    });
});

// PUT ROUTE
router.put("/flag/:id", (req, res) => {
  const id = req.params.id;
  console.log(`PUT request at /api/feedback/flag/${id}`);
  const queryText = `UPDATE "feedback" SET "flagged" = NOT "flagged" WHERE "id" = $1;`;
  pool
    .query(queryText, [id])
    .then((result) => {
      console.log("Feedback successfully updated");
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}:`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
