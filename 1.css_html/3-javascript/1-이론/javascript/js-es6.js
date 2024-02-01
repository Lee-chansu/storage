/*
  - 지난시간 : 객체 데이터 만들어서 html과 함께 출력
  - 객체 데이터 관한 문법 
  - 함수에 대한 것
  - 자바스크립트 최신 문법
*/

/*
  변수 : 값이 저장될 수 있는 메모리 공간 - 값 변경0
  상수 : 값이 저장될 수 있는 메모리 공간 - 값 변경 x
  - 이름0 : 심볼릭상수 - 변수선언과 비슷함
        ex) const 상수명 = 값;  
            상수명은 전부다 대문자로 짓는게 일반적, 
            단어의 의미가 구분할때는 _바로 구분짓는다
            ex) maxBattery  = 변수 - 카멜스타일
                MAX_BATTERY - 상수 - 
  - 이름x : 리터럴 상수 - 
*/

// 심볼릭 상수 : MAX_PRICE 
// 리터럴 상수 : 10000
const MAX_PRICE = 10000

let name = "홍길동"
let age = 30
let cute = true

// 1) key값과 value의 변수값이 같으면 생략가능, 1번만 써주면 됨
let person = {name,age,cute}
console.log(person)

let person2 = {
  name : '이몽룡',
  age : 20,
  cute :false
} 

// 2) distructuring
// 3) Rest distructuring

// 배열을 변수에 쪼개서 넣기
let array = [1, 2, 3, 4, 5]
let [a, b, c, ...etc] = array
// let a = array[0] , let b = array[1] , let c = array[2]
console.log(a)
console.log(b)
console.log(c)
console.log(etc)

let friut = ['apple','mango','cherry','orange','durian']
let [first, ...rest] = friut 
console.log(first)
console.log(rest)

// 객체값을 변수에 쪼개서 넣기
// let title = book.title , let author = book.author
// 주의사항 : 값을 저장하는 변수명 = 객체의 키값과 동일한 이름이어야 한다.
let book = {
  title : '해리포터',
  author : '조앤롤링k',
  price : 10000
}
let {title, author, price} = book

console.log(title)
console.log(author)
console.log(price)
// console.log(pay) // 일치하지 않으면 undefined 값 출력된다.

// 4) Spread
// 배열이나 객체의 값들을 개별적으로 추출하여 펼쳐낸다

let x = [1,2]
let y = [3,4]
let z = [5,6]
let result = [...x, ...y, ...z]
let result2 = [...x, 9, 0]

console.log(result)
console.log(result2)

// 5) Template Literal
console.log('제목 : ' + title + ' / 작가 : ' + author + ' / 금액 : ' + price)
console.log(`제목 : ${title} / 작가 : ${author} / 금액 : ${price}`)

// 6) 화살표함수
// 화살표 함수는 항상 익명함수다
// 자신의 this, arguments, super를 바인딩하지 않는다. 
// 자신만의 this를 생성하지 않고 자신을 포함하고 있는 context의 this를 이어받는다.

/* 기존
function 함수이름 (변수) {
  console.log(변수)
}
*/

let 함수명 = (매개변수) => {
  console.log(매개변수)
}

함수명(20)

// 객체에 함수를 포함시킬 수 있다. 
// 자바스크립트 객체(=오브젝트)만 가능,  json 파일형식에는 사용 불가
let music = {
  title : 'love 119',
  singer : 'riize',
  showInfo :  function() {
    console.log(this.title)
    console.log(this.singer)
  },
  showThis : function(){
    console.log("객체에서 this")
    console.log(this)
  },
  showThis2 : ()=>{
    console.log(this)
  }
}
// 객체명.메서드명()   -- 객체 안에 들어 있는 함수는 [메서드]라고 한다.
music.showInfo()

// this 는 어디서 쓰느냐에 따라서 가르키는 대상이 달라진다.

// 1) 전역 위치에서 사용하면 - window를 가리킨다
console.log("전역에서 this : " + this) // window

// 2) 함수 안에서 호출
function testFn(){
  console.log("함수에서 this : " + this) // window
}
testFn()

// 3) 객체 안에서 function() 사용하면, 현재 객체를 가리킨다
music.showThis() // 현재 객체의 전체 내용이 출력된다.
music.showThis2() // 화살표함수는 this에 현재 객체를 연결안함. 그래서 전역변수와 같이 window가 출력됨.

// 결론 : 객체안에서 함수는 화살표함수 사용을 안한다.