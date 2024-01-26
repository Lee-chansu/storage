// 4. 다형성
// 오버라이딩

const item1 = {name : '패딩', price : 330000}
const item2 = {name : '스웨터', price : 130000}
const item3 = {name : '양모부츠', price : 125000}

class User {
  constructor (email, birth){
    this.email = email
    this.birth = birth
  }
  buy(item){
    console.log(`${this.email} / ${ item.name } 구매 / ${item.price}원`)
  }
}

class VipUser extends User{
  constructor (email, birth, point){
    super(email, birth) 
    this.point = point 
  }
  // 오버라이딩 :상속 관계에서 메서드 이름이 같은데, 기능을 재정의해서 사용하는 것
  buy(item){
    let price = item.price*(1-0.05)
    console.log(`${this.email} / ${ item.name }/ 구매액 :  ${price}원`)
  }
}

let u1 = new User('a111@naver.com', '1992-02-07')
let u2 = new User('a222@naver.com', '1992-02-07')
let u3 = new User('a333@naver.com', '1992-02-07')

let vu1 = new VipUser('d444@naver.com', '1994-01-08')
let vu2 = new VipUser('d555@naver.com', '1994-01-08')
let vu3 = new VipUser('d666@naver.com', '1994-01-08')

const user_list = [u1, u2, u3,  vu1, vu2, vu3]

// forEach(el, i, arr)  - 배열의 각 요소를 돌면서 반복
// 매개변수-  (요소, 인덱스, 전체)  

user_list.forEach( (el)=>{
  el.buy(item1)
} );

