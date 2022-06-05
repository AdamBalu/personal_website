(function ($) {
    var imgWrapper = $('.shadow'),
        startingOpacity = imgWrapper.find('img').css('opacity'),
        overlay = $('<div/>', { id: 'overlay' }),
        navigation = $(".nav-list, .project-wrapper"),
        navLinks = navigation.find('a'),
        navHeight = $('.nav-list').height() - 2,
        win = $(window),
        toTopArrow = $('<a>', {
            href: '#',
            class: 'back-to-top-icon',
            html: '<i class="fa fa-caret-up"></i>'
        }),
        ddContent = $('.dropdown-content'),
        navContent = $('.nav-list');

    imgWrapper.find('img').on('mouseenter mouseleave', function (event) {
        var opacity = event.type === 'mouseenter' ? 1 : startingOpacity;
        $(this).stop().fadeTo(250, opacity);
    });

    overlay.appendTo('body').hide();
    imgWrapper.find('a').on('click', function (event) {
        var imgLink = $(this).attr('href'),
            image = $('<img>', {src: imgLink, alt: 'img'});
        overlay.html(image).show();
        event.preventDefault();
    });
    overlay.on('click', function () {
        $(this).hide();
    });

    /* close lightbox when pressing ESC */
    $(document).on('keyup', function (event) {
        if (event.which === 27) {
            overlay.hide();
        }
    });

    /* smooth scroll */
    navLinks.on('click', function (event) {
        $('body,html').animate({ scrollTop: $(this.hash).offset().top - navHeight}, 700);
        event.preventDefault();
    });

    /*
        NAVBAR COLORS
     */

    function navColors(color) {
        var nav = $(".main-nav, .dropdown-content");
        if (color === 0) {
            nav.css("background", "#252332");
            nav.find('a').css("color", "rgba(42, 237, 24, 0.7)");
        } else {
            nav.css("background", "#FAF7FF");
            nav.find('a').css("color", "#1e731f");
        }
    }
    win.on('scroll', function () {
        var projectOffset = $('#projects').offset().top,
            hobbiesOffset = $('#hobbies').offset().top - 56,
            contactOffset = $('#contact').offset().top,
            dark = 0,
            light = 1;

        if (win.scrollTop() <= projectOffset) {
            navColors(dark);
        } else if (win.scrollTop() >= projectOffset && win.scrollTop() <= hobbiesOffset) {
            navColors(light);
        } else if (win.scrollTop() >= hobbiesOffset && win.scrollTop() <= contactOffset) {
            navColors(dark);
        } else {
            navColors(light);
        }
    });

    /*
        SCROLLING TO THE TOP (arrow click)
     */
    toTopArrow.hide()
              .appendTo('html')
              .on('click', function (event) {
            event.preventDefault();
            $('html').animate({ scrollTop: 0 });
        });

    win.on('scroll', function () {
        if (win.scrollTop() > 1000) {
            toTopArrow.fadeIn();
        } else { toTopArrow.fadeOut(); }
    });

    function navChangeType() {
        var siteWidth = win.width();
        navContent.on('mouseleave', function () {
            ddContent.slideUp(400);
        });
        if (siteWidth <= 750) {
            $('.nav-list').hide();
            $('.hamburger').show();
        } else {
            $('.nav-list').show();
            $('.hamburger').hide();
        }
    }

    navChangeType();
    win.resize(function () {
        navChangeType();
    });

    $('.hamburger').on('click', function (event) {
        event.preventDefault();
        var nav = $('.nav-list');
        if (nav.css('display') === 'none') {
            $('.nav-list').slideDown(400);
        } else {
            $('.nav-list').slideUp(400);
        }

    });

    $('#dropdown-link').on('click', function () {
        if (ddContent.css('display') === 'none') {
            ddContent.slideDown(400);
            ddContent.css('display', 'block');
        } else {
            ddContent.slideUp(400);
        }
    });

    setInterval(function () {
        var firstSkill = $('.skill-list').children(':first');
        firstSkill.fadeOut(3000, function () {
            $('.skill-list').append(firstSkill);
            firstSkill.fadeIn(7000);
        });
    }, 2000);
})(jQuery);
