const addBtn = document.querySelector(".add-btn");
const editBtn = document.querySelector(".edit-btn");
const delBtn = document.querySelectorAll(".del-btn");
const userId = document.getElementById("user_id");

addBtn.addEventListener("click", (e) => {
  let id = e.target.dataset.id;
  location.href = "/add/" + id;
});
editBtn.addEventListener("click", (e) => {
  let id = e.target.dataset.id;

  location.href = "/set/" + id;
});

delBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    } else {
      let id = e.target.dataset.id;
      let user_id = userId.value;


      fetch("/del/" + id, { method: "delete" })
        .then((r) => r.text())
        .then((r) => {
          window.location.href = "/page/" + user_id;
        });
    }
  });
});
