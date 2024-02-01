//Factory Function 방식


function makeCar(color, speed){
    car = {
        color,
        speed
    }
    return car
}

let car1 = makeCar('red', 300)
car1.run()


class createCar {
    //생성자
    constructor (color, speed) {
        this.color = color;
        this.speed = speed;
    }
    
    //메서드
    run(){
        console.log(`${this.color} / ${this.speed}`)
    }
}
let car2 = new createCar('blue', 300);
car2.run()
