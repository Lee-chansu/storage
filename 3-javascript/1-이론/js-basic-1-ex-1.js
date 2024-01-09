// 모든 곳에 접근할 수 있는 변수
let menu = document.getElementsByClassName('menu');

for(let i = 0; i < menu.length; i++){


  menu[i].addEventListener('click', function(){
    let panel = this.nextElementSibling;
    menuClose(i, menu) // 전체패널닫기
    menuOpen(menu[i], panel) // 클릭한 패널 열기
    
  });
}

//console.log(menu.length)
function menuClose(i, menu){
  
  for(let j = 0; j < menu.length; j++) {  // j = j + 1
    if( i != j){
      menu[j].nextElementSibling.style.maxHeight = null
      menu[j].classList.remove('on');
    }
    
  }
}

function menuOpen(menu, panel){
  if(panel.style.maxHeight){
    // 닫기 코드
    panel.style.maxHeight = null 
    menu.classList.remove('on');
  }else{
    // 열기코드
    panel.style.maxHeight = panel.scrollHeight +"px" 
    menu.classList.add('on');
  }
}











/*
menu[0].addEventListener('click', function(){
  // 이벤트가 발생한 그 요소- this
  this.classList.toggle('on');
  
  // 클릭한 것, 다음에 있는 panel 선택
  let panel = this.nextElementSibling;
  
  // 최대높이있음 -> null (높이 없앰)
  // null -> 최대 높이를 패널의 원래 크기로 설정한다.

  // 값이 있음 - true 
  // 값이 비어있거나, null, 0 = false

  if(panel.style.maxHeight){
    panel.style.maxHeight = null 
    // 60px -> null
    // true->false 상태를 만든다
    
  }else{
    panel.style.maxHeight = panel.scrollHeight +"px" 
    // null -> 60px
    // false -> true상태가 된다.
  }

});
*/
