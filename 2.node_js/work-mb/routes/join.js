require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

let connectDB = require("../db.js");

let db;
connectDB
  .then(client => {
    db = client.db("forum");
  })
  .catch(err => {
    console.log(err);
  });

router.get("/join", (req, res) => {
  res.send("회원가입");
});

router.post("/join", async (req, res) => {
  const { userId, password } = req.body;
  let hash = await bcrypt.hash(password, 10);

  await db.collection("user").insertOne({ userId, password: hash });
  res.send("등록 성공");
});

router.put("/put", async (req, res) => {
  let siteUser = { userId: req.userId, password: req.password };
  if (!await bcrypt.compare(siteUser.password, checkPassword)) {
    res.send('현재 비밀번호가 일치X')
  }
});

module.exports = router;
