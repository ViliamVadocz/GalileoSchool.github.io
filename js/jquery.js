// This tells the browser to execute certain function as soon as it is ready (as soon as the page is fully loaded)
$(document).ready(function () {
  
  // Using Id I'm selecting the element with the given Id in this case it is the navigation button
  var navBtn = '#nav-btn';

  // "Installing" Click event listener on the selected element (When clicked the navigation box slides up and down)
  $(navBtn).click(function () { 
    $('.navbar').slideToggle('fast'); 
    $('.language-dropdown-content').fadeOut(200);
  }); 

  // Using Id I'm selecting the element with the given Id in this case it is the language button
  var langBtn = '#langBtn';

  // "Installing" Click event listener on the selected element (When clicked the language box slides up and down)
  $(langBtn).click(
    function(){
      $('.language-dropdown-content').fadeToggle(200);
    });
  
  
//Use the code below for the desktop version (It is the hover version)

    /*var langBtn = '#langBtn';
  $(langBtn).hover(function () {
      $('.language-dropdown-content').slideDown('fast');
    }, function(){
      if(!$('.language-dropdown-content').is(":hover")){
        $('.language-dropdown-content').slideUp('fast');
      }
    });
  $('.language-dropdown-content').hover(null,function () {
    $('.language-dropdown-content').slideUp('fast');
  });*/
});