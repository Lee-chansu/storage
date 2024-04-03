require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.listen(process.env.PORT, () => {
  // DB접속 완료후 서버실행
  console.log(`http://localhost:4000`);
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Get
app.use("/", require("./routes/list.js"));
//Post, Put, Delete
app.use("/", require("./routes/crud.js"));
app.use("/", require("./routes/login.js"));
app.use("/", require("./routes/join.js"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});
