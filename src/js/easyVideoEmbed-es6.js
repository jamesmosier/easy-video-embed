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

var EvePlugin = function(elem, options) {
  // var settings = _.extend(defaults, options);
  this.initialize(elem, options);
};

EvePlugin.prototype.initialize = function(elem, opts) {
  // this.establishHandlers();
  // this.fetchVideo();
  // var elements = this.generateiFrame(this.whatever);
  // this.renderVideo(element);


  this.element = elem;

  this.options = $.extend({}, defaults, opts);

  this._defaults = defaults;
  this._name = pluginDef;


  this.doWork();
};

EvePlugin.prototype.doWork = function() {

  var target = this.element;
  var source = this.options.videoSource;
  var isResponsive = this.options.responsive;
  var isWideScreen = this.options.wideScreen;
  var videoWidth = this.options.width;
  var videoHeight = this.options.height;
  var media = {};

  var url = source.value;

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

// module.exports = EvePlugin;
window.EvePlugin = EvePlugin;