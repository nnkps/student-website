
// getting random pastel color
var getPastelColorWithMix = function(m_red, m_green, m_blue) {
  var red, green, blue;
  red = (random(256) + m_red) / 2;
  green = (random(256) + m_green) / 2;
  blue = (random(256) + m_blue) / 2;
  return color(red, green, blue, 99);
};

// class for Ball
function Ball(x, y) {
  this.size = random(5, 25);
  this.x = x || random(width);
  this.y = y || random(height);
  this.color = getPastelColorWithMix(255, 255, 255); // with mix of white
  this.lineColor = random(200, 256);
  this.xspeed = random(-5, 5);
  this.yspeed = random(-5, 5);
  this.distance = function(x, y) {
    return (Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2)))
  };
};

// drawing ball
Ball.prototype.drawBall = function() {
  fill(this.color);
  ellipse(this.x, this.y, this.size, this.size);
};

// moving ball
Ball.prototype.moveBall = function() {
  this.x += this.xspeed;
  this.y += this.yspeed;
  // Check horizontal edges
  if (this.x > width || this.x < 0) {
    this.xspeed *= - 1;
  }
  //Check vertical edges
  if (this.y > height || this.y < 0) {
    this.yspeed *= - 1;
  }
};

// drawing link between two points
var drawLink = function(start_x, start_y, end_x, end_y, color) {
  stroke(color);
  line(start_x, start_y, end_x, end_y);
  noStroke();
};

// processing animation variables
var canvas;
var arrayWithBalls = [];
var current_ball;
var x, y;

//processing setup
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.class("fancyBackground");
  background(255, 255, 255);
  frameRate(10);
  noStroke();
  smooth();
  for (var i = 0; i < 100; i++) {
    var ball = new Ball();
    arrayWithBalls.push(ball);
  }
};

// processing draw
function draw() {
  fill(255, 255, 255);
  rect(0, 0, width, height);

  if (mouseIsPressed) {
    var new_ball = new Ball(mouseX, mouseY);
    arrayWithBalls.push(new_ball);
  }

  x = mouseX;
  y = mouseY;

  for (var i = 0; i < arrayWithBalls.length; i++) {
    current_ball = arrayWithBalls[i];
    current_ball.moveBall();
    current_ball.drawBall();
  }

  arrayWithBalls.sort(function(a, b) { return a.distance(x, y) - b.distance(x, y) }); // sorting by distance

  for (var i = 0; i < 15; i++) {
    drawLink(x, y, arrayWithBalls[i].x, arrayWithBalls[i].y, arrayWithBalls[i].lineColor);
  }

};

// window.onresize = function() {
//   canvas.size(windowWidth, windowHeight);
// };
