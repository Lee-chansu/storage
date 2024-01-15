// 객체 - 책정보
// book 객체의 title, author, price 정보가 들어있고
// showInfo 메서드를 만들 수 있다.
// - 객체의 정보를 출력하는 역할

/*
    객체명 : book
    id : 숫자 일련번호
    title : 책제목 

*/

let book = {
    id : 12,
    title : "html의 모든것",
    author : "it코리아",
    price : 39900,
    event : true,
    showInfo : function() {
        console.log(this)
    },
}

book.showInfo();

//객체 해체하기 - destructuring
// 키 값과 동일한 변수에 값을 할당하시오.

let {id, title, author, price, event} = book;


//아이디가 callBookInfo 버튼을 클릭하면 book 객체 정보해체한 변수의 정보들이
//콘솔창에 출력되도록 하시오.
//1) addEventListener - 화살표 함수 사용,
//2) 출력할 때, Eo Template Literal 방식을 사용하여 출력하시오.


let callBookInfo = document.getElementById("callBookInfo");

let tag = '';

callBookInfo.addEventListener("click", () => {
    
        let isEvent = (book.event) ? '40% 할인 중' : '적용대상X';
        tag += `
        <li><span>책 제목 : </span><span>${title}</span></li>
        <li><span>작가 : </span><span>${author}</span></li>
        <li><span>책 가격 : </span><span>${price}</span></li>
        <li><span>이벤트 : </span><span>${isEvent}</span></li>
        `
    let bookInfo = document.querySelector("#bookInfo");
    bookInfo.innerHTML = tag;
});


