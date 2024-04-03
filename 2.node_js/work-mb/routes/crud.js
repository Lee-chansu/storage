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

router.post("/add", async (req, res) => {
  const newBook = req.body;

  try {
    if (newBook.title == "") {
      res.send("제목 없음");
    } else if (newBook.title.length > 20) {
      res.send("제목은 4~20자 내외로 해야합니다.");
    } else if (newBook.content == "") {
      res.send("책 내용 없음");
    } else {
      let reulst = await db
        .collection("post")
        .insertOne(newBook, (err, result) => {
          console.log("전송 완료");
        });

      res.redirect("/book");
    }
  } catch (error) {
    console.log(error);
    res.send("에러있음", error);
  }
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  //파라미터로 받은 아이디와 똑같은 것이 있는지 검색

  try {
    let result = await db.collection("post").findOne({ _id: new ObjectId(id) });
    if (result == null) {
      res.status(400).send("글을 찾을 수 없습니다.");
    } else {
      res.send({ result });
    }
  } catch (error) {
    console.log("에러 발생", error);
  }
});

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;

  try {
    let result = await db
      .collection("post")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { title: newInfo.title, content: newInfo.content } }
      );
    console.log("수정 완료");
    res.redirect(`/edit/${id}`);
  } catch (error) {}
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
