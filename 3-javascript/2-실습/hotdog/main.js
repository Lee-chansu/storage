import hotdog from "./hotdog.js";


let result = '';

for(let i of hotdog){
    
    let new_logo = (i.new) ? " new" : "";
    let best_logo = (i.best) ? " best" : "";

    let tag = ['', [], ''];
    
    tag [0] = `<div class="box ${new_logo} ${best_logo}">
            <p class="name">${i.title} </p>
            <p>${i.content}</p>
            <p class="hashtag">`


    for(let j of i.hashtag){
        tag[1] += `<span>${j}</span>`
    }



    tag[2] = `</p><img src="${i.img}" alt="${i.title}"></div>`

    result += tag[0] + tag[1] + tag[2];
}

let content_box = document.querySelector('.section .inner .wrap');

content_box.innerHTML = result;