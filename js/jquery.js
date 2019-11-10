// This tells the browser to execute a certain function/s as soon as it is ready (as soon as the page is fully loaded)
$(document).ready(function() {

    /** Assigning a newly created variable some value.
     * As you may have noticed I assigned a string type value to my variable.
     * However the value type can be anything (integer, float, string, boolean etc.) */
    var navBtn = '#nav-btn';

    // Hooking a Click event listener into an element that I selected using my variable previously.
    // This means that whenever a click happnes on an element selected below by the $(navBtn) selector, this event fires up and executes the code inside the following function.
    $(navBtn).click(function() {
        $('.navbar').slideToggle('fast');
        $('#nav-btn').toggleClass('active-nav-btn');
        $('.dropdown-content').fadeOut(200);
        $('.left').toggleClass('amber');
        $('.language-dropdown').toggleClass('no-display');
        $('.search-drop').toggleClass('hidden');
        $('#title').toggleClass('title-open-nav');
        $('.logo').toggleClass('logo-open-nav');
        $('.title').toggleClass('title-cont-open-nav');
        $('#logo').toggleClass('logo-img-open-nav');
    });

    // Assigning a newly created variable some value.
    var langBtn = '#langBtn';

    // Hooking a Click event listener into an element that I selected previously.
    $(langBtn).click(
        function() {
            $('.language-dropdown-content').fadeToggle(200);
            return;
        });

    /**
     * Variables
     */
    var searchBtn = '#search';
    var searchInput = '.search-input';
    var logo = '.nav-phone .logo';
    var title = '.nav-phone .title';
    var logo_cont = '#logo-container';
    var searching = false;

    $(searchBtn).click(
        function() {
            if (!searching) {
                slideIn();

                /** Temporary Solution */
                searching = true;
            } else {
                slideOut();

                /** Temporary Solution */
                searching = false;
            }
            return;
        });

    $(document).click(function() {
        if (!$('.language-dropdown-content').is(":hover") && !$('.language-dropdown-content').is(':hidden') && !$(langBtn).is(':hover')) {
            $('.language-dropdown-content').fadeOut(200);
        } else if (!$(searchInput).is(':hover') && !$(searchInput).is(':hidden') && !$(searchBtn).is(':hover')) {
            slideOut();
            searching = false;
        }
    });


    function slideIn(selector = searchInput) {
        $(selector).show();
        $(selector).delay(0).animate({
            "width": "40vw",
            "opacity": .9
        }, 400);
        $(logo).addClass('no-display');
        $(title).addClass('no-display');
    };

    function slideOut(selector = searchInput) {
        $(selector).animate({
            "width": "0",
            "opacity": 0,
        }, 400);
        $(selector).hide(500);
        $(logo).removeClass('no-display');
        $(title).removeClass('no-display');
    };

    // Use the code below for the desktop version (It is the hover version)

    // The function below utilizes the desktop function of hovering over something with your mouse.

    /** 
     * Whenever you hover over the language selection button with your mouse on a computer this function will make sure
     * that the language dropdown opens regardless whether you clicked it or not.
     */

    // This function is temporarily unavailable due to a missing desktop design, and the lack of language button in our desktop viewport.

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