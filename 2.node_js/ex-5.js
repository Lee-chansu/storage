// 동기 vs 비동기


/*
    Node.js는 비동기 처리를 많이 사용한다??
    
    동기(Synchoronous)
    - 한번에 한 가지 작업, 이전 작업이 끝나야 다음 작업으로 끝난다.
    - 요청을 보낸 다음에, 요청을 보낸 응답을 받아야만 다음 작업을 실행한다.

    
    비동기(Asynchoronous)
    - 앞의 동작이 끝나지 않았어도, 다음의 동작을 실행한다.
    - 비동기는 요청을 보낸 후, 응답에 상관없이 다음 동작 실행
    
    A : 5초, B : 200초 / C : 50초
    - 동기 : 255초
    - 비동기 : 200초
*/


// console.log('one')
// setTimeout(()=>{console.log('two')}, 3000) //지연시간을 받아서 몇 초후 실행한다.
// console.log('three');

//동기처리였다면? one -> 2초 -> two -> three
//비동기 -> one, three가 먼저 실행되고 3후에 two가 실행이 된다.

//파일 읽기 - 동기 처리 -readFileSync
// console.log(1)
// let result1 = fs.readFileSync('./new.txt', 'utf8');
// console.log(result1)
// console.log(3)

//비동기 처리
console.log('-----------------')
console.log(1)
//콜백함수 : 먼저 실행해야할 것을 실행한 후에 실행되는 함수
//비동기 함수 - 콜백함수의 반환값을 인자로 받는다.
//비동기처리에서는 콜백함수 사용이 많아진다. - 선행처리 될 내용 다음에, 처리할 내용을 콜백함수에 써준다.

fs.readFile('./new.txt', 'utf8', (err, result)=>{
    console.log(result)
})
console.log(3)