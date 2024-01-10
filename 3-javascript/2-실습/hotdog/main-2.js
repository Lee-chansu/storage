import hotdog from "./hotdog.js";


let result = '';

for(let i of hotdog){
    
    let new_tag = (i.new) ? '<span class="new icon">New</span>' : '';
    let best_tag = (i.best) ? '<span class="best icon">Best</span>' : '';

    let tag = ['', [], ''];
    
    tag [0] = `<div class="box">
            <img src="${i.img}" alt="${i.title}">
            <p class="name">${i.title}${new_tag}${best_tag} </p>
            <p>${i.content}</p>
            <p class="hashtag">`


    for(let j of i.hashtag){
        tag[1] += `<span>${j}</span>`
    }



    tag[2] = `</p></div>`

    result += tag[0] + tag[1] + tag[2];
}

let content_box = document.querySelector('.section .inner .wrap');

content_box.innerHTML = result;