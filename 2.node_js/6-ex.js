fetch('https://jsonplaceholder.typicode.com/users')
  .then( res => res.text() ) 
  .then( result => {
    const users = JSON.parse(result)
    const {id} = users[0]

    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  })
  .then((response)=> response.text())
  .then((posts)=>{
    console.log(posts)
  })

//메서드 체이닝
//fetch().then().then()...
//중간에 하나라도 rejected 되면 전부 rejected 된다.

/*반환값 종류 2가지
1) promise 객체
2) promise 객체가 아닌 일반객체(숫자, 문자열, 일반 객체...)

text() 메소드
- fetch 함수로 리스폰스를 잘 받으면
- response.text() 메서드는 fulfilled 상태
- (1) response.body에 있는 내용을 -> JSON 데이터를 자바스크립트 객체로 (변환) 생겨난 객체를
- (2) '작업 성공 결과'로 가진 <Promise> 객체를 리턴합니다.

<결론>
text, json 메서드가 promise 객체를 리턴하다보니
then 메서드 체이닝을 통해서 작업을 이어 갈 수 있는 것이다.

Q. 왜 메서드 체이닝방식을 사용하는가???
- node.js 작동방식 = 비동기
- 비동기식을 순차적으로 처리하고 싶을 때, 메서드 체이닝 방식을 사용한다.
    + 전체 코드를 좀 더 깔끔하게 정리

비동기식 작업을 순차적으로 처리하기 위해
프로미스 체이닝을 사용한다.
*/