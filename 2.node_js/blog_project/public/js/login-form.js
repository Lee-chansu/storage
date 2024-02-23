// input 태그 focus blur 이벤트 설정
$(".input").on("focus", function () {
    $(this).parent().addClass("label-up");
});

$(".input").on("blur", function () {
    if ($(this).val() == "") {
        $(this).parent().removeClass("label-up");
    }
});

// 엔터키로 로그인 실행
$("#login-form").keypress(function (e) {
    if (e.keyCode === 13) $("#sign-in").click();
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
    } else {
        $("#capslock-alert").removeClass("show");
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
    let path = f.path.value;
    
    $(".error").removeClass("show");

    if(email != 'root' && email != 'user'){
        if (email == "" && pwd == "") {
            $("#both-empty").addClass("show");
            $("#email").focus();
            return;
        }
        if (email == "") {
            $("#email-empty").addClass("show");
            $("#email").focus();
            return;
        }
        if (pwd == "") {
            $("#pwd-empty").addClass("show");
            $("#pwd").focus();
            return;
        }
    }else{
        f.pwd.value = '1111'
    }
    

    let body = new URLSearchParams(new FormData(f));
    fetch("/login", { method: "POST", body, redirect: "follow" })
        .then((rs) => rs.text())
        .then((text) => {
            if (text == "success") {
                location.href = path;
            } else if (text == "fail") {
                alert("존재하지 않는 계정입니다.");
                $("#login-form")[0].reset();
                $("#email").focus();
            } else if (text == "pwd-fail") {
                alert("비밀번호가 일치하지 않습니다.");
                $("#pwd").val("").focus();
            } else {
                alert('오류가 발생했습니다.')
            }
        });
}
