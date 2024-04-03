const router = require("express").Router();
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



//전체 리스트 및 검색 결과 출력
router.get("/list", async (req, res) => {
  const { title } = req.query;
  const { content } = req.query;
  let book;
  try {
    if (title) {
      book = await db
        .collection("post")
        .find({ title: { $regex: title } })
        .toArray();
      console.log("제목 검색 완료");
    } else if (content) {
      book = await db
        .collection("post")
        .find({ content: { $regex: content } })
        .toArray();
      console.log("내용 검색 완료");
    } else {
      book = await db.collection("post").find().toArray();
      console.log("검색 완료");
    }
    res.send(book);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
