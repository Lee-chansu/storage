let menu = document.getElementsByClassName('menu');

for(let i = 0; i < 3; i++) {
    menu[i].addEventListener('click', function(){
        this.classList.toggle('on');

        let panel = this.nextElementSibling;

        for(let j = 0; j < menu.length; j++){
            menu[j].nextElementSibling.style.maxHeight = null;
        }

        if(panel.style.maxHeight){
            panel.style.maxHeight = null;
        }
        else{
            panel.style.maxHeight = panel.scrollHeight + "px";
        }

    });
}