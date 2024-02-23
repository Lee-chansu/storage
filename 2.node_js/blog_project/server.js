const express = require("express");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const models = require("./models");
const nodemailer = require("nodemailer");
const regex = require("./regex");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(
    session({
        secret: "1111",
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
);
app.use(passport.session());

// passport 설정
passport.use(
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "pwd",
        },
        async (email, pwd, done) => {
            let result = await models.member.findOne({
                where: { email: email },
            });
            if (!result) {
                return done(null, false, { message: "fail" });
            }
            if (result.pwd != pwd) {
                return done(null, false, { message: "pwd-fail" });
            }
            return done(null, result);
        }
    )
);

passport.serializeUser((user, done) => {
    process.nextTick(() => {
        done(null, { id: user.id, email: user.email, nickname: user.nickname });
    });
});

passport.deserializeUser(async (user, done) => {
    let result = await models.member.findOne({ where: { id: user.id } });
    if (result) {
        process.nextTick(() => {
            return done(null, {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
            });
        });
    }
});

// nodemailer 설정
const smtpTransPort = nodemailer.createTransport({
    pool: true,
    maxConnections: 1,
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "wjdgus3044@naver.com",
        pass: "",
    },
    tls: {
        rejectUnauthorized: false,
    },
});

app.listen(8081, () => {
    console.log("server on http://localhost:8081/");
});

// 메인 페이지
app.get("/", (req, res) => {
    res.render("index", { user: req.user });
});

// 로그인 페이지
app.get("/login", (req, res) => {
    let path = req.query.path || "/";
    if (req.user) {
        // 이미 로그인 했다면 빠꾸
        res.redirect(path);
    } else {
        res.render("login-form", { path });
    }
});

// 로그인 검증
app.post("/login", (req, res) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) return res.status(500).json(error);

        if (!user) return res.status(401).send(info.message);

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.status(200).send("success");
        });
    })(req, res);
});

// 로그아웃
app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/login");
    });
});

// 게시판 페이지
app.get("/board", async (req, res) => {
    let page = req.query.page ? req.query.page : 1;
    let limit = 5;
    let totalPost = await models.board.count();
    let totalPage = Math.ceil(totalPost / limit);
    if (page > totalPage) {
        page = totalPage;
    }

    let offset = (page - 1) * limit;

    let count = await models.board.count();

    if (count == 0) {
        offset = 0;
    }
    const boardList = await models.board.findAll({
        include: [
            {
                model: models.member,
                attributes: ["nickname"],
            },
        ],
        order: [["id", "DESC"]],
        offset,
        limit,
    });
    console.log(boardList)
    res.render("board", { user: req.user, boardList, totalPage });
});

// 게시글 작성 페이지
app.get("/board/post", (req, res) => {
    if (req.user) {
        res.render("board-insert", { user: req.user });
    } else {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<script>alert('로그인이 필요한 서비스입니다')</script>");
        res.write("<script>location.href='/login'</script>");
    }
});

