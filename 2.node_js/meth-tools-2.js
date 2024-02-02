
exports.PI = 3.14;
exports.academy = "Korea IT";

exports.test = {

    add : (a,b)=> a + b,
    minus : (a,b) => a-b,
    /*
    - 본래 해야하는 문법    >     multiply : function(a,b) {return a*b},
    - 화살표 함수로 전환    >     multiply : (a,b) => {return a*b},
    - 중괄호와 return 생략 가능 > multiply : (a,b) =>  a * b, 
    
    (실행할 문장이 1개이면 중괄호 생략 가능)
    ex)
    함수명 : () => {console.log(a)}
    함수명 : () => console.log(a)


    (return문 1개이면 return 생략 가능)
    ex)
    함수명 : () => {return a + b}
    함수명 : () => {a+b}

    */
    multiply : (a,b) => a*b,

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