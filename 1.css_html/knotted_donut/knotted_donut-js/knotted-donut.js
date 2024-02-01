
let item = document.querySelectorAll(".it");

for(let i of item){
    i.addEventListener('click', function(){
        let list2 = i.nextElementSibling;
        let scrollheight = list2.scrollHeight+'px';
        
        
        if(list2.style.maxHeight == 0+'px'){
            list2.style.maxHeight = scrollheight;
        }
        else{
            list2.style.maxHeight = 0+'px';
        }
        
        
    })
}