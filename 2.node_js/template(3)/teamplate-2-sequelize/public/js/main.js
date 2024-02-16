const toAdd = document.getElementsByClassName('toAdd')[0];

const cancle = document.getElementsByClassName('cancle')[0];

toAdd.addEventListener('click', (e)=>{
    window.location.href='/add-page'
})
cancle.addEventListener('click', (e)=>{
    location.href='/blog'
}) 


function isAdd(f){
    let title = f.title.value;
    let content = f.content.value;

    if(title==''){
        alert('제목을 입력해주세요.')
        return;
    }
    if(content == ''){
        alert('내용을 입력해주세요.')
        return;
    }

    f.action = '/add';
    f.method = 'post';
    f.submit();
}

let del = document.querySelectorAll('.del');
 // -> forEach 가능, 배열 형태로 인식할 수 있기 때문
// let del = document.getElementByClassName('del'); 
//forEach 불가능 -> 배열 형태로 인식할 수 없기 때문

del.forEach((el, i)=>{ //매개변수 (1) : 요소, (2) : 인덱스 번호
    el.addEventListener('click', function(){
        let id = e.target.dataset.id
        let txt = e.target.textContent //버튼의 글자 가져오기
        console.log(txt);


    })
})
