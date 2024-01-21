let userInfo = {
    id : 'tutle',
    pw : 'asd123!@#'
}

let id = document.getElementById("id");
let pw = document.getElementById("password");

let loginBtn = document.querySelector(".login-btn");
let regex = /(?=.*[a-z])(?=.*[\d])(?=.*[@#$%^&*!?])[a-z\d@#$%^&*!?]+/

loginBtn.addEventListener('click', function(){
    let idValue = id.value
    let pwValue = pw.value


    if(idValue == ''){
        alert("아이디를 입력해주세요");
        return;
    }
    else if(pwValue == ''){
        alert("비밀번호를 입력해주세요");
        return;
    }
    else if(idValue.length < 4 || idValue.length > 12){
        alert("아이디는 4-12글자입니다.");
        return;
    }
    else if(!regex.test(pwValue)){
        alert('비밀번호 형식이 올바르지 않습니다.')
        return;
    }
    else if(userInfo.id == idValue && userInfo.pw == pwValue){
        alert('로그인에 성공했습니다.')
        return;
    }

})

let checkValid = function(){

}