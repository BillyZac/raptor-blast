var point = require('./randomPointOnACircle')
function makeShape(xPosition, yPosition, radius) {
  var shape = []
  shape.push(point(xPosition, yPosition, radius))
  shape.push(point(xPosition, yPosition, radius))
  shape.push(point(xPosition, yPosition, radius))
  return shape
}

module.exports = makeShape
