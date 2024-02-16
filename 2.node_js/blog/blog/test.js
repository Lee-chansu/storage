// 1)
console.log('staart')

// 2)
// 서버에 요청하는 역할(get, post, delete, put) default : get
fetch('http://jsonplaceholder.typicode.com/users')
.then((응답결과)=>{ // pormise 객체 반환 - 상태정보를 함께 저장하고 있는 객체
    응답결과.text()
}) //서버에서 요청이 온 다음에 실행할 내용을 등록해주는 메서드
.소두((결과)=> console.log(결과))

// asynchronous : 비동기
async function fetchPrint(){

    const 응답결과 = await fetch('http://jsonplaceholder.typicode.com/users')
    const 결과 = await 응답결과.text()
    console.log(결과)
}

// 3)
console.log('stop')

//promise 객체의 상태
// - prepending : 진행중
// - fullfiled : 성공
// - rejected : 실패