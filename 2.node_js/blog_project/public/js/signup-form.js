// input 태그 focus blur 이벤트 설정
$(".input").on("focus", function () {
    $(this).parent().addClass("label-up");
});

$(".input").on("blur", function () {
    if ($(this).val() == "") {
        $(this).parent().removeClass("label-up");
    }
});

// Email 유효성 검사
function emailChecking() {
    let email = $("#email").val();
    let data = { email };

    $(".email-alert").addClass("show").css("color", "red");

    if (email == "") {
        $(".email-alert").html("<strong>이메일</strong>을 입력해주세요.");
        $("#email").focus();
    } else {
        fetch("/emailCheck", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((rs) => rs.text())
            .then((text) => {
                if (text == "available") {
                    $(".email-alert")
                        .html("사용 가능한 <strong>이메일</strong>입니다.")
                        .css("color", "blue");
                    $("#verifyBtn").attr("disabled", false);
                } else if (text == "used") {
                    $(".email-alert").html(
                        "이미 가입된 <strong>이메일</strong>입니다."
                    );
                    $("#email").focus();
                } else {
                    $(".email-alert").html(
                        "<strong>이메일</strong> 형식이 올바르지 않습니다."
                    );
                    $("#email").focus();
                }
            });
    }
}

$("#email").change(function () {
    $(".verify").attr("disabled", true);
    $("#verifyNum").val("").parent().removeClass("label-up");
    $(".verify-alert").removeClass("show");
    $("#verifyBtn").html("인증번호<br>발송");
    $(".email-alert").removeClass("show");
    fetch("/delEmailSession", { method: "post" });
});

// 이메일 인증번호 발송
function sendVerify() {
    let email = $("#email").val();
    let data = { email };

    fetch("/emailVerify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((rs) => rs.text())
        .then((text) => {
            if (text == "success") {
                alert("인증번호를 발송하였습니다.");
                $("#verifyNum")
                    .attr("disabled", false)
                    .attr("readonly", false)
                    .val("")
                    .focus();
            } else if (text == "fail") {
                alert("인증번호 발송을 실패했습니다.");
            } else {
                alert("이메일 중복이 확인되지 않았습니다.");
                $('#email').focus();
            }
        });

    $("#verifyBtn").html("인증번호<br>재발송");
}

// 인증번호 유효성 검사
$("#verifyNum").on("input", function () {
    let number = $("#verifyNum").val();
    let data = { number };

    $(".verify-alert").addClass("show").css("color", "red");

    if (number != "") {
        if (number.length == 6) {
            fetch("/verifyNumCheck", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((rs) => rs.text())
                .then((text) => {
                    if (text == "success") {
                        $(".verify-alert")
                            .html("<strong>인증번호</strong>가 일치합니다.")
                            .css("color", "blue");
                        $("#verifyNum").attr("readonly", true).blur();
                    } else {
                        $(".verify-alert").html(
                            "<strong>인증번호</strong>가 불일치합니다."
                        );
                    }
                });
        } else {
            $(".verify-alert").html("<strong>인증번호</strong>는 6자리입니다.");
        }
    } else {
        $(".verify-alert").removeClass("show");
    }
});

// 닉네임 유효성 검사
function nicknameChecking() {
    let nickname = $("#nickname").val();
    let data = { nickname };

    $(".nickname-alert").addClass("show").css("color", "red");

    if (nickname == "") {
        $(".nickname-alert").html("<strong>닉네임</strong>을 입력해주세요.");
        $("#nickname").focus();
        return;
    } else {
        fetch("/nicknameCheck", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((rs) => rs.text())
            .then((text) => {
                $(".nickname-alert").css("color", "red");
                if (text == "available") {
                    nicknameCheck = true;
                    $(".nickname-alert")
                        .html("사용 가능한 <strong>닉네임</strong>입니다.")
                        .css("color", "blue");
                } else if (text == "used") {
                    $(".nickname-alert").html(
                        "이미 사용중인 <strong>닉네임</strong>입니다."
                    );
                    $("#nickname").focus();
                } else {
                    $(".nickname-alert").html(
                        "<strong>닉네임</strong> 형식이 올바르지 않습니다."
                    );
                    $("#nickname").focus();
                }
            });
    }
}

$("#nickname").change(function () {
    fetch('/delNicknameCheck', {method : 'post'})
    $(".nickname-alert").removeClass("show");
});

// 비밀번호 유효성 검사
$("#pwd").change(function () {
    let pwd = $("#pwd").val();
    let data = { pwd };

    $(".pwd-alert").addClass("show").css("color", "red");

    if (pwd == "") {
        $(".pwd-alert").removeClass("show");
    } else {
        fetch("/pwdCheck", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((rs) => rs.text())
            .then((text) => {
                if (text == "available") {
                    $(".pwd-alert")
                        .html("사용 가능한 <strong>비밀번호</strong>입니다.")
                        .css("color", "blue");
                } else {
                    $(".pwd-alert").html(
                        "6~15자 / 영대소문자, 숫자, 특문 포함"
                    );
                }
            });
    }
});

// 비밀번호 보이기 토글
$("#pwd-toggle").on("click", function () {
    $(this).toggleClass("bi-eye bi-eye-slash");

    if ($("#pwd").prop("type") == "password") {
        $("#pwd").prop("type", "text");
    } else {
        $("#pwd").prop("type", "password");
    }
});

// capslock-alert
$("#pwd").on("keydown keyup", function (e) {
    if (e.originalEvent.getModifierState("CapsLock")) {
        $("#capslock-alert").addClass("show");
        $(".pwd-alert").css("margin-top", "15px");
    } else {
        $("#capslock-alert").removeClass("show");
        $(".pwd-alert").css("margin-top", "0px");
    }
});

// pwd input에서 blur시 capslock-alert 제거
$("#pwd").on("blur", function () {
    $("#capslock-alert").removeClass("show");
});

// submit
function send(f) {
    let email = f.email.value;
    let pwd = f.pwd.value;
    let nickname = f.nickname.value;

    $(".error").removeClass("show");

    let body = new URLSearchParams(new FormData(f));
    fetch("/signup", { method: "post", body })
        .then((rs) => rs.text())
        .then((text) => {
            switch (text) {
                case "success":
                    alert("회원가입에 성공했습니다.");
                    location.href = "/login";
                    break;
                case "email-fail":
                    alert("이메일 중복이 확인되지 않았습니다.");
                    $("#email").focus();
                    break;
                case "verify-fail":
                    alert("이메일이 인증되지 않았습니다.");
                    break;
                case "nickname-fail":
                    alert("닉네임 중복이 확인되지 않았습니다.");
                    $("#nickname").focus();
                    break;
                case "pwd-fail":
                    alert("비밀번호가 올바르지 않습니다.");
                    $("#pwd").focus();
                    break;
                default:
                    alert("오류가 발생했습니다.");
                    break;
            }
        });
}
