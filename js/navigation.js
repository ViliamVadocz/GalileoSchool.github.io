console.log("Javascript Loaded!");
const menuBtn = document.getElementById("nav-btn");
const NavMenuDesk = document.getElementById('nav-desk');

menuBtn.addEventListener("click", toggle_menu, false);

function toggle_menu(){
    NavMenuDesk.classList.toggle('show');
    document.querySelector('.content').classList.toggle('blur');
}