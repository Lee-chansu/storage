//require: 함수가 리턴하는 객체를 가져다 쓸 수 있도록 변수에 대입
//export한 파일로부터 require로 받아 사용할 수 있다.

//require함수가 리턴하는 객체를 가져다 쓸 수 있도록 변수에 대입
/*
    1) .js만 가능
    2) 경로 정확하게 적을 것

    3) require 함수가 리턴하는 객체는 상수(변하지 않는 값)으로 대입하는게 제일 좋음
    - 개발자가 나중에 객체의 값을 변경하면 X
    - 
*/
const calc = require('./meth-tools-2.js'); //모듈을 가져오겠다. <- 호출부

calc.test.add(1,2);

calc.test.printTypes();