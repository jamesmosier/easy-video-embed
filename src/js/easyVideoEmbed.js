/**
 * easy-video-embed; version: 1.1.1
 * Author: http://jamesdmosier.com
 * Source: https://github.com/jamez14/easy-video-embed
 * Copyright (c) 2015 James Mosier; MIT License
 * @preserve
 */

//http://www.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
;
(function($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.

    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'easyVideoEmbed',
        defaults = {
            videoSource: null
        };

    // The actual plugin constructor
    function easyVideoEmbed(element, options) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    easyVideoEmbed.prototype.init = function() {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options

        var $elem = this.element;
        var $source = this.options.videoSource;

        //load videos on homepage
        var $input = $source.text().trim();
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

            $elem.html($iframe);
        }

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[easyVideoEmbed] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new easyVideoEmbed(this, options));
            }
        });
    }

})(jQuery, window, document);

















// (function($) {

//     //load videos on homepage
//     var $input = $("#video-url").text().trim();
//     var $output = $("#video-info");

//     var url = $input;
//     var media = {};

//     var youtube = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/);
//     if (youtube && youtube[2].length == 11) {
//         media.type = "youtube";
//         media.id = youtube[2];
//     }
//     var vimeo = url.match(/(\.|\/\/)(vimeo\.com\/)[\w\/]*\d*((videos|video|channels)\/)*([\d]+)/);
//     if (vimeo) {
//         media.type = "vimeo";
//         media.id = vimeo[0].substring(vimeo[0].lastIndexOf("/") + 1);
//     }
//     var mediaLocator = media.type + ":" + media.id;
//     if (media.type && $output.val() != mediaLocator) {
//         $output.val(mediaLocator);
//         var $iframe = $("<iframe></iframe>");
//         // $iframe.attr("width", 500)
//         //     .attr("height", 300)
//         $iframe.attr("frameborder", 0)
//             .attr("allowfullscreen", "")
//             .attr("mozallowfullscreen", "")
//             .attr("webkitallowfullscreen", "")
//             .attr("scrolling", "no");
//         $iframe.addClass("embed-responsive-item");
//         if (media.type == "youtube") {
//             $iframe.attr("src", "//www.youtube.com/embed/" + media.id);
//         } else if (media.type == "vimeo") {
//             $iframe.attr("src", "//player.vimeo.com/video/" + media.id);
//         }
//         $("#video-target").html($iframe);
//     }


// })(jQuery);

