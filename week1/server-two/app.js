//const express = require("express");
//const app = express();
const port = 3000;
const pug = require("pug");

// Compile the source code
const compiledFunction = pug.compileFile("public");

// Render a set of data
console.log(
  compiledFunction({
    name: "Timothy"
  })
);
//app.use(express.static("public"));
app.get("/", (req, res) => res.send("Hello World!"));
app.get("/catinfo", (req, res) => {
  const cat = {
    name: "Frank",
    age: 6,
    weight: 5
  };
  res.json(cat);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
