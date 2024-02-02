//함수 표현식
function 함수선언(매개변수) {
    console.log('함수선언')
}


//함수표현식
let 함수표현식1 = function (){
    console.log('함수표현식1')
}

//화살표함수 - Arrow Function (ES6에서 새롭게 도입된 문법)
let 함수표현식2 = () => {
    console.log('함수표현식2')
}

함수선언()
함수표현식1()
함수표현식2()

const arr = [1, 2, 3, 4, 5];
const newArr1 = arr.map(function(el) {
    return el + '반'//return 사용가능
})
console.log(newArr1) 
// const newArr2 = arr.map((el)=> el + '반')
// 중괄호와 return 생략

//forEach : 배열의 개수만큼 반복, return 없음
const newArr3 = arr.forEach(function(el) {
    console.log(el)
})

// const newArr4 = arr.forEach((el) => console.log(newArr3));

let square = (x) => x *x

//아래의 두 문장은 같은 결과 값을 내는 문장이다.
arr.map(square);
arr.map((x) => x * x);