function send(f){
    let title = f.title.value
    let content = f.content.value
    let id = f.id.value
    if(title == ''){
        alert('제목을 입력해주세요')
        return
    }
    if(content == ''){
        alert('내용을 입력해주세요')
        return
    }

    let body = new URLSearchParams(new FormData(f))
    fetch('/board/'+id, {method : 'put', body})
    .then((rs)=>{rs.text()})
    .then((text)=>{
        location.href='/board/'+id
    })
    .catch((error)=>{
        console.log(error)
    })
}