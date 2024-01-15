import member from './member.js';

console.log('test');
console.log("이름 : "+member[0].이름+"님"); //옛 방식
console.log(`생일 :  ${member[0].생일}`); //최신 방식

console.log(`전공 : ${member[0].전공}`); //백틱

//tag 선언
let tag = '';

for(let i of member){
    let gender = (i.성별) ? '남자':'여자';
    let check = (i.임원) ? 'check':'';

    tag += `<div class="box ${check}"
        <p class="name">이름 : <span>${i.이름}</span></p>
        <p class="birth">생일 : <span>${i.생일}</span></p>
        <p class="master">전공 :  <span>${i.전공}</span></p>
        <p class="hoby">관심사 : <span>${i.관심사}</span></p>
        <p class="gender">성별 : <span> ${gender} </span></p>
        </div>
        <hr>`;
}

let member_box = document.querySelector('.member .wrap');

member_box.innerHTML = tag



