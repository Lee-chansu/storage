require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
let connectDB = require("./db.js");
const MongoStore = require("connect-mongo");
const { ObjectId } = require("mongodb");

port = process.env.PORT;

let db;
connectDB
  .then(client => {
    console.log("DB연결성공");
    db = client.db("forum");
  })
  .catch(err => {
    console.log(err);
  });

const sessionOption = {
  secret: "secret-123456asdrftsawsef?",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 },
  store: MongoStore.create({
    mongoUrl: process.env.URL,
    dbName: "forum",
  }),
};

app.use(passport.initialize());
app.use(session(sessionOption));
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "userId",
      passwordField: "password",
    },
    async (userid, password, cb) => {
      let result = await db.collection("user").findOne({ userId: userid });

      if (!result) {
        return cb(null, false, { message: "아이디 db에 없음" });
      }
      if (await bcrypt.compare(password, result.password)) {
        //같으면 true
        return cb(null, result);
      } else {
        return cb(null, false, { message: "비번불일치" });
      }
    }
  )
);
app.listen(port, () => {
  // DB접속 완료후 서버실행
  console.log(`http://localhost:4000`);
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/chat", (req, res) => {
  res.render("detail.ejs");
});

app.get("/chat/request", async (req, res) => {
  const chatRoom = db.collection("chatroom");
  await chatRoom.insertOne(
    {member: [req.user._id, new ObjectId(req.query.writeId)],}
  );

  res.redirect("채팅방 목록 페이지");
});
