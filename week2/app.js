"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
const cats = require("./routes/catRoute");
const users = require("./routes/userRoute");
const auth = require("./routes/authRoute");
const passport = require(".utils/pass");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/cat", passport.auhenticate('jwt', {session: false}), cats);
app.use("/user", passport.auhenticate('jwt', {session: false}), users);
app.use("/auth", auth);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
