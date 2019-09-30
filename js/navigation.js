console.log("Javascript Loaded!");
const menuBtn = document.getElementById("nav-btn");
const NavMenuDesk = document.getElementById('nav-desk');

menuBtn.addEventListener("click", toggle_menu, false);
window.addEventListener("resize", check_resize, false);

function toggle_menu(){
    NavMenuDesk.classList.toggle('show');
    menuBtn.classList.toggle('active-nav-btn');
    document.querySelector('.content').classList.toggle('blur');
}

function check_resize(){
    if(window.innerWidth >= 740){
        if(document.querySelector('.content').classList.contains('blur'))
            document.querySelector('.content').classList.remove('blur');
        else
            return;
        if(NavMenuDesk.classList.contains('show'))
            NavMenuDesk.classList.remove('show');
        else
            return;
        if(menuBtn.classList.contains('active-nav-btn'))
            menuBtn.classList.remove('active-nav-btn');
        else
            return;
    }
}