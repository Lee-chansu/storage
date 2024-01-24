const item1 = {name : '패딩', price : 30000}
const item2 = {name : '양말', price : 5000}
const item3 = {name : '블레이저', price : 45000}

class User{
    constructor(email, birth){
        this.email = email;
        this.birth = birth;
    }
    buy(item){
        console.log(`${this.email} / ${item.name} / ${item.price}원 구매`)
    }
}

//자식클래스 - 추가된 변수, 기능을 정의
class VipUser extends User{
    constructor(email, birth, point){
        super(email, birth) 
        //자식생성자-부모 생성자를 호출하여 / 부모생성자가 필ㅇ한 매개변수에 값을 전달
        this.point = point
    }
    buy(item){
        let price = item.price*(1-0.05)
        console.log(`${this.email} / ${item.name} / 구매액 : ${price}원`)
    }
}


let u1 = new User("abc@naver.com", "1991-03-02")
let u2 = new User("abc@naver.com", "1991-03-02")
let u3 = new User("abc@naver.com", "1991-03-02")
let vu1 = new VipUser("abc@google.com", "1992.03.01")
let vu2 = new VipUser("abc@google.com", "1992.03.01")
let vu3 = new VipUser("abc@google.com", "1992.03.01")

const user_list = [u1, u2, vu1, u3, vu2, vu3];
// forEach(el, i, arr) 배열의 각 요소를 돌면서 반복
//매개변수 (요소, 인덱스, 전체) (el, i, arr)
//다형성 = 다양한 객체의 종류를 가리킬 수 있는 것 (현재코드에서 el에 해당됨)
//다른 종류의 객체에 있는 동일한 이름의 메소드를 간경할게 호출할 수 있다.
user_list.forEach( (el)=>{
    el.buy(item1)
} );


/*
객체 지향 프로그램의 특징 4개
1) 추상화 : 객체의 이름을 짓고 객체의 설명을 다른 사람들도 한눈에 알기 쉽게 정리하는 과정
2) 캡슐화 : 
3) 상속 : 
4) 추상화 : 

*/