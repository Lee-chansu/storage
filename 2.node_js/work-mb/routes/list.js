const router = require("express").Router();
let connectDB = require("../db.js");

let db;
connectDB
  .then(client => {
    db = client.db("forum");
  })
  .catch(err => {
    console.log(err);
  });

//전체 리스트 및 검색 결과 출력
router.get("/list", async (req, res) => {
  const { title } = req.query;
  const { content } = req.query;
  let loginInfo;
  if (!req.user) {
    loginInfo = {
      userId: null,
      message: "로그인",
    };
  } else {
    loginInfo = {
      userId: req.user.userId,
      message: `님 안녕하세요.`,
    };
  }
  let list;
  try {
    if (title) {
      list = await db
        .collection("post")
        .find({ title: { $regex: title } })
        .toArray();
      console.log("제목 검색 완료");
    } else if (content) {
      list = await db
        .collection("post")
        .find({ content: { $regex: content } })
        .toArray();
      console.log("내용 검색 완료");
    } else {
      list = await db.collection("post").find().toArray();
      console.log("검색 완료");
    }
    res.render("list.ejs", { list: list, loginInfo });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