// 게시글 작성
app.post("/board/post", async (req, res) => {
    await models.board
        .create(req.body)
        .then(() => {
            res.redirect("/board");
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// 게시글 상세 페이지
app.get("/board/:id", async (req, res) => {
    const { id } = req.params;

    try {
        let data = await models.board.findOne({
            include: [
                {
                    model: models.member,
                    attributes: ["nickname"],
                },
            ],
            where: { id: id },
        });
        console.log(data);
        res.render("board-view", { data, user: req.user });
    } catch {
        res.status(500).send("error");
    }
});

// 게시글 삭제
app.delete("/board/:id", async (req, res) => {
    const { id } = req.params;

    await models.board
        .destroy({ where: { id: id } })
        .then(() => {
            res.send("success");
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// 게시글 수정 페이지
app.get("/board/:id/update", async (req, res) => {
    const { id } = req.params;

    let postData = await models.board.findByPk(id).catch((error) => {
        return res.status(500).send(error);
    });

    if (!req.user) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<script>alert('로그인이 필요한 서비스입니다')</script>");
        res.write("<script>location.href='/login'</script>");
        return;
    } else if (postData.writer != req.user.id) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(
            "<script>alert('본인이 작성한 글만 수정이 가능합니다')</script>"
        );
        res.write("<script>location.href='/board'</script>");
        return;
    }

    res.render("board-update", { data: postData, user: req.user });
});

// 게시글 수정
app.put("/board/:id", async (req, res) => {
    const { id } = req.params;

    await models.board
        .update(req.body, { where: { id: req.body.id } })
        .then(() => {
            res.redirect("/board");
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// 로그인 페이지
app.get("/signup", (req, res) => {
    res.render("signup-form");
});

// 이메일 유효성 검사
app.post("/emailCheck", async (req, res) => {
    let { email } = req.body;
    let result = await models.member.findOne({ where: { email } });
    if (!regex.emailRegex.test(email)) {
        return res.send("fail");
    } else if (result) {
        return res.send("used");
    } else {
        req.session.emailCheck = true;
        console.log("emailCheck 세션 등록");
        return res.send("available");
    }
});

// 이메일 값 변경시 세션 삭제
app.post("/delEmailSession", (req, res) => {
    if (req.session.emailCheck) {
        delete req.session.emailCheck;
        console.log("emailCheck 세션 삭제 완료");
    }
    if (req.session.emailVerify) {
        delete req.session.emailVerify;
        console.log("emailVerify 세션 삭제 완료");
    }
    return res.status(200).redirect("/");
});

// 이메일 인증번호 발송
app.post("/emailVerify", async (req, res) => {
    if (req.session.emailVerify) {
        delete req.session.emailVerify;
        console.log("emailVerify 세션 삭제");
    }
    const number = Math.floor(100000 + Math.random() * 900000);
    req.session.verifyNum = number;
    console.log("인증번호 : " + number);

    const { email } = req.body; //사용자가 입력한 이메일
    return res.send("success");
    // const mailOptions = {
    //     from: "wjdgus3044@naver.com", // 발신자 이메일 주소.
    //     to: email, //사용자가 입력한 이메일 -> 목적지 주소 이메일
    //     subject: " 인증 관련 메일 입니다. ",
    //     html: "<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1>" + number,
    // };
    // smtpTransPort.sendMail(mailOptions, (err, response) => {
    //     console.log("response", response);
    //     //첫번째 인자는 위에서 설정한 mailOption을 넣어주고 두번째 인자로는 콜백함수.
    //     if (err) {
    //         return res.send("fail");
    //         smtpTransport.close(); //전송종료
    //     } else {
    //         return res.send("success");
    //         smtpTransport.close(); //전송종료
    //     }
    // });
});

// 인증번호 검사
app.post("/verifyNumCheck", (req, res) => {
    const { number } = req.body;
    const verifyNum = req.session.verifyNum;
    console.log("입력 인증번호 : " + number);

    if (!req.session.emailCheck) return res.send("emailCheck-fail");
    if (number == verifyNum) {
        req.session.emailVerify = true;
        console.log("emailVerify 세션 등록");
        return res.send("success");
    } else {
        return res.send("fail");
    }
});

// 닉네임 유효성 검사
app.post("/nicknameCheck", async (req, res) => {
    const { nickname } = req.body;
    let result = await models.member.findOne({ where: { nickname } });
    if (!regex.nicknameRegex.test(nickname)) {
        return res.send("fail");
    } else if (result) {
        return res.send("used");
    } else {
        req.session.nicknameCheck = true;
        console.log("nicknameCheck 세션 등록");
        return res.send("available");
    }
});

// 닉네임 값 변경시 세션 삭제
app.post("/delNicknameCheck", (req, res) => {
    if (req.session.nicknameCheck) {
        delete req.session.nicknameCheck;
        console.log("nicknameCheck 세션 삭제");
    }
    return res.status(200).redirect("/");
});

// 비밀번호 유효성 검사
app.post("/pwdCheck", (req, res) => {
    if (req.session.pwdCheck) {
        delete req.session.pwdCheck;
        console.log("pwdCheck 세션 삭제");
    }
    let { pwd } = req.body;
    if (!regex.pwdRegex.test(pwd)) {
        return res.send("fail");
    } else {
        req.session.pwdCheck = true;
        console.log("pwdCheck 세션 등록");
        return res.send("available");
    }
});

// DB에 회원 추가
app.post("/signup", async (req, res) => {
    if (!req.session.emailCheck) return res.send("email-fail");
    if (!req.session.emailVerify) return res.send("verify-fail");
    if (!req.session.nicknameCheck) return res.send("nickname-fail");
    if (!req.session.pwdCheck) return res.send("pwd-fail");

    await models.member
        .create(req.body)
        .then(() => {
            res.status(200).send("success");
        })
        .catch((error) => {
            res.status(500).send(error);
        });
});

// 마이페이지
app.get("/member/:id", async (req, res) => {
    let { id } = req.params;
    let userData = await models.member.findOne({ where: { id } });
    let postData = await models.board.findAll({
        where: { writer: id },
        limit: 10,
    });
    console.log(userData)
    res.render("mypage", { userData, postData, user: req.user });
});

// 회원정보 수정 페이지
app.get("/member/:id/update", async (req, res) => {
    let { id } = req.params;

    if (!req.isAuthenticated() || req.user.id != id) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<script>alert('접근 권한이 없습니다.')</script>");
        res.write("<script>location.href='/'</script>");
        return;
    }

    let userData = await models.member.findByPk(id);

    res.render("member-update", { userData, user: req.user });
});
