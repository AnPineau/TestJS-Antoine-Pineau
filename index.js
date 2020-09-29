const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = 1024, canvasHeight = 768;
canvas.width = canvasWidth;
canvas.height = canvasHeight;

document.addEventListener('mousedown', handleMouseDown, false);
document.addEventListener('mouseup', handleMouseUp, false);
document.addEventListener('mousemove', handleMouseMove, false);


// Mouse
let mouseX, mouseY, lastMouseX, lastMouseY;
let circleMoving = null;

// Closest & text
let textX = 30, textY = 50;
let text = 'Move the circles around';

// Circles
const blackDot = {
  x: canvasWidth/2,
  y: canvasHeight/2,
  radius: 20,
  color: 'black'
}
const blueCircle = {
  x: 500,
  y: 500,
  radius: 40,
  color: 'blue',
  border: 5
};
const redCircle = {
  x: 700,
  y: 700,
  radius: 40,
  color: 'red',
  border: 5
};
const yellowCircle = {
  x: 100,
  y: 200,
  radius: 40,
  color: 'yellow',
  border: 5
};

const circles = [blueCircle, redCircle, yellowCircle];

// Draw function
function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // Text
  ctx.fillStyle = 'black';
  ctx.font = '30px Arial';
  ctx.fillText(text, textX, textY);
  // Black dot
  ctx.fillStyle = blackDot.color;
  ctx.beginPath();
  ctx.arc(blackDot.x, blackDot.y, blackDot.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  // Circles
  for (circle of circles) {
    ctx.fillStyle = circle.color;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = circle.border;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}


// Event listeners

function handleMouseDown(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  
  for (circle of circles) {
    if (isMouseOnCircle(circle))
      circleMoving = circle;
  }
}

function handleMouseUp(e) {
  circleMoving = null;
}

function handleMouseMove(e) {
  if (!circleMoving) return;
  
  // New circle coordinates
  const newX = circleMoving.x + (mouseX - lastMouseX);
  const newY = circleMoving.y + (mouseY - lastMouseY);
  
  // Checks if it's inbound
  if (newX >= 0 + circleMoving.radius && 
      newX <= canvasWidth - circleMoving.radius &&
      newY >= 0 + circleMoving.radius &&
      newY <= canvasHeight - circleMoving.radius) {
        circleMoving.x = newX;
        circleMoving.y = newY;
  }
  
  updateClosest(); // Checks the closest circle
  
  draw();
  
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  mouseX = e.clientX;
  mouseY = e.clientY;
  
}

draw();
  

// Utils
function isMouseOnCircle(circle) {
  const Vx = mouseX - circle.x;
  const Vy = mouseY - circle.y;
  if (Math.hypot(Vx, Vy) < circle.radius) // Pythagore
    return true;
  return false;
}

function updateClosest() {
  let closestDistance = Infinity;
  let closestCircle;
  for (circle of circles) {
    const Vx = circle.x - blackDot.x;
    const Vy = circle.y - blackDot.y;
    const distance = Math.hypot(Vx, Vy) - circle.radius; // Pythagore pour calculer la distance
    if (distance < closestDistance) {
      closestDistance = distance;
      closestCircle = circle;
    }
  }
  text = 'Closest : ' + closestCircle.color;
}