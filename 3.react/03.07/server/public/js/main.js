
let form = document.getElementById('form')
let btnSubmit = document.querySelector('.btn-ok')
let userName = document.querySelector('#user-name')
let userPw = document.querySelector('#user-pw')
let errorMessage = document.querySelector(".error");
let regex = /(?=.*[a-z])(?=.*[\d])(?=.*[@#$%^&*!?])[a-z\d@#$%^&*!?]+/


form.addEventListener('submit', function(event){

  event.preventDefault() 

  let userNameValue = userName.value
  let userPwValue = userPw.value

  console.log(userNameValue)
  console.log(userPwValue)

    // 내용이 비어 있는지 확인
  if( userNameValue == "" && userPwValue == ""){
    errorMessage.innerHTML = "ID와  패스워드를 입력해주세요."

  } else if( userNameValue == ""){
    errorMessage.innerHTML = "ID를 입력해주세요."

  } else if( userPwValue == ""){
    errorMessage.innerHTML = "패스워드를 입력해주세요."

  } else if( userNameValue.length < 4 || userNameValue.length > 12){
    errorMessage.innerHTML = "아이디는 4~12글자 입니다."

  } else if( !regex.test( userPwValue ) ){
    errorMessage.innerHTML = "비밀번호는 형식이 맞지 않습니다."

  } else {
    this.submit() // 내용이 비어 있지 않으면 폼 제출
  }

})
