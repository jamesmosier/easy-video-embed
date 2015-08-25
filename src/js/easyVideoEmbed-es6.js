'use strict';

var EvePlugin = function(model) {
  this.model = model;
  this.initialize();
};

EvePlugin.prototype.initialize = function() {
  this.establishHandlers();
  this.fetchVideo();
  var elements = this.generateiFrame(this.whatever);
  this.renderVideo(element);
};



module.exports = EvePlugin;
