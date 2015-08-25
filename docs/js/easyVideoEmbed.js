/**
 * easy-video-embed; version: 1.1.1
 * Author: http://jamesdmosier.com
 * Source: https://github.com/jamez14/easy-video-embed
 * Copyright (c) 2015 James Mosier; MIT License
 * @preserve
 */

;
(function($, window, document, undefined) {

  'use strict';

  // Defaults
  var pluginDef = 'easyvideoembed',
    defaults = {
      videoSource: null,
      responsive: false,
      wideScreen: true,
      width: 560,
      height: 315
    };

  // Constructor
  function EveInit(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginDef;

    this.init();
  }

  // Logic
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
    if (youtube && youtube[2].length === 11) {


      media.type = 'youtube';
      media.id = youtube[2];
    }

    var vimeo = url.match(/(\.|\/\/)(vimeo\.com\/)[\w\/]*\d*((videos|video|channels)\/)*([\d]+)/);
    if (vimeo) {
      media.type = 'vimeo';
      media.id = vimeo[0].substring(vimeo[0].lastIndexOf('/') + 1);
    }

    var mediaLocator = media.type + ':' + media.id;
    if (media.type && ($output.val() !== mediaLocator)) {

      $output.val(mediaLocator);

      //youtube direct lite
      // var videoId = media.id;
      // var container = target;

      // var player = {
      //   playVideo: function(container, videoId) {
      //     if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
      //       window.onYouTubeIframeAPIReady = function() {
      //         player.loadPlayer(container, videoId);
      //       };

      //       $.getScript('//www.youtube.com/iframe_api');
      //     } else {
      //       player.loadPlayer(container, videoId);
      //     }
      //   },

      //   loadPlayer: function(container, videoId) {
      //     new YT.Player(container, {
      //       videoId: videoId,
      //       width: videoWidth,
      //       height: videoHeight,
      //       playerVars: {
      //         autoplay: 1,
      //         controls: 0,
      //         modestbranding: 1,
      //         rel: 0,
      //         showInfo: 0
      //       }
      //     });
      //   }
      // };

      // return player;



      var $iframe = $('<iframe></iframe>');
      $iframe.attr('frameborder', 0)
        .attr('allowfullscreen', '')
        .attr('mozallowfullscreen', '')
        .attr('webkitallowfullscreen', '')
        .attr('scrolling', 'no');

      if (media.type === 'youtube') {
        $iframe.attr('src', '//www.youtube.com/embed/' + media.id);
      } else if (media.type === 'vimeo') {
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

  // Private Helper Functions
  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

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
