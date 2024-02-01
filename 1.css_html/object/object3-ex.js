//상속

class User{
    constructor(email, birth){
        this.email = email;
        this.birth = birth;
    }
    info(){
        console.log(`${this.email} / ${this.birth}`)
    }
}

//자식클래스 - 추가된 변수, 기능을 정의
class VipUser extends User{
    constructor(email, birth, point){
        super(email, birth) 
        //자식생성자-부모 생성자를 호출하여 / 부모생성자가 필ㅇ한 매개변수에 값을 전달
        this.point = point
    }

    info(){
        console.log(`${this.email} / ${this.birth} / ${this.point}`)
    }
}

const pUser1 = new VipUser("abc@naver.com", "1991-03-02", "VIP")

console.log(pUser1.email)
console.log(pUser1.birth)
console.log(pUser1.point)