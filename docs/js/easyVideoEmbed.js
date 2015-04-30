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

    'use strict';

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
    var pluginDef = 'easyvideoembed',
        defaults = {
            videoSource: null,
            responsive: false,
            wideScreen: true,
            width: 560,
            height: 315
        };

    // The actual plugin constructor
    function EveInit(element, options) {
        this.element = element;

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginDef;

        this.init();
    }

    EveInit.prototype.init = function() {

        var target = this.element;
        var source = this.options.videoSource;
        var isResponsive = this.options.responsive;
        var isWideScreen = this.options.wideScreen;
        var videoWidth = this.options.width;
        var videoHeight = this.options.height;
        var media = {};

        var url = $(source).val();

        if (isEmptyOrSpaces(url)) {
            url = $(source).text().trim();
        }

        var $outputElem = $('<input>').attr({
            type: 'hidden',
            id: 'easyVideoEmbedMediaHidden',
        });

        $('body').append($outputElem);

        var $output = $('#easyVideoEmbedMediaHidden');

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
        if (media.type && ($output.val() != mediaLocator)) {

            $output.val(mediaLocator);

            var $iframe = $('<iframe></iframe>');
            $iframe.attr('frameborder', 0)
                .attr('allowfullscreen', '')
                .attr('mozallowfullscreen', '')
                .attr('webkitallowfullscreen', '')
                .attr('scrolling', 'no');


            if (media.type == 'youtube') {
                $iframe.attr('src', '//www.youtube.com/embed/' + media.id);
            } else if (media.type == "vimeo") {
                $iframe.attr('src', '//player.vimeo.com/video/' + media.id);
            }

            if (isResponsive) {

                $iframe.wrap('<div style="display: block; height: 0; overflow: hidden; padding: 0; position: relative; padding-bottom:' + (isWideScreen ? '56.25%' : '75%') + ';"></div>').parent().appendTo(target);

                $iframe.css({
                    'position': 'absolute',
                    'top': '0',
                    'bottom': '0',
                    'left': '0',
                    'width': '100%',
                    'height': '100%',
                    'border': '0'
                });

            } else {
                $iframe.css({
                    'width': videoWidth,
                    'height': videoHeight
                });
                $iframe.appendTo(target);
            }
        }

    };

    function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginDef] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginDef)) {
                $.data(this, 'plugin_' + pluginDef,
                    new EveInit(this, options));
            }
        });
    };

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