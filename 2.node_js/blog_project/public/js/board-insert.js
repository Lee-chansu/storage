function send(f){
    let title = f.title.value
    let content = f.content.value

    if(title == ''){
        alert('제목을 입력해주세요')
        return
    }
    if(content == ''){
        alert('내용을 입력해주세요')
        return
    }

    f.submit();
}