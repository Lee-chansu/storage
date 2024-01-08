let menu = document.getElementsByClassName('menu');

for(let i = 0; i < menu.length; i++) {
    menu[i].addEventListener('click', function(){
        this.classList.toggle('on');

        let panel = this.nextElementSibling;

        menuClose(menu); // 전체 패널 닫기
        menuOpen(menu[i], panel); // 클릭한 패널 열기
        

    });
}

function menuClose(item){
    for(let j = 0; j < item.length; j++){
        item[j].nextElementSibling.style.maxHeight = null;
        item[j].classList.remove('on');
    }
}



function menuOpen(menu, panel){
    if(panel.style.maxHeight){
        panel.style.maxHeight = null;
        menu.classList.remove('on');
    }
    else{
        panel.style.maxHeight = item.scrollHeight + "px";
        menu.classList.add('on');
    }
    
}