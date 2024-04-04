require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
let connectDB = require("./db.js");
const MongoStore = require("connect-mongo");
const { ObjectId } = require("mongodb");

const methodOverride = require("method-override");

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

//아이디, 비번 검사해주는 미들웨어
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

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user._id, userId: user.userId });
  });
});

passport.deserializeUser(async (user, done) => {
  let result = await db
    .collection("user")
    .findOne({ _id: new ObjectId(user.id) });
  delete result.password; //password 프로퍼티 삭제

  process.nextTick(() => {
    return done(null, user);
  });
});
app.listen(process.env.PORT, () => {
  // DB접속 완료후 서버실행
  console.log(`http://localhost:4000`);
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// res.body 여기서 데이터 꺼내기 쉽게 처리를 해준다

app.use("/", require("./routes/list.js"));
app.use("/", require("./routes/crud.js"));
app.use("/", require("./routes/login.js"));
app.use("/", require("./routes/join.js"));

app.get("/", (req, res) => {
  res.send("반갑다");
});
