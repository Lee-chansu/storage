const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");
const MySQLStore = require("express-mysql-session")(session);
const LocalStrategy = require("passport-local");

const db = require("./models");
const { Member, User } = db;

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
  store: new MySQLStore(dbOption), //세션 저장위치 지정
};

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//인증기능 위한 미들웨어 등록 - 3가지 등록
app.use(passport.initialize());
app.use(session(sessionOption));
app.use(passport.session());

//입력한 아이디와 비밀번호가 db에 저장된 것과 일치한가를 검증하는 코드
// cb : callback 함수의 약자, 인증 작업이 완료되면 호출.
// cb(error, user, info) 순의 매개변수를 가진다.
/*
  1) 오류 (null - 오류 없음)
  2) 인증된 사용자 (false - 인증된 사용자 없음 뜻함)
  3) 

*/
passport.use(
  new LocalStrategy(
    {
      usernameField: "userID",
      passwordField: "password",
    },
    async (userID, password, cb) => {
      let result = await User.findOne({ where: { userID } });

      if (!result) {
        return cb(null, false, { message: "아이디 DB에 없음" });
      }

      if (result.password == password) {
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
  

*/

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});

app.listen(port, () => {
  console.log("접속 완료 - http://localhost:4000/");
});

app.get("/", (req, res) => {
  const result = req.user;

  if (!result) {
    return res.render("index.ejs", { result: "로그인 필요" });
  }
  res.render("index.ejs", { result });
});

app.get("/api/members", async (req, res) => {
  const { team, position } = req.query;
  try {
    if (team && position) {
      const findMembers = await Member.findAll({ where: { team, position } });
      res.send(findMembers);
    } else if (team) {
      const teamMembers = await Member.findAll({ where: { team } });
      res.send(teamMembers);
    } else if (position) {
      const positionMembers = await Member.findAll({ where: { position } });
      res.send(positionMembers);
    } else {
      const members = await Member.findAll();
      res.send(members);
    }
  } catch (error) {
    res.status(400).send("404 error!" + error);
  }
});

app.post("/api/members", async (req, res) => {
  const newMember = req.body;
  await Member.create(newMember);
  res.send(newMember);
});

/*정보 수정 1 - forEach 활용*/
/* app.put("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = Member.findOne({ where: { id } });

  if (member) {
    Object.keys(newInfo).forEach(prop => {
      member[prop] = newInfo[prop];
    });
    await member.save();
  }
}); */

/*정보 수정 2 - update*/
app.put("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  try {
    await Member.update(newInfo, { where: { id } });
    const member = await Member.findOne({ where: { id } });
    res.send(member);
  } catch (error) {
    res.status(400).send("404 error!" + error);
  }
});

app.delete("/api/members/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Member.destroy({ where: { id } });
    res.send("이용해주셔서 감사합니다.");
  } catch (error) {
    res.status(400).send("404 error!" + error);
  }
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  //카카오나 구글의 경우 local => google || kakao
  passport.authenticate("local", (error, user, info) => {
    //에러 처리 방식 등은 커스텀 가능
    if (error) return res.status(500).json(error);
    if (!user) return res.status(401).send(info.message);

    req.login(user, err => {
      if (err) return next(err); //오류가 나면 next 미들웨어로 오류처리를 넘긴다.
      res.redirect("/");
    });
  })(req, res);
});

app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});
