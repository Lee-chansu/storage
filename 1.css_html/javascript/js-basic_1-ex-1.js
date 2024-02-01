let menu = document.getElementsByClassName('menu');

for(let i = 0; i < menu.length; i++) {
    menu[i].addEventListener('click', function(){
        this.classList.toggle('on');

        let panel = this.nextElementSibling;

        menuClose(i, menu); // 전체 패널 닫기
        menuOpen(menu[i], panel); // 클릭한 패널 열기
    });
}

function menuClose(i, item){
    for(let j = 0; j < item.length; j++){
        if(i != j){// i (=현재 클릭한 요소의 순번) 가 아닌 것은 아래의 효과 적용
            item[j].nextElementSibling.style.maxHeight = null;
            item[j].classList.remove('on');
        }
    }
}



function menuOpen(menu, panel){
    if(panel.style.maxHeight){
        panel.style.maxHeight = null;
        menu.classList.remove('on');
    }
    else{
        panel.style.maxHeight = panel.scrollHeight + "px";
        menu.classList.add('on');
    }
    
}