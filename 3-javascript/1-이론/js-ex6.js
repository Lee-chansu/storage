/*
    - 객체 데이터 만들어서 HTML과 함께 출력
    - 객체 데이터 관한 문법
    - 함수에 대한 것
    - 자바스크립트 최신 문법
*/

//리터럴

/*
    변수 : 값이 저장될 수 있는 메모리 공간 - 값 변경0
  상수 : 값이 저장될 수 있는 메모리 공간 - 값 변경 x
  - 이름 0 : 변수선언과 비슷함
        ex) const 상수명 = 값;  
            상수명은 전부다 대문자로 짓는게 일반적, 
            단어의 의미가 구분할때는 _바로 구분짓는다
            ex) maxBattery  = 변수 - 카멜스타일
                MAX_BATTERY - 상수 -
*/

// 심볼릭 상수 : Max_PRICE
// 리터럴 상수 : 10000
const Max_PRICE = 10000;

let name = '홍길동';
let age = 30;
let cute = true;

// 1) key값과 value값이 같다면 한번만 써도 된다. (생략 가능)
let person = {name, age, cute}
console.log(person);

let person2 = {
    name : '이몽룡',
    age : 20,
    cute : false
}

// 2) distructuring
// 3) Rest distructring
//주의사항 : 값을 저장하는 변수명 = 객체의 키값과 동일한 이름이어야 오류가 나지 않는다.

let array = [1,2,3];

let [a, b, c, ...etc] = array;
// let a = array[0], let b = array[1], let c = array[2]

console.log(a);
console.log(b);
console.log(c);
console.log(etc);

//4) Spread
//배열이나 객체를 개별적으로 추출하여 펼쳐낸다.

let x = [1,2];
let y = [3,4];
let z = [5,6];
let result = [...x, ...y,...z];
let result2 = [...x, ,9,0];

console.log(result);
console.log(result2);

let book = {
    title : '해리포터',
    author : '조앤롤링k',
    price : 10000
}

console.log(book.title);

/*
...변수 : 
변수 선언 시 '='를 기준으로
※왼쪽에 있을 경우 == 선언된 변수들을 제외하고 나머지 변수들을 모아둔다.
ex) let furit = ['apple'.'mango','orange'];
let [first, ...etc] = fruit
...etc = ['mango','orange']

※오른쪽에 있을 경우 == 배열안의 배열이 있을 경우 모두 끄집어 낸 다음 하나의 배열에 담아둔다.
ex) let x = [1,2];
let y = [3,4];
let z = [5,6];
let result = [...x, ...y,...z];

result == [1,2,3,4,5,6];
*/

//5) Template Literal

//6) 화살표 함수
// 화살표 함수는 항상 익명함수다, 자신의 this, arguments, super를 바인딩하지 않는다.
//자신만의 this를 생성하지 않고 자신을 포함하고 있는 context의 this를 이어받는다.

// function 함수이름 (변수){
//     console.log(변수);
// }

let 함수명 = (매개변수)=>{
    console.log(매개변수)
}

함수명(20);

let music = {
    title : 'love 119',
    singer : 'riilize',
    showInfo : () => {
        console.log(this.title);
        console.log(this.singer);
    },
    showThis : function(){
        console.log("객체에서 this : "),
        console.log(this)
    },
    showThis2 : ()=>{
        console.log(this)
    }
}

//객체명.메서드명() -- 객체 안에 들어있는 함수는 [메서드]라고 한다.
music.showInfo();

//this : 어디서 쓰느냐에 따라서 가르키는 대상이 달라진다.
// 1) 전역 위치에서 사용하면 Window를 가리킨다.
console.log("전역에서 this : "+this);//window

// 2) 함수 안에서 호출
function testFn(){
    console.log("함수에서 this : " + this)//window
}
testFn();

// 3) 객체 안에서 function() 안에서 사용되면 현재 객체를 가리킨다.
music.showThis(); //music
// 화살표 함수는 this에 현재 객체를 연결X, 그래서 전역변수와 같이 window가 출력됨.
music.showThis2(); //window

// 결론 => 화살표 함수 안에서는 this를 사용하지 않는다.