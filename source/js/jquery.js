// Executes functions as soon as the page is fully loaded.
$(document).ready(function() {

    // Toggles navigation menu on click of the navigation menu button.
    $("#nav-btn").click(function() {
        // Slides the navigation out / in.
        $(".navbar").slideToggle("fast");
        // Toggles look of menu button (e.g. colour).
        $("#nav-btn").toggleClass("active-nav-btn");
        // Fade out language dropdown.
        $(".dropdown-content").fadeOut(200);
        // Make language dropdown disappear / reappear.
        $(".language-dropdown").toggleClass("no-display");
        // Make 'left' elements toggle their colour.
        $(".left").toggleClass("red-wine");
        // Hide / Show the search bar.
        $(".search-drop").toggleClass("hidden");
        // Toggles colour of school name.
        $("#title").toggleClass("title-open-nav");
        // Adjusts logo's margin-left.
        $(".logo").toggleClass("logo-open-nav");
        // Adjusts padding and margin of div with school name.
        $(".title").toggleClass("title-cont-open-nav");
        // Adjusts padding and margin of logo image.
        $("#logo").toggleClass("logo-img-open-nav");
    });

    // This is how variable assignment is done in JavaScript.
    let langBtn = "#langBtn";

    // Hooking a click event listener into langBtn.
    $(langBtn).click(function() {
        $(".language-dropdown-content").fadeToggle(200);
        return;
    });

    // Set up variables for search.
    let searchBtn = "#search";
    let searchInput = ".search-input";
    let searching = false;

    // Set up variables for logo and title.
    let logo = ".nav-phone .logo";
    let title = ".nav-phone .title";

    // Manages search button sliding on click.
    $(searchBtn).click(function() {
        if (!searching) {
            slideIn();

            // TEMPORARY SOLUTION.
            searching = true;
        } else {
            slideOut();

            // TEMPORARY SOLUTION.            
            searching = false;
        }
        return;
    });

    // Closes elements when clicking on other parts of the website.
    $(document).click(function() {
        // Fades out the language dropdown if it is shown.
        if (!$(".language-dropdown-content").is(":hover") && 
            !$(".language-dropdown-content").is(":hidden") && 
            !$(langBtn).is(":hover")) {

                $(".language-dropdown-content").fadeOut(200);

        // Slides out the search bar if it is shown.
        } else if (!$(searchInput).is(":hover") && 
            !$(searchInput).is(":hidden") && 
            !$(searchBtn).is(":hover")) {

            slideOut();
            searching = false;
        }
    });

    /**
     * @description Controls the slide-in animation for the {selector}.
     * @param {*} selector
     */
    function slideIn(selector = searchInput) {
        // Show and slide in the {selector}.
        $(selector).show();
        $(selector).delay(0).animate({
            "width": "40vw",
            "opacity": .9
        }, 400);
        // Hides logo and title.
        $(logo).addClass("no-display");
        $(title).addClass("no-display");
    };

    /**
     * @description Controls the slide-out animation for the {selector}.
     * @param {*} selector
     */
    function slideOut(selector = searchInput) {
        // Hide and slide away the {selector}.
        $(selector).animate({
            "width": "0",
            "opacity": 0,
        }, 400);
        $(selector).hide(500);
        // Show logo and title.
        $(logo).removeClass("no-display");
        $(title).removeClass("no-display");
    };

    // TEMPORARILY DISABLED UNTIL DESKTOP VIEWPORT IS FINALISED
    // Use the code below for the desktop version (It is the hover version)

    /*
    let langBtn = "#langBtn";

    $(langBtn).hover(
        function() {$(".language-dropdown-content").slideDown("fast");},
        function() {
            if(!$(".language-dropdown-content").is(":hover")){
                $(".language-dropdown-content").slideUp("fast");
            }
    });

    $(".language-dropdown-content").hover(null,function () {
        $(".language-dropdown-content").slideUp("fast");
    });
    */
});