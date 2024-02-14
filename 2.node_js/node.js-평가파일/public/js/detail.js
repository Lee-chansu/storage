let del = document.getElementsByClassName('del')[0]
let modify = document.getElementsByClassName('modify')[0]


// 수정 페이지 이동
modify.addEventListener('click', function(e){
  let id = e.target.dataset.id
  window.location.href="/edit-page/"+id

})

// delete 버튼
del.addEventListener('click', function(e){
  
  let id = e.target.dataset.id

  // delete 요청
  fetch('/member/'+id, {method : 'DELETE'}) 
  .then( r => r.text())
  .then( r => {
    window.location.href="/member" // 웹브라우저(클라이언트) - 해당url로 이동해라
  })
  .catch(err => { 
    console.log(err)
  })
  
})


