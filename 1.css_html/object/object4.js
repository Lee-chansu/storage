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
//다른 종류의 객체에 있는 동일한 이름의 메소드를 간결하게 호출할 수 있다.
user_list.forEach( (el)=>{
    el.buy(item1)
} );


/*
객체 지향 프로그램의 특징 4개
---찬수`s
1) 추상화 : 객체의 이름을 짓고 객체의 설명을 다른 사람들도 한눈에 알기 쉽게 정리하는 과정
2) 캡슐화 : 객체의 정보를 감추고 외부에서 접근 및 변형하는 것을 막기 위해 변형하는 것 (get-set 메서드를 활용하는 방법이 대표적)
3) 상속 : 각 함수 중에 공통적으로 가지는 함수를 부모함수로 묶은 뒤 자식 객체에 할당하는 과정. 자식 객체는 extend를 통해 부모의 요소를 생성자로 가져올 수 있다.
4) 다형성 : 공통된 부분이 있는 요소들에 한해서 다양한 요소로 변할 수 있는 특성이다.

1) 추상화 
- 객체를 만들기 위해서 설계, 변수/ 메서드들을 정의하는 것. 이름 잘 지어야 함.
- 관련된 내용이나 기능에 맞게 잘 정의해야 한다.

객체 -> 라이브러리 / 프레임 워크에서 메서드 변수 등의 내용을 많이 사용하게 된다.
관련된 이름으로 정의를 해야 내가 잘 사용할 수 있는 것처럼...

나도 객체를 설계할 때 다른 사람이 이용하기 쉽게 직관적이고 쉬운 이름을 정의해야 한다.

이름 : a, b, c 이렇게 정의하면 x
aaa() bbb() 이렇게 정의x


2) 캡슐화
- 정보 은닉(외부에서 함부로 접근하지 못하게끔)
- 클래스 선언에서 get과 set 메서드를 정의해도 은닉x
- 자바스크립트에서 정보의 접근 제한을 막는 키워드 없음
- 그래서 우회적인 방법을 사용 -> 클러저라는 특징을 이용해서 정보은닉이 되는 것처럼 설계한다.

(1) 팩토리 함수로 만든다.
(2) 상단에 은닉한 변수를 만들고 (관례적으로 변수명 앞에 _ 붙인다.)
(3) 객체를 선언한다.

function creatUser(username, age){
    //은닉 하고 싶은 것은 여기에
    let _name = name

    const user = {
        //은닉x 할 거면 여기에
        let age = age,
        info(){
            console.log()
        }

        //은닉할 변수에 대한 get/set 메서드 생성
        get name (){
            return this._name
        }

        set name(name){
            this._name = name
        }

    }
}
3) 상속

- 부모의 변수와 메서드를 모두 물려받아서 사용할 수 있음

class 자식 클래스 extends 부모클래스 {
    constructor(매개변수1, 매개변수2) {
        super(매개변수1, 매개변수2)
    }
    
    - 오버라이딩 : 부모의 메서드를 상속받은 뒤 재정의해서 사용.
    buy(item){
        super.buy(item)
        this.point += item.price * 0.1
        console.log(this.point)
    }
}

4) 다형성
- 한 객체가 다양한 객체의 종류를 담을 수 있는 것.
- 다른 종류의 객체라도 동일한 이름의 메소드를 간결하게 호출할 수 있다.
- 메서드 이름이 같으면 호출이 가능.
*/