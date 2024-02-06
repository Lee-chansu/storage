const newMember = {
    name : 'Homusae',
    email : 'analiayjum',
    department : "g"
}
const Member = {
    name : '소소한행복',
    email : '소가 노래하면',
    department : "소송"
}
const SoSo = {
    name : '소소한행복',
    email : '소가 올라가면',
    department : "소오름 ㅎ"
}

// 1. 추가 - POST
fetch('https://learn.codeit.kr/api/members',{
    method : 'POST',    //요청할 방식 결정
    body : JSON.stringify(SoSo) //요청할 내용 body에 담는데 - JOSN.stringify() : JSON 객체로 바꾸기
})
.then (res => res.text()) 
.then(result => console.log(result))

// 2. 수정 - PUT
fetch('https://learn.codeit.kr/api/members/번호',{ //특정한 데이터만 수정하고 싶을 때는 +번호
    method : 'PUT',    //요청할 방식 결정
    body : JSON.stringify(Member) //요청할 내용 body에 담는데 - JOSN.stringify() : JSON 객체로 바꾸기
})
.then (res => res.text()) 
.then(result => console.log(result))

// 3. 삭제 - DELETE
fetch('https://learn.codeit.kr/api/members/번호',{
    method : 'DELETE'    //요청할 방식 결정
})
.then (res => res.text()) 
.then(result => console.log(result))


//4. 조회 - GET
fetch('https://learn.codeit.kr/api/members')
.then(res => res.text())
.then(result => console.log(Json.parse(result)))
    