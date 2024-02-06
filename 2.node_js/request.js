const newMember = {
    name : 'Andrew',
    email : 'Andrew@naver.com',
    department : "Teacher"
}

// // 1. 추가 - POST
// fetch('https://learn.codeit.kr/api/members',{
//     method : 'POST',    //요청할 방식 결정
//     body : JSON.stringify(SoSo) //요청할 내용 body에 담는데 - JOSN.stringify() : JSON 객체로 바꾸기
// })
// .then (res => res.text()) 
// .then(result => console.log(result))

// // 2. 수정 - PUT
// fetch('https://learn.codeit.kr/api/members/번호',{ //특정한 데이터만 수정하고 싶을 때는 +번호
//     method : 'PUT',    //요청할 방식 결정
//     body : JSON.stringify(Member) //요청할 내용 body에 담는데 - JOSN.stringify() : JSON 객체로 바꾸기
// })
// .then (res => res.text()) 
// .then(result => console.log(result))

// // 3. 삭제 - DELETE
// fetch('https://learn.codeit.kr/api/members/번호',{
//     method : 'DELETE'    //요청할 방식 결정
// })
// .then (res => res.text()) 
// .then(result => console.log(result))


//4. 조회 - GET
fetch('https://learn.codeit.kr/api/members')
.then(res => res.text())
.then(result => console.log(Json.parse(result)))


    