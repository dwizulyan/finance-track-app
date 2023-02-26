//require
//express
//fs

const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  let text = "";
  fs.readFile("data/users.json", "utf-8", (err, jsons) => {
    const data = JSON.parse(jsons);
    let name = [];
    data.forEach((element) => {
      name.push(element);
    });
    res.render("index", { data: name });
  });
});

app.listen(port, (err) => {
  console.log(`The server is running in ${port}`);
});
