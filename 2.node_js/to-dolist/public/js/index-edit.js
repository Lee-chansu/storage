const form = document.querySelectorAll(".form");
const setBtn = document.querySelector(".set-btn");
const cancleBtn = document.querySelector(".cancle-btn");

setBtn.addEventListener('click', (e)=>{
    let id = e.target.dataset.id;
    form.forEach((el)=>{
    
        const idVal = el.id.value;
        const titleVal = el.title.value;
        const contentVal = el.content.value;
        const dateVal = el.date.value;
        
        let body = {
            s_id : idVal,
            title : titleVal,
            content : contentVal,
            date : dateVal
        }
    
        fetch('/set/'+id, {
            method : 'put',
            body : JSON.stringify(body),
            headers: {"Content-Type": "application/json"}
        })
        .then(r => r.text())
        .then(r => {
            if(r == 'success!'){
                window.location.href="/page/"+id
            }
            else{
                console.log(r)
            }
        })
    })
    
    
})
cancleBtn.addEventListener('click', (e)=>{
    let id = e.target.dataset.id;

    location.href="/page/"+id;
})

