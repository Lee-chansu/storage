const addBtn = document.querySelector(".add-btn");
const cancleBtn = document.querySelector(".cancle-btn");

addBtn.addEventListener('click', (e)=>{
  let id = document.querySelector(".schedule-id").value;
  let titleVal =document.getElementById("title").value;
  let contentVal = document.querySelector(".content").value;
  let dateVal = document.querySelector(".date").value;

  console.log(id)
  let body = {
    title: titleVal,
    content: contentVal,
    date: dateVal,
  };

  fetch("/add/" + id, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then(r => r.text())
    .then((r) => {
      location.href = "/page/" + id;
    });})

cancleBtn.addEventListener("click", (e) => {
  let id = e.target.dataset.id;

  location.href = "/page/" + id;
});
