var Canvas = require('canvas'),
  defaultConfig = {
    maxWidth : 8000,
    maxHeight : 8000,
    backgroundStyle : '#CCC',
    textStyle : '#FFF',
    fontFamily : 'Impact',
    fontSizeParam : 5
  };


module.exports = function (width, height) {
  var config = {};

  for(k in defaultConfig) {
    config[k] = defaultConfig[k];
  }
  canvas = new Canvas(width, height);
  ctx = canvas.getContext('2d');
  fontSize = Math.round(Math.min(width/config.fontSizeParam,height));

  ctx.save();
  ctx.fillStyle = config.backgroundStyle;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();

  ctx.save();
  ctx.font = fontSize + 'px ' + config.fontFamily;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = config.textStyle;
  ctx.fillText(width + '×' + height, width / 2, height / 2 - fontSize * 0.1);
  ctx.restore();
  return canvas.toBuffer();
}
