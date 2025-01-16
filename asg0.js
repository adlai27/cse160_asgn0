// asg0.js
var ctx;
var canvas;

function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('asg0');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

  ctx = canvas.getContext('2d');

  // Black background for Cavas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  // Default red vector so it appears on page load
  let defaultV1 = new Vector3([2.25, 2.25, 0]);
  drawVector(defaultV1, "red");
}

function drawVector(v, color) {
  ctx.strokeStyle = color; 
  ctx.beginPath();
  // start from center 
  ctx.moveTo(canvas.width / 2, canvas.height / 2);
  // scale the x by 20, scale the y by 20 
  ctx.lineTo(
    canvas.width / 2 + v.elements[0] * 20,
    canvas.height / 2 - v.elements[1] * 20
  );
  ctx.stroke();
}

function handleDrawEvent() {
  // Read coordinates for v1
  let x1 = parseFloat(document.getElementById('xcoord').value) || 0;
  let y1 = parseFloat(document.getElementById('ycoord').value) || 0;
  let z1 = parseFloat(document.getElementById('zcoord').value) || 0;

  // Read coordinates for v2
  let x2 = parseFloat(document.getElementById('xcoord2').value) || 0;
  let y2 = parseFloat(document.getElementById('ycoord2').value) || 0;
  let z2 = parseFloat(document.getElementById('zcoord2').value) || 0;

  // Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  // Drawing vectors
  let v1 = new Vector3([x1, y1, z1]);
  drawVector(v1, "red");

  let v2 = new Vector3([x2, y2, z2]);
  drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
  // Read coordinates for v1
  let x1 = parseFloat(document.getElementById('xcoord').value) || 0;
  let y1 = parseFloat(document.getElementById('ycoord').value) || 0;
  let z1 = parseFloat(document.getElementById('zcoord').value) || 0;

  // Read coordinates for v2
  let x2 = parseFloat(document.getElementById('xcoord2').value) || 0;
  let y2 = parseFloat(document.getElementById('ycoord2').value) || 0;
  let z2 = parseFloat(document.getElementById('zcoord2').value) || 0;

  // Clear Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 400, 400);

  // Draw v1 (red) and v2 (blue)
  let v1 = new Vector3([x1, y1, z1]);
  drawVector(v1, "red");
  let v2 = new Vector3([x2, y2, z2]);
  drawVector(v2, "blue");

  let operator = document.getElementById('opt').value;

  if (operator === "Add") {
    // v3 = v1 + v2 (in-place on v1)
    v1.add(v2);
    drawVector(v1, "green");
  } else if (operator === "Subtract") {
    // v3 = v1 - v2
    v1.sub(v2);
    drawVector(v1, "green");
  } else if (operator === "Multiply") {
    // v3 = v1*s, v4 = v2*s
    let scalar = parseFloat(document.getElementById('scalar').value) || 1;
    v1.mul(scalar);
    drawVector(v1, "green");
    v2.mul(scalar);
    drawVector(v2, "green");
  } else if (operator === "Divide") {
    // v3 = v1 / s, v4 = v2 / s
    let scalar = parseFloat(document.getElementById('scalar').value) || 1;
    v1.div(scalar);
    drawVector(v1, "green");
    v2.div(scalar);
    drawVector(v2, "green");
  } else if (operator === "Mag") {
    // Print magnitudes to console
    console.log("Magnitude of v1: " + v1.magnitude().toFixed(2));
    console.log("Magnitude of v2: " + v2.magnitude().toFixed(2));
  } else if (operator === "Norm") {
    // Draw normalized v1, v2 in green
    let v1n = v1.normalize();
    drawVector(v1n, "green");
    let v2n = v2.normalize();
    drawVector(v2n, "green");
  } else if (operator === "Ang") {
    // Angle between v1, v2
    console.log("Angle: " + angleBetween(v1, v2).toFixed(2) + " degrees");
  } else if (operator === "Area") {
    // Area of triangle spanned by v1, v2
    console.log("Area of the triangle: " + areaTriangle(v1, v2).toFixed(2));
  }
}

// Helper function to compute angle between vectors:
function angleBetween(v1, v2) {
  let m1 = v1.magnitude();
  let m2 = v2.magnitude();
  let d = Vector3.dot(v1, v2);
  if (m1 === 0 || m2 === 0) {
    return 0; 
  }
  let alpha = Math.acos(d / (m1 * m2));
  return alpha * (180 / Math.PI);     
}

// Helper function to compute area of triangle formed by v1, v2:
function areaTriangle(v1, v2) {
  let crossVec = Vector3.cross(v1, v2);
  return crossVec.magnitude() / 2;
}
