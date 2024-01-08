1) A를 선택한 다음에

아이디/태그/클래스
css선택자로 선택하냐

※ 괄호안에 이름만! 써준다
(단수) document.getElementById('아이디명')

(복수) document.getElementsByTagName('태그명')
(복수) document.getElementsByClassName('클래스명')  -- on (클래스 이름만 쓴다)

※ 괄호안에 선택자 기호까지 포함해서 써준다
(단수) document.querySelector('선택자')  --- .on  -- 첫번째 것만 선택
(복수) document.querySelectorAll('선택자') -- 여러개 선택

※ 복수로 가져올때 반드시 인덱스번호가 있어야 효과가 적용된다.

document.querySelectorAll('선택자')[2].style.display = block;


2) [이벤트]가 발생하면~~

이벤트의 종류
(마우스, 키보드, 브라우저나 어떤 상태가 변하는 )
  
  클릭 - click
  더블클릭 - dblclick
  휠돌릴때 - DOMMouseScroll

  키보드 눌렀을 때 - keydown
  키보드가 눌렀다가 떨어질 때 - keyup
  포커스가 위치 했을때 - focus
  포커스 떠났을 때 - blur

  브라우저 = window
  - resize
  - load
  - scroll


(1) 태그에 이벤트를 기록
(2) 코드 안에서 addEventListner를 이용하는 방법


3) B라는 대상(또는 나에게)
   어떤 일이 일어난다. 동작을 한다.



