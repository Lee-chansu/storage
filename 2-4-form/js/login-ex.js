// 포커스 위치 : focus, 포커스 벗어남 : blur
// 이벤트 리스너, classList 활용하여 코드 작성.

let userInfo = { id : 'korea', pw : 'asd123@@'}

let boxColor = document.querySelectorAll('.boxColor')
let inputBox = document.querySelectorAll('.inputBox')

let userId = document.getElementById("id");
let userPw = document.getElementById("pw");
let loginBtn = document.getElementById("loginBtn");

let errorMessage = document.querySelector(".errorMessage");
let regex = /(?=.*[a-z])(?=.*[\d])(?=.*[@#$%^&*!?])[a-z\d@#$%^&*!?]+/
let regex2 = /(?=.*[a-z])+(?=.*[\d])+(?=.*[!@#$%^&*()?])/

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

  if(idValue == "" && pwValue == ""){
    errorMessage.innerHTML("아이디와 비밀번호를 입력하세요")
  }
  else if(idValue == ""){
    errorMessage.innerHTML("아이디를 입력하세요")
  }
  else if(pwValue == ""){
    errorMessage.innerHTML("비밀번호를 입력하세요")
  }//4~12
  else if(idValue.length < 4 || idValue.length > 12){
    errorMessage.innerHTML("아이디는 4~12글자입니다.")
  }//소문자, 숫자, 특수문자 1개 이상씩
  else if(pwValue != regex2){
    errorMessage.innerHTML("비밀번호 형식이 올바르지 않습니다.")
  }


})


