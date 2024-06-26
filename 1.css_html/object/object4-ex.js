class BankAccount {
    constructor(name, money) {
    this.name = name;
    this.balance = money;
    }
    //잔액 조회
    get balance() {
    return this._balance;
    }

    // 잔액 검사
    set balance(money) {
    if (money >= 0) {
        this._balance = money;
    } else {
        console.log('Not valid');
    }
    }

    // 입금하기
    deposit(money) {
    this.balance += money;
    }

    //출금하기
    withdraw(money) {
    if (this.balance - money < 0) {
        console.log('Insufficient balance');
    } else {
        this.balance -= money;
    }
    }

    //이체하기
    transfer(money, anotherAccount) {
    const account = anotherAccount;
    if (this.balance - money < 0) {
        console.log('Insufficient balance');
    } else {
        this.balance -= money;
        account.balance += money;
    }
    }
}

  //1달에 1번 잔액에 일정 이자를 더해주는 '저축계좌'
class SavingsAccount extends BankAccount {
    // 여기에 코드를 작성하세요
    // year 프로퍼티 : 해당 계좌에 보유기간을 저장, 기본값 0
    // addInterest 메서드 : 해당 계좌의 잔액에 매년 이자를 더해주는 메서드
    //매개변수(rate)를 받음
    //잔액에 잔액 * ((비율 * 보유기간) +1) = 다시 잔액에 더해주기

    constructor(name, money, year){
    super(name, money)
    this.year = year;
    }

    addInterest(rate){
      this.balance *= (1+(rate * this.year))
    }

    transfer(money, anotherAccount){
        super.transfer(money, anotherAccount);
        this.balance -= money * 0.05;
    }

}

  //기부할 목적으로 사용하는 '기부계좌'
class DonationAccount extends BankAccount {
    // 여기에 코드를 작성하세요
    // rate 프로퍼티 : 계좌 잔액의 정해진 비율(rate)만큼 기부금액으로 계산한다.
    //donate 메서드 : 매년 계좌 잔액의 일정 금액을 자동으로 기부하는 동작을 만든다.
    // 잔액 = 잔액 * (1-비율)
    
    constructor(name, money, rate){
    super(name, money)
    this.rate = rate;
    }

    donate(rate){
      this._balance *= (1-rate);
    }
}

const ba1 = new BankAccount('Tom', 2000);
const sa1 = new SavingsAccount('Jerry', 500);
const da1 = new DonationAccount('Kate', 3000);
const sa2 = new SavingsAccount('Alice', 9000);

const accountForVacation = new BankAccount('Vacation', 0);

// forEach를 통해서 모든 계좌에서 여행적금 계좌로 500원씩 이체
//모든 계좌의 잔액을 출력.

const user_list = [ba1, sa1, da1, sa2];

user_list.forEach((el) => {
    el.transfer(500, accountForVacation)
    console.log(`이름 : ${el.name} / 잔액: ${el._balance}`);
});
console.log('여행적금 이만큼 모았어:'+accountForVacation._balance);


// ba1.transfer(800, accountForVacation);
// sa1.give(800, accountForVacation);
// da1.send(800, accountForVacation);
// sa2.give(800, accountForVacation);

// console.log(ba1.balance);
// console.log(sa1.balance);
// console.log(da1.balance);
// console.log(sa2.balance);
// console.log(accountForVacation.balance);