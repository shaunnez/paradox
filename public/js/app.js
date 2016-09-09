import '../css/app.scss';
import $ from "jquery";
import './video.js';
import Headroom from './headroom.js';
import bootstrap from '../../node_modules/bootstrap/dist/js/bootstrap.js';
// import 'waypoints';
// import 'scrollTo';

(function() {
    var currentHash = '';
    var scrolling = false;
    var parallaxBgs =  $('.parallax-background');
    var messageInfo = $("#message-info");
    var sections = $("section");
    var links = $('a');
    var navLinks = $('.nav-link');
    var headroomElem = document.querySelector('.headroom');
    var form = $("#form");
    var navMenu = $("#navbar-menu");
    var navToggler = $('.navbar-toggler');

    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(f) {
            setTimeout(f, 1000 / 60);
        };
    
    // begin
    init();

    // helper
    function init() {
        // force go to hero on load
        goToHero();
        // navbar color change handler
        setupHeadroom();
        // update navbar on scroll
        window.addEventListener('scroll', function() {
            requestAnimationFrame(handleScrolling);
        }, false);
        // smooth scroll to element when clicking link with #
        links.on('click', handleLinkClick);
        // form submit handler
        form.on('submit', handleFormSubmit);
        // minor
        $("#hero .parallax-background").css('opacity', 1);
    }

    // force hero to be shown on load
    function goToHero() {
        if(window.location.hash) {
            window.location.hash = 'hero';
            setActiveLink(window.location.hash);
        }
    }

    // navbar javascript listener
    function setupHeadroom() {
        var headroom = new Headroom(headroomElem, {
            "offset": 185,
            "tolerance": 5,
            "classes": {
                "initial": "animated"
            }
        });
        headroom.init();
    }
    
    function isElementInViewport (el, type) {
        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        if(type === 'top') {
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                (rect.top + 50) <= (window.innerHeight || $(window).height()) &&
                rect.right <= (window.innerWidth || $(window).width())
            );
        } else {
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || $(window).height()) &&
                rect.right <= (window.innerWidth || $(window).width())
            );
        }
    }


    // update navbar on scroll
    function handleScrolling() {
        if(scrolling === false) {
            sections.each(function() {
                var hash = $(this).attr('id');
                if (isElementInViewport($(this), 'top')) {
                    var parralax = $("#" + hash).find(".parallax-background");
                    if(parralax.length > 0) {
                        parralax.css('opacity', 1);
                    }
                }
                if (isElementInViewport($(this))) {
                    if(hash === 'contact') {
                        hash = 'contact-form';
                    }
                    currentHash = hash;
                    setActiveLink('#' + currentHash, true);
                }
            })
        }
    }
    // manage active state and scrolling
    function handleLinkClick() {
        var href = $(this).attr('href');
        var isNavLink = $(this).hasClass('nav-link');
        if(href.indexOf('#') > -1) {
            animateToSection(href);
            if(isNavLink) {
                setActiveLink(href);
                closeMobileMenu();
            }
        }
    }

    // utility function
    function setActiveLink(href, pushState) {
        var theNavLink = $('.nav-link[href="' + href + '"]');
        if(theNavLink.length > 0) {
            navLinks.removeClass('text-primary')
            theNavLink.addClass('text-primary');
            if(history.pushState && pushState) {
                history.pushState(null, null, '#' + currentHash);
            }
        }
    }
    // scroll to section
    function animateToSection(href) {
        scrolling = true;
        $('html, body').animate({
            scrollTop: $( href ).offset().top
        }, 500, function() {
            scrolling = false;
        });
    }
    // force mobile menu to collapse
    function closeMobileMenu() {
        if(navMenu.hasClass('in')) {
            navToggler.click();
        }
    }

    // form submit, very basic validation
    function handleFormSubmit(e) {
        var status = '';
        messageInfo.removeClass('bg-primary bg-warning');
        if($('#name').val() != '' && $('#email').val() != '' && $("#message") != '') {
            form.css({ opacity : 0, height: 0 });
            showFormInfo('bg-primary');
        } else {
            e.preventDefault();
            showFormInfo('bg-warning');
            return false;
        }
    }

    // utility
    function showFormInfo(status) {
        messageInfo.css({ opacity : 1, height: 'auto' }).addClass(status);
    }

})();
