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

// forEach는 배열의 갯수만큼 한개씩 반복해서 적용
inputBox.forEach( function( el, idx){
  
  el.addEventListener('focus', function(){
    boxColor[idx].classList.add('check')
  })

  el.addEventListener('blur', function(){
    boxColor[idx].classList.remove('check')
  })

})

loginBtn.addEventListener('click', ()=>{

  let idValue = userId.value; // 인풋상자에 입력한 내용을 변수에 저장
  let pwValue = userPw.value;

  // 문제4) idValue, pwValue 값 검사
  // - id, pw 둘 다 입력 안 된 경우 - errorMessage의 텍스트를 - ID와 PW를 입력해주세요.
  // - id 입력 안 된 경우 - errorMessage의 텍스트를 - ID를 입력해주세요.
  // - pw 입력 안 된 경우- errorMessage의 텍스트를 - PW를 입력해주세요.
  // - ID가 4~12글자가 아니면- 아이디는 4~12글자 입니다. - errorMessage의 텍스트를 - ID는 4~12 글자입니다.

  // 비밀번호,  영어, 숫자, 특수기호가 섞인 비밀번호
  // 정규식 - 문자열의 내용을 검사해주는 식 = regex

  if( idValue == "" && pwValue == ""){
    errorMessage.innerHTML = "ID와  패스워드를 입력해주세요."
  } else if( idValue == ""){
    errorMessage.innerHTML = "ID를 입력해주세요."
  } else if( pwValue == ""){
    errorMessage.innerHTML = "패스워드를 입력해주세요."
  } else if( idValue.length < 4 || idValue.length > 12){
    errorMessage.innerHTML = "아이디는 4~12글자 입니다."
  } else if( !regex.test( pwValue) ){
    errorMessage.innerHTML = "비밀번호는 형식이 맞지 않습니다."
  }else{

    if(idValue== userInfo.id && pwValue == userInfo.pw){
      errorMessage.innerText =""
      alert('로그인 성공')

    } else {
      errorMessage.innerText = "아이디 또는 비밀번호 잘 못 입력, 다시 시도"
    }

  }



})



console.log( regex.test('abcd') ) // 검사결과가 정규식에 맞으면 true, false
console.log( regex.test('abcd1234') )
console.log( regex.test('abcd1234$$') )

