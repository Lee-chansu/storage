let del = document.getElementsByClassName('delete')[0];

del.addEventListener('click', function(e){
    let id = e.target.dataset.id;

    //fetch 서버로 요청 날려주는 함수
    fetch('/member/'+id, {method : 'delete'})
    then(r => r.text())
    .then(r=> {
        console.log(r)
        //성공했을 대 실행하는 결과
        window.location.href="/member" //해당 url로 이동하라.
    })
    .catch(err => {
        console.log(err)
    })
})
