// 1. 추상화 - 설계

//어떤 객체를 만들기 위해서 이름을 정하고, 설명을 붙이고, 정의내리고 하는 것들
//프로그램 내에서 사용할 용도에 맞게 적절하게 설계 과정
// 객체를 사용하는 사람이 객체 내부에 존재하는 복잡한 원리를 모르더라도,
//외부에 공개된 프로퍼티, 메소드만을 가지고 객체를 문제없이 잘 사용
//할 수 있도록 해야 한다.
//프로퍼티, 메서드 이름을 이해하기 쉽게 지어야 한다.
//그래서 내용을 문서화하여 공개하기도 한다. 객체가 모인 라이브러리나 프레임워크의 사용법 같은 것들.

/*
    [현대 자동차]에서 신규 [경차] [캐스퍼]를 출시하였다.
    [가격]은 1500만원대로 형성될 예정이고, [색상]은 카키, 블랙, 화이트로 출시된다.
*/


//자동차 객체 만들기

// -----자동차 info-----
// 제조사 : company
// 차 타입 : type
// 모델 : model
// 가격 : price
// 색상 : color

// --------자동차 기능---------
//자동차 시동걸기 : start()
//자동차 시동 끄기 : stop()


class Car2 {
    constructor(company, type, model, price, color){
        this.company = company;
        this.type = type;
        this.model = model;
        this.price = price;
        this.color = color;
    }
    start(){}
    stop(){}
    info(){
        console.log(`${this.model}`)
    }
}

//-------------------------------------------------------------------------------

//캡슐화 
// - 변수 값에 접근을 함부로 하지 못하도록 제한을 두는 것.
// - 필요에 따라 값을 검사하는 로직


//클래스 문법
//email 변수를 읽고 쓸 수 있는 get 메서드 / set 메서드 만듦
//그러나 보호가 안되고, 값 접근 가능함 
//-Why? 근본적으로 자바스크립트는 값을감출 수 있는 기능을 지원X
//
class User{
    
    constructor(email, birth){
        let _email = email;
        this.birth = birth;
    }

    info(){
        console.log(`${this.email} / ${this.birth}`)
    }

    get email(){
        return this._email //_변수명 = 감춰진 값이라는 의미
    }

    set email(address){
        if(address.includes('@')){
        this._email = address;
        }else{
            //예외처리 - 에러를 발생시켜서 이메일 형식에 맞지 않음을 알려주는 메서드
            throw new Error('이메일 형식 아니야!')
        }
    }
    
}

//값을 완전히 감추는 방법
// createUser 함수를 만들고
//_email 지역변수로 선언
//Factory 방식으로 객체를 생성할 수 있도록 함수 만든다. 


//클로저
//자바스크립트에서 어떤 함수와 그 함수가 참조할 수 있는 값들로
//이루어진 환경을 하나로 묶은 것.
function createUser(email, birthdate) {

    //원래는 지역변수이기 때문에 createUser 함수가 호출되었다가
    //사라지면 같이 소멸된다. = 값을 사용x
    //get email() 함수가 _new_email을 참조하고 있음
    //클로저 환경에서는 _new_email값이 소멸되지 않고 계속 유지하고 있다.
    let _new_email = email;

    const user = {
    birthdate,

    get email() {
        return  _new_email;
    },

    set email(address) {
        if (address.includes('@')) {
        _email = address;
        } else {
        throw new Error('invalid email address');
        }
    },
    };

    return user;
}

const user11 = createUser('chris123@google.com', '19920321');
const user22 = createUser('abc@google.com', '19920321');
console.log('user11.email:'+user11.email);
console.log('user22.email:'+user22.email);
//get 함수 호출해서 _new_email 값을 가져옴.

console.log(user11._new_email) //직접 new_email값에 접근하려고 하면 undefined가 출력.



let user1 = new User('abc@naver.com', '94-08-12')
user1.info();


user1._email = 'newabc'
console.log(user1.email);
