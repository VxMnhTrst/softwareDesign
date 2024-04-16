const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handleBars = require("express-handlebars");
const app = express();
const port = 3000;

//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
  "hbs",
  handleBars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      json: (content) => JSON.stringify(content),
      prodClassFromName: (prodName) => prodName.replaceAll(" ", "-"),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
