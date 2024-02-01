// 포커스 위치 : focus, 포커스 벗어남 : blur
// 이벤트 리스너, classList 활용하여 코드 작성.

let userInfo = { id : 'korea', pw : 'asd123@@'}

let boxColor = document.querySelectorAll('.boxColor')
let inputBox = document.querySelectorAll('.inputBox')

let userId = document.getElementById("id");
let userPw = document.getElementById("pw");
let loginBtn = document.getElementById("loginBtn");

let errorBox = document.querySelector(".errorBox");
let errorMessage = document.querySelector(".errorMessage");
let regex = /(?=.*[a-z])(?=.*[\d])(?=.*[@#$%^&*!?])[a-z\d@#$%^&*!?]+/

// forEach는 배열의 갯수만큼 한개씩 반복해서 적용
inputBox.forEach( function( el, idx){
  
  el.addEventListener('focus', function(){
    boxColor[idx].classList.add('focuson')
    boxColor[idx].classList.add('check')
  })

  el.addEventListener('blur', function(){
    boxColor[idx].classList.remove('check')
    if(el.value == ''){
    boxColor[idx].classList.remove('focuson')
  }
  })

})


loginBtn.addEventListener('click', function(){
  let idValue= userId.value;
  let pwValue= userPw.value;
  let result = checkValid(idValue, pwValue);

  if(result == ''){
    checkLogin()
  }
  else{
  errorMessage.innerHTML = result;
  }
})


function checkValid(idValue, pwValue){
  let errMsg = "";

  if(idValue == "" && pwValue == ""){
    errMsg ="아이디와 비밀번호를 입력하세요"
    errorBox.classList.remove('blind')
  }
  else if(idValue == ""){
    errMsg ="아이디를 입력하세요"
    errorBox.classList.remove('blind')
  }
  else if(pwValue == ""){
    errMsg ="비밀번호를 입력하세요"
    errorBox.classList.remove('blind')
  }//4~12
  else if(idValue.length < 4 || idValue.length > 12){
    errMsg="아이디는 4~12글자입니다."
    errorBox.classList.remove('blind')
  }//소문자, 숫자, 특수문자 1개 이상씩
  else if(pwValue != regex){
    errMsg="비밀번호 형식이 올바르지 않습니다."
    errorBox.classList.remove('blind')
  }
  else{
    checkLogin(idValue, pwValue)
  }
  return errMsg;
}

function checkLogin(){
  let status = ""
  if(idValue == userInfo.id && pwValue == userInfo.pw){
    status = "로그인 성공";
  }
  else{
    status = "아이디 또는 비밀번호를 잘못입력하셨습니다. 다시 확인해주세요.";
  }
}
