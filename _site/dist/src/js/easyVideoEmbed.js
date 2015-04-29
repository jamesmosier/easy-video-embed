jQuery(function($) {

    //load videos on homepage
    var $input = $("#video-url").text().trim();
    var $output = $("#video-info");

    var url = $input;
    var media = {};

    var youtube = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
    if (youtube && youtube[2].length == 11) {
        media.type = "youtube";
        media.id = youtube[2];
    }
    var vimeo = url.match(/(\.|\/\/)(vimeo\.com\/)[\w\/]*\d*((videos|video|channels)\/)*([\d]+)/);
    if (vimeo) {
        media.type = "vimeo";
        media.id = vimeo[0].substring(vimeo[0].lastIndexOf("/") + 1);
    }
    var mediaLocator = media.type + ":" + media.id;
    if (media.type && $output.val() != mediaLocator) {
        $output.val(mediaLocator);
        var $iframe = $("<iframe></iframe>");
        // $iframe.attr("width", 500)
        //     .attr("height", 300)
        $iframe.attr("frameborder", 0)
            .attr("allowfullscreen", "")
            .attr("mozallowfullscreen", "")
            .attr("webkitallowfullscreen", "")
            .attr("scrolling", "no");
        $iframe.addClass("embed-responsive-item");
        if (media.type == "youtube") {
            $iframe.attr("src", "//www.youtube.com/embed/" + media.id);
        } else if (media.type == "vimeo") {
            $iframe.attr("src", "//player.vimeo.com/video/" + media.id);
        }
        $("#video-target").html($iframe);
    }


    //slick slider (slick.js)
    $(function(){
        $('.webb-slider').slick({
            prevArrow: '<button type="button" class="webb-slick-prev"></button>',
            nextArrow: '<button type="button" class="webb-slick-next"></button>',
            autoplay: true,
            autoplaySpeed: 5000
        });
    });


    //remove extra p tags in footer
    $('.footer-addresses p:empty').remove();


    //headroom.js
    var theHeader = document.getElementById("header");
    new Headroom(theHeader, { offset: 130, tolerance: { up: 20, down: 0 } }).init();

});