console.log('Oh HAI!');

var Easystar = require('easystarjs').js;
var fakeImageData = require('./fakeImageData');
// Webcam stuff
var Webcam = require('webcamjs');

Webcam.set({
  width: 530,
  height: 400,
  dest_width: 530,
  dest_height: 400,
  crop_width: 530,
  crop_height: 400,
  image_format: 'png'
});

Webcam.attach('#maze-input');
function take_snapshot() {
    Webcam.snap(drawImage);
}

// File upload stuff
function read_localfile() {
  var preview = document.querySelector('#preview');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    drawImage(reader.result);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    drawImage("");
  }
}

//Use fake stuff
function use_fake_data() {
  drawImage(fakeImageData);
}

// display base64 stuff on canvas
const canvasSel = 'maze-canvas';
function drawImage(imgData) {
  localStorage.imgData = imgData;
  var canvas = document.getElementById(canvasSel);
  var ctx = canvas.getContext('2d');
  var img = new Image;
  img.onload = function(){
    let width = img.naturalWidth;
    let height = img.naturalHeight;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
  };
  img.src = imgData; 
}

// handle click events for inputs
document.getElementById('take-photo').addEventListener('click', take_snapshot);
document.getElementById('upload-file').addEventListener('change', read_localfile);
document.getElementById('fake-data').addEventListener('click', use_fake_data);
  
if (localStorage.imgData) {
  drawImage(localStorage.imgData);
}

// this should happen after img drawn!
var canvas = document.getElementById(canvasSel);
var points = {};
canvas.addEventListener('mousedown', function (e) {
  let x = e.pageX - canvas.offsetLeft;
  let y = e.pageY - canvas.offsetTop;
  var ctx = canvas.getContext('2d');

  let drawPoint = ({x, y}, color = "red") => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 5, 5);
  };  
  
  if (!points.start) {
    points.start = {x, y};
    drawPoint({x,y});
    // making assumption start is on top
    // cutOff('above', points.start.y - 1, ctx);
  } else if (!points.finish) {
    points.finish = {x, y};
    // drawPoint({x,y}, "green");
    // making assumption end is on bottom
    // cutOff('below', points.finish.y + 5, ctx);
  }

  if (points.start && points.finish) {
    let imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
    drawPoint(points.start, "white");
    solve(points, imageData);
  }
});

function drawData(data) {
  let ctx = canvas.getContext('2d');
  ctx.putImageData(data, 0, 0);
}
function cutOff(direction, pointY, ctx) {
  ctx.fillStyle = 'black';
  let startY = (direction == 'above') ? 0 : pointY;
  let endY = (direction == 'above') ? pointY : canvas.height;
  ctx.fillRect(0, startY, canvas.width, endY);
}
var threshold = 100;
document.getElementById('threshold').value = threshold;
document.getElementById('threshold').addEventListener('change', function (e) {
  threshold = this.value;
});
function isWalkable({r, g, b, a}) {
 return [r, g, b].every((val) => val < threshold);
}
function solve({start, finish}, frame) {
  let o = {};
  let resultMatrix = [];
  for (var i = 0,l=frame.data.length/4; i < l; i++) {
    o.r = frame.data[i * 4 + 0];
    o.g = frame.data[i * 4 + 1];
    o.b = frame.data[i * 4 + 2];
    o.a = frame.data[i * 4 + 3];

    let result = isWalkable(o);
    var row = Math.floor(i / frame.width);
    var column = i % frame.width;
    if (!resultMatrix[row]) {
      resultMatrix[row] = [];
    }
    resultMatrix[row][column] = ~~result;
    frame.data[i * 4 + 0] = result ? 0 : 255;
    frame.data[i * 4 + 1] = result ? 0 : 255;
    frame.data[i * 4 + 2] = result ? 0 : 255;
    frame.data[i * 4 + 3] = 255;
  }
  drawData(frame);
  var solver = new Easystar();
  solver.setGrid(resultMatrix);
  solver.setAcceptableTiles([0]);
  console.time('solving');
  solver.findPath(points.start.x, points.start.y, points.finish.x, points.finish.y, function (path) {
    console.timeEnd('solving');
    if (path === null) {
      alert("Path was not found.");
    } else {
      displayResult(path);
    }
  });
  solver.calculate();
}

function displayResult(path) {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'red';
  for (var pixel of path) {
    ctx.fillRect(pixel.x, pixel.y, 1, 1);
  }
}
// display result