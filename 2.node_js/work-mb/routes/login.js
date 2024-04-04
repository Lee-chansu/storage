require("dotenv").config();
const router = require("express").Router();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
let connectDB = require("../db.js");
const MongoStore = require("connect-mongo");
const { ObjectId } = require("mongodb");

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

router.use(passport.initialize());
router.use(session(sessionOption));
router.use(passport.session());

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
    done(null, { id: user._id, userid: user.userId });
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

//로그인
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return res.status(500).json(error);
    if (!user) return res.status(401).json(info.message);

    req.logIn(user, err => {
      if (err) return next(err);
      res.send(`${user.userId}: 로그인 성공`);
    });
  })(req, res, next);
});

//로그아웃
router.get("/logout", async (req, res) => {
  let session = req.session;
  req.logout(() => {
    session.destroy();
    res.send("세션 제거 완료");
  });
});

module.exports = router;
