const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");
const MySQLStore = require("express-mysql-session")(session);
const LocalStrategy = require("passport-local");

const db = require("./models");
const { Member, User } = db;

const bcrypt = require("bcrypt");

const port = 4000;

const dbOption = {
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "1234",
  database: "work",
};

const sessionOption = {
  secret: "123456789!@#", //세션 문자열, 암호화 할 때 필요한 문자열
  resave: false, //유저가 요청을 보낼때마다 session 데이터 갱신할지 여부
  saveUninitialized: false, // 유저가 로그인을 하지 않아도 session을 저장해둘지
  coocki: { maxAge: 24 * 60 * 60 * 1000 }, // 1s = 1000ms (쿠키 저장시간 설정)
  store: new MySQLStore(dbOption) //세션 저장위치 지정
};

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//인증기능 위한 미들웨어 등록 - 3가지 등록
app.use(passport.initialize());
app.use(session(sessionOption));
app.use(passport.session());

app.use("/", require("./routes/join.js"));
app.use("/", require("./routes/login.js"));
app.use("/", require("./routes/api.js"))

//입력한 아이디와 비밀번호가 db에 저장된 것과 일치한가를 검증하는 코드
// cb : callback 함수의 약자, 인증 작업이 완료되면 호출.
// cb(error, user, info) 순의 매개변수를 가진다.
/*
  1) 오류 (null - 오류 없음)
  2) 인증된 사용자 (false - 인증된 사용자 없음 뜻함)
  3) 

*/
passport.use(new LocalStrategy({ 
  usernameField: "userID", 
  passwordField: "password"
}, async (userID, password, cb) => {
      let result = await User.findOne({ where: { userID } });

      if (!result) {
        return cb(null, false, { message: "아이디 DB에 없음" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, result.password);

      if (isPasswordCorrect) {
        return cb(null, result);
      } else {
        return cb(null, false, { message: "비번 불일치" });
      }
    }
  )
);

//로그인 성공 시 done 함수에 두번째 매개변수에 session을 만들어 둔다.
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user.id, userID: user.userID });
  });
});

/*
  유저가 요청을 보낼때마다, 쿠키에 뭐가 있으면 세션 데이터랑 비교해보고 별 이상 없으면
  그냥 패스.
*/

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});

app.listen(port, () => {
  console.log("접속 완료 - http://localhost:4000/");
});


