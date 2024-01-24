// let slideToggle = document.querySelector('.sldie-toggle')

// for(let s of slideToggle){
//     s.addEventListener('click', function(){
//         let menubar = document.querySelector('.slide-mobile-menubar')
//         if(menubar.style.maxWidth != 0+'%'){
//             menubar.style.maxWidth = 25+'%'
//         }
//         else{
//             menubar.style.maxWidth = 0+'%'
//         }
//     })
// }

let item = document.querySelectorAll(".it");

for(let i of item){
    i.addEventListener('click', function(){
        let list2 = i.nextElementSibling;
        let scrollheight = list2.scrollHeight+'px';
        let it_height = getComputedStyle(list2).maxHeight;
        
        
        if(list2.style.maxHeight == 0+'px'){
            list2.style.maxHeight = scrollheight;
        }
        else{
            list2.style.maxHeight = 0+'px';
        }
        
        
    })
}

