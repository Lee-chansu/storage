// 1)
console.log('start')

// 2) fetch함수 : 비동기 실행 함수 중에 하나 - 역할 : 서버에 요청(get, post, put, delete)
fetch('http://jsonplaceholder.typicode.com/users') 
.then((응답결과)=>{ 
  return 응답결과.text()
}) 
.then((결과)=>{
  console.log(결과)
})
.catch(()=>{
  // 에러처리 코드
})

// fetch 함수   - promise객체 반환하는 함수 - 상태정보를 함께 저장하고 있는 객체
// thend 메서드 - 서버에서 요청이 온다음에 실행할 내용을 등록해주는 메서드, promise객체 반환함

// 3) 
console.log('stop')

// promise객체의 상태
// - prepeding : 진행중
// - fullfilled : 성공 
// - rejected : 실패


fetch('http://jsonplaceholder.typicode.com/users') 
.then((응답결과)=>응답결과.text()) 
.then((결과)=> console.log(결과))

// asynchronous : 비동기
async function fetchPrint(){

  // 프로미스 객체를 반환하는 것에 붙음
  const 응답결과 = await fetch('http://jsonplaceholder.typicode.com/users') 
  const 결과 = await 응답결과.text()
  console.log(결과)
}

fetchPrint()