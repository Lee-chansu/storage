let username = document.getElementById("username");
let pw = document.getElementById("password");
let phoneNum = document.getElementById("phoneNum");
let errormessage = document.getElementById("errormessage");
let delBtn = document.getElementById("del-btn");

let cancleBtn = document.querySelector(".cancle-btn");
let joinBtn = document.querySelector(".join-btn");
const regex = /(?=.*[a-z])(?=.*[\d])(?=.*[@#$%^&*!?])[a-z\d@#$%^&*!?]+/;

joinBtn.addEventListener("click", function () {
  let usernameValue = username.value;
  let pwValue = pw.value;
  let phoneNumValue = phoneNum.value;

  if (usernameValue == "") {
    errormessage.innerHTML = "아이디를 입력해주세요";
    return;
  } else if (pwValue == "") {
    errormessage.innerHTML = "비밀번호를 입력해주세요";
    return;
  } else if (usernameValue.length < 4 || usernameValue.length > 12) {
    errormessage.innerHTML = "아이디는 4~12글자입니다.";
    return;
  } else if (!regex.test(pwValue)) {
    errormessage.innerHTML = "비밀번호의 형식이 맞지 않습니다.";
    return;
  }

  let body = {
    username: usernameValue,
    password: pwValue,
    phoneNum: phoneNumValue,
  };

  fetch("/update/<%= user.id %>", {
    method: "put",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

cancleBtn.addEventListener("click", (e) => {
  let id = e.target.dataset.id;

  location.href = "/" + id;
});

delBtn.addEventListener("click", (e) => {
  if (!confirm("정말 탈퇴하시겠습니까?")) {
    return;
  } else {
    let id = e.target.dataset.id;

    fetch("/remove/" + id, { method: "delete" })
      .then((r) => r.text())
      .then((r) => {
        if (r == "success") {
          alert("서비스를 이용해주셔서 감사합니다.")
          location.href = "/";
        } else {
          alert("오류 발생");
        }
      });
  }
});
