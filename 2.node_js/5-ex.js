// promise 객체란 무엇인가?

/*
    작업에 관한 상태정보를 가지고 있는 객체

*/

// 작업이 성공할 수도 있고, 실패할 수도 있는데, 그 정보를 객체에 포함해서 리턴한다.

/*
    pending : 진행 중
    fulfilled : 성공
    rejected : 실패
*/

fetch('https://jsonplaceholder.typicode.com/users/1')
  .then( res => res.text() ) 
  .then( result => console.log(JSON.parse(result).name) )

//fetch함수의 리턴되는 결과 : promise 객체.
//promise 메서드 중에 then 메서드가 있다.
// then 메서드는 pending 상태에서 fulfilled 상태가 될 때 -> 실행할 콜백함수를 등록한다.
// fulfilled 상태는? response가 정상적으로 처리 되었을 때 상태
// fetch의 결과값을 then 콜백함수의 매개변수에 담아온다.

fetch('https://jsonplaceholder.typicode.com/users')
  .then( res => res.text() ) //then메서드도 promise 객체를 리턴.
  .then( result => {
    const user = JSON.parse(result)
    return user[0] //promise 객체
  })
  .then((user) => {
    console.log(user) //promise 객체
    const {address} = user
    return address
  })
  .then((address)=>{
    console.log(address) //promise 객체
    const {geo} = address
    return geo
  })
  .then((geo)=>{
    console.log(geo) //promise 객체
    const {lat} = geo
    return lat
  })
  .then((lat)=>{
    console.log(lat) //  일반데이터(문자열)
  })