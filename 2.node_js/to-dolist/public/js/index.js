const addBtn = document.querySelectorAll('.add-btn');
const editBtn = document.querySelectorAll('.edit-btn');
const delBtn = document.querySelectorAll('.del-btn');



function formatDate(date) {
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
}


addBtn.forEach((btn) => {
    btn.addEventListener('click', (e)=>{
        
    })
})