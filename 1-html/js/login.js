//포커스 위치 : focus
//포커스 벗어남 : blur

//.boxColor에 포커스가 위차하면 해당 요소에 check 클래스 추가
//              포커스 벗어나면 check 클래스 제거

//이벤트 리스너, this, classList 활용하여 코드 작성.

let userInfo = {
    id : 'naver',
    pw : 'a1!'
}

let boxColor = document.querySelectorAll('.boxColor');
let inputBox = document.querySelectorAll('.inputBox');

let userId = document.getElementById("id");
let userPw = document.getElementById("pw");
let loginBtn = document.getElementById("loginBtn");

let errorMessage = document.querySelector(".errorMessage");

for(let i = 0; i < inputBox.length; i++){
    inputBox[i].addEventListener('focus', function(){
        boxColor[i].classList.add('check')
    })
    inputBox[i].addEventListener('blur', function(){
        boxColor[i].classList.remove('check')
    })
}

//forEach는 배열의 갯수만큼 한개씩 반복해서 적용
// inputBox.forEach(function(el, idx){
//     el.addEventListener('focus', function(){
//         boxColor[idx].classList.add('check')
//     })
//     el.addEventListener('blur', function(){
    //         boxColor[idx].classList.remove('check')
//     })
// });

let regex = /(?=.*[a-z])(?=.*[\d])(?=.*[@#$%^&*!?])[a-z\d@#$%^&*!?]+/

loginBtn.addEventListener('click', ()=>{
    let idValue = userId.value;
    let pwValue = userPw.value;
    // let regex = /(?=.*[a-z])(?=.*[\d])(?=.*[!@#$%^&*()?])/
    
    if(idValue == '' && pwValue == ''){
        errorMessage.classList.remove('blind')
        errorMessage.innerHTML = "ID와 패스워드를 입력해주세요."
    }
    else if(idValue == ''){
        errorMessage.classList.remove('blind')
        errorMessage.innerHTML = "ID를 입력해주세요."
    }
    else if(pwValue == ''){
        errorMessage.classList.remove('blind')
        errorMessage.innerHTML = "패스워드를 입력해주세요."
    }
    else if(idValue.length < 4 || idValue.length > 12){
        errorMessage.innerHTML= "아이디는 4~12글자입니다."
    }
    else if(!regex.test( pwValue)){
        errorMessage.innerHTML= "패스워드가 형식에 맞지 않습니다."
    }
    else{
        if(idValue == userInfo.id && pwValue == userInfo.pw){
            errorMessage.innerHTML = ""
            alert('로그인 성공')
        } else{
            errorMessage.innerText = "아이디 혹은 패스워드를 다시 확인해주세요."
        }
    }

})