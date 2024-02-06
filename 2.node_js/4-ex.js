console.log('start')

fetch('https://jsonplaceholder.typicode.com/users/1')
  .then( res => res.text() ) 
  .then( result => console.log(JSON.parse(result).name) )

console.log('end')

console.log('AAA')
// 1번만 실행된다.(일회성)
setTimeout(() => console.log('BBB'), 1000); //콜백함수 등록, 콜백함수는 1초 뒤에 실행.
console.log('CCC')

// // 무한 반복도전
let num = 0;
setInterval(()=>{(num<10)?console.log(num++):500}, 500);

/*
1) console.log('start')
2) fetch 함수(request 보내기 및 콜백 등록)
3) response가 오면 2.에서 then 메소드로 등록해뒀던 콜백 실행
4) console.log('end')
*/

//setTimeout(콜백함수, 1회성) : 

// fetch 함수는 비동기 함수 중에 하나다.

// 다른 비동기 함수들

