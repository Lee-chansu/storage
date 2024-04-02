const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const db = require("./models");
const { Member } = db;

const port = 4000;
app.use(express.json());
app.use(passport.initialize());

app.listen(port, () => {
  console.log("접속 완료 - http://localhost:4000/");
});

app.get("/", (req, res) => {
  res.send("<h1>메인페이지입니다.</h1>");
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
