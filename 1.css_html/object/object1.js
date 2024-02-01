//---------------객체 만드는 방법--------------

//1. 리터럴
// key = 프로퍼티(value)

let user_literal = {
    id : 'abc',
    pw : 123
}

const item = { 
    name : '패딩', 
    price : 330000
}

let user =  {
    buy : function(item){
        console.log(`${this.id} / ${item.name} 구입`)
    }
}

//.2 Factory Function : 공장처럼 객체를 찍어내는 것.
// 매개변수로 값을 설정하고, 생성된 객체를 return한다.
// ** 키값과 value값이 같다면 한번만 쓸 수 있다.
function creatUser(id,pw){
    let user = {
       id, // id : id, 축약 가능
       pw // pw : pw,
    }
    return user
}

let user01 = creatUser('abc',123);
let user02 = creatUser('def',456);
let user03 = creatUser('ghi',789);

user01.buy(item);
user02.buy(item);
user03.buy(item);


//3.  Consturctor function (생성자 함수)
// - 함수이름에 - 앞글자 대문자로 시작해야 한다.
// - ** new 키워드를 통해서 생성
// - this 키워드를 사용해 생성될 객체의 프로퍼티와 메서드 설정한다.
function User(id, pw){
    this.id = id,
    this.pw = pw,
    this.buy = function(item){
        console.log(`${this.id} / ${item.name} 구입`)
    }
}

let user04 = new User('user04', '135');
let user05 = new User('user05', '246');

user04.buy(item)
user05.buy(item)

//4. class 키워드 사용하기 (function이란 키워드 사용X)
// 프로퍼티(키) : 생성자 안에서 만든다. this 키워드 붙임
// 메서드 : 생성자 밖에서 만든다.

class Person{
    //생성자
    constructor(name, age, gender){
        this.name = name,
        this.age = age,
        this.gender = gender
    }
    //메서드
    buy(item){
        console.log(`${this.name} / ${item.name} 구입`)
    }
}

let p1 = new Person('홍길동', 30, '남자')

p1.buy(item)

