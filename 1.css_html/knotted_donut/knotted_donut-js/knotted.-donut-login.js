let userInfo = {
    id : 'tutle',
    pw : 'asd123!@#'
}

let id = document.getElementById("id");
let pw = document.getElementById("password");
let errormessage = document.getElementById("errormessage");

let loginBtn = document.querySelector(".login-btn");
let regex = /(?=.*[a-z])(?=.*[\d])(?=.*[@#$%^&*!?])[a-z\d@#$%^&*!?]+/

loginBtn.addEventListener('click', function(){
    let idValue = id.value
    let pwValue = pw.value


    if(idValue == ''){
        errormessage.innerHTML="아이디를 입력해주세요"
    }
    else if(pwValue == ''){
        errormessage.innerHTML="비밀번호를 입력해주세요"
    }
    else if(idValue.length < 4 || idValue.length > 12){
        errormessage.innerHTML="아이디는 4~12글자입니다."
    }
    else if(!regex.test(pwValue)){
        errormessage.innerHTML="비밀번호의 형식이 맞지 않습니다."
    }
    else if(userInfo.id == idValue && userInfo.pw == pwValue){
        alert('로그인에 성공했습니다.')
        return;
    }

})