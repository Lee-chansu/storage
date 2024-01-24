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

class VipUser extends User{
    constructor(email, birth, point){
        super(email, birth) 
        //부모 생성자를 호출하여 값 설정
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