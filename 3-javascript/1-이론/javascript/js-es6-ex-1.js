
/* 책정보를 저장하는 객체를 생성하시오.

객체명 : book  
id : 숫자 일련번호
title :  책제목-문자열
author : 작가이름 - 문자열
price : 책가격- 숫자
event : true / 현재 이벤트 진행 품목여부
showInfo 메서드, 만든다. 객체의 정보를 출력하는 역할

*/

let book = {
  id : 12,
  title : '해리포터',
  author : '조앤롤링k',
  price : 10000,
  eventItem : true, 
  showInfo : function(){
    console.log(this)
  }
}

book.showInfo()


// 아이디가 callBookInfo 버튼을 클릭하면 
// book 객체를 해체한 변수의 값을 가지고  
// 콘솔창에 출력되도록 하시오.

// 1) addEventListener - 화살표 함수 사용,  
// 2) 출력할 때 Template Literal 방식을 사용하여 출력하시오.
// 3) 이벤트 진행 책이면 - 10% 할인 진행중 -- 이라고 출력하시오.
// 4) 객체를 매개변수로 받아서, 함수 안에서 객체를 변수에 해체해서 사용하시오.

let bookInfo = document.getElementById('bookInfo')
let callBookInfo = document.getElementById('callBookInfo')

callBookInfo.addEventListener('click', ()=>{
  
  // book 객체 해체하기 - distructuring
  // 키값과 동일한 변수에 값을 할당하시오.
  let {id, title, author, price, eventItem} = book
  let eventTxt = (eventItem) ? "10% 할인 진행중" : ""

  let tag = `
  <li><span>제목 : </span><span>${title}</span></li>
  <li><span>작가 : </span><span>${author}</span></li>
  <li><span>가격 : </span><span>${price}</span></li>
  <li><span>이벤트 : </span><span>${eventTxt}</span></li>
  `
  bookInfo.innerHTML = tag

})

