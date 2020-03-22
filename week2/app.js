"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const cats = require("./routes/catRoute");
const users = require("./routes/userRoute");
const auth = require("./routes/authRoute");
const passport = require("./utils/pass");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", auth);
app.use("/user", passport.authenticate("jwt", { session: false }), users);

app.use("/cat", cats);
app.use("/user", users);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
