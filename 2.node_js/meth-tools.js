//export하여 모듈화 시키는 방법

// 모듈
function add(a, b) {
    return a + b
}
function minus(a, b) {
    return a - b
}
function gob(a, b) {
    return a * b
}
function nanum(a, b) {
    return a / b
}

function namuji(a, b) {
    return a % b
}

// exports 방법1 = 메서드에 exports를 써서 개별로 보내주는 방법
// 이 때는 let이나 const 사용하지 않아도 됨.
// exports.PI = 3.14;
// exprots.add = function (a,b) {return a + b}




const PI = 3.14;
let academy = "Korea IT";

let test = {
    date : '2020-09-20',
    type : ['safetyTest', 'performaceTest'],
    printTypes(){
        for(let i in this.type){//향상된 for문
            console.log(this.type[i])
        }
    }
}

// 여러개의 함수를 export할 때 사용하면 좋다.
// 외부에 쓸 수 있도록 공개
// 즉, 공개하고 싶지 않다면 만들어두고 export 객체에서 제외시켜도 된다.


// exports 방법2 = 객체로 묶은 뒤 보내기
module.exports = {
    add,
    minus,
    gob,
    nanum,
    namuji,
    // PI, -- 외부 공개 X
    test
}

// let calc = {
//     add,
//     minus,
//     gob,
//     nanum,
//     namuji,
//     // PI, -- 외부 공개 X
//     test
// }

// module.exports = 객체명 {key : value};
// module.exports = calc;