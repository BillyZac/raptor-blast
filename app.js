var Canvas = require('canvas')
var fs = require('fs')
var shapes = require('./shapes')
var shape = require('./shape')

var width = process.argv[2]/1 || 200
var height = process.argv[3]/1 || 200

var paletteHSLA = [
  'hsla(340, 2%, 57%, 1)', // gray
  'hsla(254, 43%, 23%, 1)',
  'hsla(269, 29%, 29%, 1)',
  'hsla(283, 29%, 29%, 1)',
  'hsla(320, 15%, 39%, 1)',
  'hsla(286, 22%, 56%, 1)',
  'hsla(4,  10%, 57%, 1)',
  'hsla(45, 75%, 29%, 1)',
  'hsla(13, 60%, 32%, 1)',
  'hsla(44, 66%, 44%, 1)'
]
var verticies = []

var canvas = new Canvas(width, height, 'png')
var ctx = canvas.getContext('2d')
ctx.antialias = 'none'

function drawShape(color, points) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y);
  for (var i=0; i<points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath()
  ctx.fill()
}

for (var i=0; i<15; i++) {
  var hue = 20
  drawShape('hsla(' + hue + ', 70%, 50%, 0.1)', shape(100, 100, 90))
}
for (var i=0; i<20; i++) {
  var hue = 30 + i
  drawShape('hsla(' + hue + ', 70%, 70%, 0.5)', shape(100, 100, 80))
}
for (var i=0; i<10; i++) {
  var hue = 40
  drawShape('hsla(' + hue + ', 70%, 90%, 0.3)', shape(100, 100, 20))
}

function getPixel(x, y) {
  var pixelData = ctx.getImageData(x, y, x+1, y+1).data
  var pixel = {
    r: pixelData[0],
    g: pixelData[1],
    b: pixelData[2],
    a: pixelData[3]
  }
  return pixel
}

function drawBigPixel(x, y, color) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.rect(x-5, y-5, 10, 10)
  ctx.fill()
  ctx.closePath()
}

fs.writeFile('./blast-' + width + 'px-' + height + Date.now() + 'px.png', canvas.toBuffer());

for (var x=0; x<width; x+=10) {
  for (var y=0; y<height; y+=10) {
    var pixel = getPixel(x, y)
    // console.log(pixel)
    drawBigPixel(x, y,
      'rgba(' +
      pixel.r + ',' +
      pixel.g + ',' +
      pixel.b + ',' +
      pixel.a + ')'
    )
  }
}

fs.writeFile('./blast-pixelated-' + width + 'px-' + height + Date.now() + 'px.png', canvas.toBuffer());
