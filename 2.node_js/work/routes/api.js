const router = require("express").Router();
const db = require("../models");
const { Member } = db;

router.get("/", (req, res) => {
  //10 : 해싱하는 시간 10 = 0.1초 미만

  const result = req.user;
  let isLogin = '';
  if (!result) {
    isLogin = "";
    return res.render("index.ejs", { result: null, isLogin });
  }
  res.render("index.ejs", { result: result.userID });
});

router.get("/api/members", async (req, res) => {
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

router.post("/api/members", async (req, res) => {
  const newMember = req.body;
  await Member.create(newMember);
  res.send(newMember);
});

/*정보 수정 1 - forEach 활용*/
/* router.put("/api/members/:id", async (req, res) => {
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
router.put("/api/members/:id", async (req, res) => {
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

router.delete("/api/members/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Member.destroy({ where: { id } });
    res.send("이용해주셔서 감사합니다.");
  } catch (error) {
    res.status(400).send("404 error!" + error);
  }
});

module.exports = router;
