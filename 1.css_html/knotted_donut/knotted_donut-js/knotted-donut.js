const header = document.getElementsByClassName("header")[0];

window.addEventListener("scroll", function(){
  if(this.window.scrollY == 0){
    header.classList.remove("fixed");
  }else{
    header.classList.add("fixed");
  }
})


const list = document.querySelector(".bi-list");
const backDrop = document.getElementsByClassName("slide-menu-backdrop")[0];
const slideMenu = document.getElementsByClassName("slide-menu")[0];
const mobileBar = document.getElementsByClassName("slide-mobile-menubar")[0];

list.addEventListener("click", function () {

  slideMenu.classList.add("open");
  backDrop.classList.add("open");
  mobileBar.classList.add("open");
});


backDrop.addEventListener("click", function(){
    slideMenu.classList.remove("open");
    backDrop.classList.remove("open");
    mobileBar.classList.remove("open");
})