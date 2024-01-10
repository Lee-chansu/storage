import member from './member.js';

console.log('test');
console.log("이름 : "+member[0].이름+"님"); //옛 방식
console.log(`생일 :  ${member[0].생일}`); //최신 방식

console.log(`전공 : ${member[0].전공}`); //백틱

//tag 선언
let tag = '';

for(let i of member){
    tag += `<div class="box"
        <p class="name">이름 : <span>${i.이름}</span></p>
        <p class="birth">생일 : <span>${i.생일}</span></p>
        <p class="master">전공 :  <span>${i.전공}</span></p>
        <p class="hoby">관심사 : <span>${i.관심사}</span></p>
        </div>
        <hr>`;
}

let member_box = document.querySelector('.member .wrap');

member_box.innerHTML = tag
