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

router.get("/add", async (req, res) => {
  res.render("write.ejs");
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

      res.redirect("/list");
    }
  } catch (error) {
    console.log(error);
    res.send("에러있음", error);
  }
});

//1개만 조회하기
router.get("/detail/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let result = await db.collection("post").findOne({ _id: new ObjectId(id) });
    if (result == null) {
      res.status(400).send("글을 찾을 수 없습니다.");
    } else {
      res.render("detail.ejs", { list: result });
    }
  } catch (error) {
    console.log(error);
  }
});

//수정 페이지
router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  let result = await db.collection("post").findOne({ _id: new ObjectId(id) });
  res.render("edit.ejs", { result });
});

//수정 기능
router.put("/edit", async (req, res) => {
  const { id, title, content } = req.body;

  try {
    let result = await db
      .collection("post")
      .updateOne({ _id: new ObjectId(id) }, { $set: { title, content } });
    console.log("수정 완료");
    res.redirect(`/detail/${id}`);
  } catch (error) {}
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log("지우기 접속");

  // fetch로 요청을 한 경우에, 새로고침 하지 안하야 하기 때문에
  //서버에 render, redirect 요청 x

  try {
    await db.collection("post").deleteOne({ _id: new ObjectId(id) });
    res.send("삭제완료");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
