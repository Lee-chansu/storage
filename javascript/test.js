/*
    자바 스크립트로 내가 원하는 요소 선택하기
    toggle-btn을 선택해서
    클릭하면 (이벤트 연결)
    .gnb-wrap 보인다.
*/
    //1) 요소선택

    //태그명으로 선택(선택해올 때 단수 vs 복수 구분)
    //복수로 가져오는 것은 [0] 인덱스 번호 붙여줘야 함.

    //1-1) 태그
    let tagDiv = document.getElementsByTagName('section');
    console.log(tagDiv);

    //1-2) 클래스
    let classBox = document.getElementsByClassName('box');
    console.log(classBox);

    //1-3) css선택자로 - 복수개 선택하는 방법
    let queryInner = document.querySelector('.inner');
    console.log(queryInner);

    //1-4) 아이디 선택자로 가져오기
    let toggle_btn = document.getElementById('toggle');
    console.log(toggle_btn);
    //1-5) css선택자로 - 단수로 가져오기
    // - 찾은 것중에 첫번째만 찾아준다
    let queryContent = document.querySelector('.content')
    console.log(queryContent);


    //2) 이벤트 연결 - 3가지 정도 있음
    /*요소.addEventListener('이벤트', function(){
        실행할 기능
    })*/
    toggle_btn.addEventListener('click', function(){});

    queryContent.addEventListener('focus', function(){});

    // 복수로 가져오는 친구의 경우 반드시 몇번째 요소의 것을 가져올지 표기해줄 것.
    //classBox.addEventListener('click', function(){}); --x

    classBox[0].addEventListener('click', function(){});
    queryInner.addEventListener('keyup', function(){});

    // 3) css바꾸기

    //요소.style.속성 = '값'
    // ex) font-size (카멜 스타일로 써줄 것)
    //요소.style.fontSize = '24px'

    //queryInner.style.color = 'red';
    //classBox[0].style.color = '#ddd';