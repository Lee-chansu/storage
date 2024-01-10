import member from './member.js'

// 자바스크립트 - 버전 - ES6 - 추가된 문법

console.log('test')
console.log("이름 : " + member[0].이름 + "님") // 옛날 방식

console.log(`생일 : ${member[0].생일}`) // 최신 방식
console.log(`전공 : ${member[0].전공}`) // 백틱

// 태그생성
let tag =''; 

// 문자 + 문자 = 이어붙이기
// a = a +10   -> a += 10

for(let i = 0; i < member.length; i++){
  tag += `<div class="box">
            <p class="name">이름 : <span> ${member[i].이름} </span> </p>
            <p class="birth">생년월일 : <span> ${member[i].생일} </span></p>
            <p class="전공">전공 : <span> ${member[i].전공} </span></p>
            <p class="hoby">관심사 : <span> ${member[i].관심사} </span></p>
        </div>`;
}

// 선택을 하고
let member_wrap = document.querySelector('.member .wrap');

member_wrap.innerHTML = tag