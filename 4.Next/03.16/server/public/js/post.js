
// 0. 로그인 - ui
document.addEventListener('DOMContentLoaded', ()=>{

  let loginInfo = document.querySelector('.login-info')
  let loginState = loginInfo.dataset.loginState
  let tag = ''
  
  if(loginState == 'false' || loginState== undefined ){
    tag = '<a href="/join" class="logout">회원가입</a><a href="/login" class="logout">로그인</a>'
  }else{
    tag = `<span class="username">${loginState}</span><span class="message">님 반갑습니다!</span><a href="/logout" class="logout">로그아웃</a>`
  }
  
  loginInfo.innerHTML = tag

})


// 1. 글쓰기 

const postCommit = document.getElementById('post-commit')
const postCancel = document.getElementById('post-cancel')

document.getElementById('post-form').addEventListener('submit', function(event){
  event.preventDefault() 

  let postTitle = document.getElementById('post-title').value;
  let postContent = document.getElementById('post-content').value;
  
  if (postTitle == "") {
    alert('제목을 입력해주세요!');
  } else if (postContent == "") {
    alert('내용을 입력해주세요!')
  } else {
    this.submit() 
  }

})


// 2. 수정/삭제 기능
const blogItems = document.querySelectorAll('.blog-list .item') 

blogItems.forEach(item =>{ 

  const titleInput = item.querySelector('.blog-title')
  const contenInput = item.querySelector('.blog-content')
  const editBtn = item.querySelector('.edit')
  const delBtn = item.querySelector('.del')

  if( delBtn && editBtn){
    // 삭제
    delBtn.addEventListener('click', function(e){
      e.preventDefault()
      let id = e.target.dataset.id
      let txt = e.target.textContent // 버튼 글자 가져오기
      if(txt=='🗑')
        postDelete(id)
      else 
        window.location.href = '/'
    })

    // 수정
    editBtn.addEventListener('click', function(e) {
      e.preventDefault()
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

  }

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
