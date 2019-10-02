/** This is a debug message that tells me wether or not my javascript was loaded, this debug message can be checked in developer tools in chrome under the tab named console
 * 
 * Difficulty: Easy
*/
console.log("Javascript Loaded!"); 

/** Here I'm trying to select a specific element (in this case it is the navigation button) from my html file using its id(identifier) which is unique through-out the document 
 * 
 * Difficulty: Easy
*/
const menuBtn = document.getElementById("nav-btn");

const menuBtnImg = document.getElementById('menu-btn-img');
var original_attribute_src = menuBtnImg.getAttribute('src');
var exit_img_src = "images/white-close.png"; 

/** The same as above only now I'm trying to select a different element (in this case it's the menu itself) 
 * 
 * Difficulty: Easy
*/
const NavMenuDesk = document.getElementById('nav-desk'); 

/** Adding an Event Listener for an action (in my case it's the click on a button) done on my object, and passing a function that should be carried out when the event occurs.
 * 
 * Difficulty: Medium
 */
menuBtn.addEventListener("click", toggle_menu, false); 

/** The same as above but this time I'm actually listening when a browser is being resized. So whenever you extend or shrink your Internet Browser this event will fire up, again completing a function that I've passed into the event.
 * 
 * Difficulty: Medium
 */
window.addEventListener("resize", check_resize, false);

/** Function that shows and hides our menu on mobile devices
 * 
 * Difficulty: Harder
 * @description What this function does to achieve the effect of hiding and showing our menu after clicking a button on a mobile device, 
 * is that it toggles (either adds or removes depends on wether or not the object already has the class) class that shows or hides our element.
 * Yeah, blur effect is also added using JavaScript and it's powerful events. 
 */
function toggle_menu(){
    NavMenuDesk.classList.toggle('show');
    //menuBtn.classList.toggle('active-nav-btn');
    if(menuBtnImg.getAttribute('src') == original_attribute_src)
        menuBtnImg.setAttribute('src', exit_img_src);
    else
        menuBtnImg.setAttribute('src', original_attribute_src);
    document.querySelector('.content').classList.toggle('blur');/** Here I add blur effect to background when menu is visible, thus making human eye more focused on the menu rather than on the content in the background */
}

/** Function that checks the browser size whenever it is resized and evaluates the following statements
 * 
 * Difficulty: Harder
 * @description This function is crucial to get rid of annoying bugs that can occur when transitioning from mobile viewport to desktop viewport. 
 * Such as when you leave your menu open on a mobile viewport and you extend your browser to desktop viewport the blur effect will still be active, and that's a big NO NO!
 */
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

function Test(){
    return null;
}