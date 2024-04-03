const router = require("express").Router();
const bcrypt = require("bcrypt");
const db = require("../models");
const { User } = db;

router.get("/join", (req, res) => {
  res.render("join.ejs");
});

//hashing <-- 문자를 다른 랜덤한 문자로 바꾸는 것.
//해싱 알고리즘 : SHA3-256, SHA-512, bcrypt, scrypt, argon2...
//해싱된 문자를 보고 원래 문자유추X, 해싱해서 저장하는 것이 안전

router.post("/join", async (req, res) => {
  let hash = await bcrypt.hash(req.body.password, 10);

  const newUser = {
    userID: req.body.userID,
    password: hash,
  };

  const result = await User.findOne({ where: { userID: newUser.userID } });
  let isJoined = "";

  if (!result) {
    await User.create(newUser);
    isJoined = "success";
  } else {
    isJoined = "fail";
  }
  res.render("isJoin.ejs", { isJoined });
});

module.exports = router;
