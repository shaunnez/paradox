// var a = require('../index.handlebars');

import '../css/app.scss';
import $ from "jquery";
import './video.js';
import Headroom from './headroom.js';
import bootstrap from '../../node_modules/bootstrap/dist/js/bootstrap.js';

// import 'waypoints';
// import 'scrollTo';

(function() {
    // parallax
    $('.parallax-background').css('opacity', 1);

    // navbar
    var elem = document.querySelector('.headroom')
    var headroom = new Headroom(elem, {
        "offset": 185,
        "tolerance": 5,
        "classes": {
            "initial": "animated",
            "pinned": "swingInX",
            "unpinned": "swingOutX"
        }
    });
    headroom.init();

    // smoth scroll
    $(document).on('click', 'a', function(event){
        if($(this).attr('href').indexOf('#') > -1) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
        }
    });

    // form
    var messageInfo = $("#message-info");
    $('#form').on('submit', function(e) {
        var status = '';
        messageInfo.removeClass('bg-primary bg-warning');
        if($('#name').val() != '' && $('#email').val() != '' && $("#message") != '') {
            status = 'bg-primary';
            $(this).css({ opacity : 0, height: 0 });
            messageInfo.css({ opacity : 1, height: 'auto' }).addClass(status);
        } else {
            status = 'bg-warning';
            e.preventDefault();
            messageInfo.css({ opacity : 1, height: 'auto' }).addClass(status);
            return false;
        }
    })
})();
