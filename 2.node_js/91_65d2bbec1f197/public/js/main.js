// 1) 데이터 추가
/* 등록버튼을 클릭하면
  1 - post-form의 submit의 기능을 막기
  2 - 만약에 제목, 내용의 칸이 비어 있으면 안내 메시지 띄우기
  3 - 모두 내용이 채워저 있으면 submit 처리하기 
*/

let postCommit = document.getElementById('post-commit')
let postCancel = document.getElementById('post-cancel')

document.getElementById('post-form').addEventListener('submit', function(event){
  // 기본 동작(서버에 제출)을 막음
  event.preventDefault() 

  // 제목과 내용 입력 요소를 가져옴
  let postTitle = document.getElementById('post-title').value;
  let postContent = document.getElementById('post-content').value;
  
  // 내용이 비어 있는지 확인
  if (postTitle == "") {
    alert('제목을 입력해주세요!');
  } else if (postContent == "") {
    alert('내용을 입력해주세요!')
  } else {
    this.submit() // 내용이 비어 있지 않으면 폼 제출
  }

})



// 2. 수정/삭제 기능
const blogItems = document.querySelectorAll('.blog-list .item') 

blogItems.forEach(item =>{ 
   // 1) 수정 버튼을 클릭하면
  /*
    titleInput, contenInput에 edit 클래스 이름 추가하기
    classList - 추가 : add / 삭제 : revove / 토글 : toggle / 클래스 존재 여부 검사 : contains
    자바스크립트 속성 : Property
    html 속성 : Attribute
  */

  // item 하위에 있는 요소들 가져오기
  const titleInput = item.querySelector('.blog-title')
  const contenInput = item.querySelector('.blog-content')
  const editBtn = item.querySelector('.edit')
  const delBtn = item.querySelector('.del')

  // 삭제
  delBtn.addEventListener('click', function(e){
    let id = e.target.dataset.id
    let txt = e.target.textContent // 버튼 글자 가져오기
    if(txt=='🗑')
      postDelete(id)
    else 
      window.location.href = '/'
  })

  // 수정
  editBtn.addEventListener('click', function(e) {
    const id = e.target.dataset.id
    
    titleInput.classList.toggle('edit') // 클래스 1번누르면 추가 , 1번누르면 제거
    contenInput.classList.toggle('edit')

    //edit 클래스가 있으면
    if(titleInput.classList.contains('edit')){ 
        editBtn.textContent = '✅'
        delBtn.textContent = '❌'
        titleInput.removeAttribute('readonly') // readonly 속성 제거 = 수정가능한 input상자로 바꿈
        contenInput.removeAttribute('readonly')
      } else {
      // edit 클래스 없음
        editBtn.textContent = '✏'
        delBtn.textContent = '🗑'
        titleInput.setAttribute('readonly', 'readonly') // 읽기전용-잠그기 - 속성 : readonly ="readonly"
        contenInput.setAttribute('readonly', 'readonly')

        const newPost = { // 수정할 내용 객체로 만듦
          id,
          title : titleInput.value,
          content : contenInput.value,
        }
        postEdit(newPost) // 서버에 객체를 보내는 함수 실행
    }
  })

})

// DELETE 요청
function postDelete (id) {
  
  fetch('/'+id , {method : 'DELETE'})
      .then((r)=>{r.text()}) 
      .then((r)=>{ 
        window.location.href="/"
      })
      .catch((error)=>{
        console.error()
      })
}

function postEdit(newPost){

  const {id} = newPost // 아이디 값만 분리
  // PUT 요청
  fetch('/'+id , {
    method : 'PUT',
    headers: { 'Content-Type': 'application/json'}, 
    body: JSON.stringify(newPost)
  })
  .then((r)=>{r.text()}) // 성공했을때 메시지
  .then((r)=>{ // 성공했을 때 처리할 내용
    window.location.href="/"
  })
  .catch((error)=>{
    console.error()
  })
}

document.addEventListener('DOMContentLoaded', ()=>{

  let loginInfo = document.querySelector('.login-info')
  let loginState = loginInfo.dataset.loginState
  let tag = ''
  
  if(loginState == 'false' || loginState== undefined ){
    tag = ['<a href="/join" class="join">회원가입</a>', '<a href="/login" class="logout">로그인</a>']
  }else{
    tag = `<span class="username">${loginState}</span><span class="message">님 반갑습니다!</span><a href="/logout" class="logout">로그아웃</a>`
  }
  
  loginInfo.innerHTML = tag

})
