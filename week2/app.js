"use strict";
const express = require("express");
const app = express();
const port = 3000;
const catModel = require("./models/catModel.js");
const cats = catModel.cats;

app.get("/cat", (req, res) => {
  res.send("From this endpoint you can get cats.");
});

app.get("/cat/:id", function(req, res) {
  res.send(cats);
});

app.post("/cat", function(req, res) {
  res.send("With this endpoint you can add cats.");
});

app.put("/cat", function(req, res) {
  res.send("With this endpoint you can edit cats.");
});

app.delete("/cat", function(req, res) {
  res.send("With this endpoint you can delete cats.");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
