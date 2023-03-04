//require
//express
//fs

const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readFile("data/users.json", "utf-8", (err, jsons) => {
    const data = JSON.parse(jsons);
    let name = [];
    data.forEach((element) => {
      name.push(element);
    });
    res.render("index", { data: name });
  });
});

app.get("/add", (req, res) => {
  res.render("add");
});
app.post("/add", (req, res) => {
  fs.readFile("data/users.json", "utf-8", (err, jsons) => {
    const data = JSON.parse(jsons);
    data.push(req.body);
    fs.writeFile("data/users.json", JSON.stringify(data), (err) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});
app.listen(port, (err) => {
  console.log(`The server is running in ${port}`);
});
