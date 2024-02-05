// const 변수 = require(mysql);    //값이 존재하는 메모리 상의 주소값
// const {변수} = require(mysql);

let x = []; //배열
let y = {}; //객체

let names = '홍길동';
let age = 30;

let person = {names, age};

(변수1, 변수2) =>{};

console.log (person.names);
console.log (person.age);

let student = {
    name : '이순신',
    id : 20240001,
    grade : 3,
    address : '서울',
    contact : '010-1111-2222',

    showInfo : () => {
        return this.grade
    }
}

let {name, id, grade, address, contact} = student;
console.log(name, id, grade, address, contact);

console.log(student.name); //객체명.변수명
console.log(student['contact']); //객체명['변수명']
student.showInfo() // 객체명.메서드명()
grade = student.showInfo() // 객체명.메서드명()
console.log(grade) // 객체명.메서드명()

//배열
//destructuring
//Rest destructuring
let 과목 = ['수학','영어','과학','사회'];
let [전공, ... 나머지과목] = 과목;
console.log(전공);
console.log(나머지과목);

//Spread
let 전공과목 = ['수학','과학'];
let 교양과목 = ['철학', '심리','미술'];
let 이수과목 = [...전공과목, ...교양과목];
console.log('이수과목:' + 이수과목);

//destructuring
let [전공1, 전공2] = 전공과목; 

//Rest destructuring
let [교양, ...나머지] = ['철학', '심리','미술'];

//Spread    
let 이수과목2 = [...전공, ...교양];
console.log(이수과목2);

//중고서점 목록
//전체 중고서점의 목록을 반복문을 이용하여 출력하시오.

let 기존중고서점 = ['이수점', '사당점', '강남점'];
let 신규중고서점 = ['부평점', '신도림점'];
let 전체중고서점 = [...기존중고서점, ...신규중고서점];

// for(let i of 전체중고서점){
//     console.log(i)
// }


//foreach 기본 활용방법
//element : 값
//index : 해당 값의 배열 번호
//array : 배열 전체
//매개변수는 필요한 만큼만 쓰면 된다. 단, 순서는 지켜야한다.

전체중고서점.forEach((element, index, array) => {
    console.log(element, index, array)
})