let postCommit = document.getElementById('post-commit')
let postCancel = document.getElementById('post-cancel')

// 등록버튼을 클릭하면
// (완료) input상자의 제목과 내용이 서버로 전달되서 내용이 db에 저장이 된다.
// 만약에 제목, 내용의 칸이 비어 있으면 
// 안내메시지 -> 제목을 입력/ 내용을 입력 (alret창에 메시지 띄우기)

// post-form의 submit의 기능을 막기
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
    // 내용이 비어 있지 않으면 폼 제출
    this.submit()
  }
});

// 개수가 여러개인 요소에 이벤트 걸때 기본 구문 (클래스 요소 가져올때)

let del = document.querySelectorAll('.del');
 // -> forEach 가능, 배열 형태로 인식할 수 있기 때문
// let del = document.getElementByClassName('del'); 
//forEach 불가능 -> 배열 형태로 인식할 수 없기 때문

del.forEach((el, i)=>{ //매개변수 (1) : 요소, (2) : 인덱스 번호
    el.addEventListener('click', function(e){
        let id = e.target.dataset.id
        let txt = e.target.textContent //버튼의 글자 가져오기
        if(txt == '삭제')
          postDelete(id)
        else
          window.location.href='/'


    })
})


const blogItems = document.querySelectorAll('.blog-item')

blogItems.forEach((item)=>{
  const titleInput = item.querySelector('.blog-title');
  const contentInput = item.querySelector('.blog-content');
  const editBtn = item.querySelector('.edit');
  const delBtn = item.querySelector('.del');

  editBtn.addEventListener('click', function(e){
    let id = e.target.dataset.id;

    titleInput.classList.toggle('edit')
    contentInput.classList.toggle('edit')
    

    if(titleInput.classList.contains('edit')){
      editBtn.textContent = '확인'
      delBtn.textContent = '취소'

      titleInput.readOnly = false;
      contentInput.readOnly = false;
      // titleInput.removeAttribute('readonly')
      // contentInput.removeAttribute('readonly')
    }
    else{
      editBtn.textContent = '수정'
      delBtn.textContent = '삭제'

      titleInput.readOnly = true;
      contentInput.readOnly = true;
      // titleInput.setAttribute('readonly')
      // contentInput.setAttribute('readonly')
    }
  })
})

    
function postDelete(id){
      fetch('/'+id, {method : 'delete'})
        .then(r => r.text())
        .then(r => {
          window.location.href='/'
        })
      
  }

function postEdit(newPost){

  let {id} = newPost

      fetch('/'+id, {
        method : 'put',
        headers : { 'ContentTypes' : 'applicaion/json'},
        body : JSON.stringify(newPost)
      })
        .then(r => r.text())
  }
  