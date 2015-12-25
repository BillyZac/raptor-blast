module.exports = function(xPosition, yPosition, radius) {
  var theta = Math.random() * 2 * Math.PI // A number between 0 and 2*PI

  return {
    x: xPosition + radius * Math.cos(theta),
    y: yPosition + radius * Math.sin(theta)
  }
}
