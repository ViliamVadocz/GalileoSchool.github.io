// This tells the browser to execute certain function as soon as it is ready (as soon as the page is fully loaded)
$(document).ready(function() {

    // Using Id I'm selecting the element with the given Id in this case it is the navigation button
    var navBtn = '#nav-btn';

    // "Installing" Click event listener on the selected element (When clicked the navigation box slides up and down)
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

    // Using Id I'm selecting the element with the given Id in this case it is the language button
    var langBtn = '#langBtn';

    // "Installing" Click event listener on the selected element (When clicked the language box slides up and down)
    $(langBtn).click(
        function() {
            $('.language-dropdown-content').fadeToggle(200);
            return;
        });

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
                $(logo).addClass('no-display');
                $(title).addClass('no-display');

                searching = true;
            } else {
                slideOut();

                /** Temporary Solution */
                $(logo).removeClass('no-display');
                $(title).removeClass('no-display');

                searching = false;
            }
            return;
        });

    $(document).click(function() {
        if (!$('.language-dropdown-content').is(":hover") && !$('.language-dropdown-content').is(":hidden") && !$(langBtn).is(":hover")) {
            $('.language-dropdown-content').fadeOut(200);
        } else if (!$(searchInput).is(":hover") && !$(searchInput).is(":hidden") && !$(searchBtn).is(":hover")) {
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
    };

    function slideOut(selector = searchInput) {
        $(selector).animate({
            "width": "0",
            "opacity": 0,
        }, 400);
        $(selector).hide(500);
    };

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