var x = 150;
var y = 150;//a
var dx = 2;
var dy = 4;
var WIDTH;
var HEIGHT;
var r = 10;
var ctx;
var spc=1;
var paddlex;
var paddleh;
var paddlew;
var rightDown = false;
var leftDown = false;
var pDown = false;
var canvasMinX;
var canvasMaxX;
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var tocke;
var sekunde;
var sekundeI;
var minuteI;
var intTimer;
var izpisTimer;
var start = true;
var temp;
var gejmover = true;
var timerTemp = 1;
var gameWin=false;
var isClicked = false;
var brick = new Image();
brick.src = "img/brick.png";
var img = document.getElementById("brick");



function drawIt() {
  if (start) {
    document.getElementById("start").innerHTML = "Restart";
  } else {
    document.getElementById("start").innerHTML = "Start";
  } 
  
  //timer
  function timer(){
sekunde++;

sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
izpisTimer = minuteI + ":" + sekundeI;
$("#cas").html("Time:<br/>" + izpisTimer);
}

/////tipkovnica
  function onKeyDown(evt) {
    if (evt.keyCode == 39 || evt.keyCode == 68) rightDown = true;
    else if (evt.keyCode == 37 || evt.keyCode == 65) leftDown = true;
  }

  function onKeyUp(evt) {
    if (evt.keyCode == 39 || evt.keyCode == 68) rightDown = false;
    else if (evt.keyCode == 37 || evt.keyCode == 65) leftDown = false;
  }
  function onKeyPress(evt) {
    if (evt.keyCode == 80) pDown = true;
    console.log(pDown);
  }
  $(document).keypress(onKeyPress);
  $(document).keydown(onKeyDown);
  $(document).keyup(onKeyUp);

  
  function initbricks() {
    //inicializacija opek
    NROWS = 5;
    NCOLS = 7;
    BRICKWIDTH = WIDTH / NCOLS - 1;
    BRICKHEIGHT = 15;
    PADDING = 2;
    bricks = new Array(NROWS);
    for (i = 0; i < NROWS; i++) {
      bricks[i] = new Array(NCOLS);
      for (j = 0; j < NCOLS; j++) {
        bricks[i][j] = 1;
      }
    }
  }
  function init_paddle() {
    paddlex = WIDTH / 2;
    paddleh = 7;
    paddlew = 100;
  }

  function init() {
	canvasMinX = $("canvas").offset().left;
    canvasMaxX = canvasMinX + WIDTH;
    sekunde = 0;
    izpisTimer = "00:00";
    intTimer = setInterval(timer, 1000);
    tocke = 0;
    $("#tocke").html(tocke);
    ctx = $("#canvas")[0].getContext("2d");
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    return setInterval(draw, 7);
  }

  function circle(x, y, r) {
    ctx.fillStyle = temp;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  }

  function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
  }

  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }
  function draw() {
    clear();

    circle(x, y, 10);
    //omejevanje ploscka, pomik
    if (rightDown) {
      if (paddlex + paddlew < WIDTH) {
        paddlex += 6;
      } else {
        paddlex = WIDTH - paddlew;
      }
    } else if (leftDown) {
      if (paddlex > 0) {
        paddlex -= 6;
      } else {
        paddlex = 0;
      }
    }

    rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

    for (i = 0; i < NROWS; i++) {
      for (j = 0; j < NCOLS; j++) {
        if (bricks[i][j] == 1) {
          rect(
            j * (BRICKWIDTH + PADDING) + PADDING,
            i * (BRICKHEIGHT + PADDING) + PADDING,
            BRICKWIDTH,
            BRICKHEIGHT
          );
        }
      }
    }

    rowheight = BRICKHEIGHT + PADDING; //Smo zadeli opeko?
    colwidth = BRICKWIDTH + PADDING;
    row = Math.floor(y / rowheight);
    col = Math.floor(x / colwidth);
	
	
    //tockovanje
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
      dy = -dy;
      bricks[row][col] = 0;
      tocke += 1;
      if(tocke>=35){
        gameWin=true;
      }
      $("#tocke").html(tocke);
    
      console.log("hit!");
      temp = "hsl(" + 360 * Math.random() + ", 50%, 50%)";
    }

    if (x + dx > WIDTH - r || x + dx < r) {
      dx = -dx;
    }
    if (y + dy < r) {
      dy = -dy;
    } else if (y + dy > HEIGHT - r) {
		//odboj
      if (x > paddlex && x < paddlex + paddlew) {
        dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
        dy = -dy;
        //start=true;
       
       
      } else {
        start = false;
        //clearInterval(IntervalId);
        //console.log("Game Over");
        gejmover = false;
      }
    }

    x += dx;

    y += dy;
    if(gameWin==true){
      gamewon();
      if(spc==1){
     
        spc++;
      }
    }
    if(start==false){
      gameover();
      $(document).off("keydown");
      $(document).off("keyup");
      $(document).off("keypress");
      $(document).off("click");
      dx = 0;
      dy = 0;
      if(spc==1){
   
        spc++;
      }
      
    }
      
  }

  function gameover() {
    clear();
    ctx.fillStyle="black";
    ctx.font = "bold 72px sans-serif";
    ctx.fillText("Game Over", WIDTH / 2 - 200, HEIGHT / 2);
    ctx.font = "bold 36px sans-serif";
    ctx.fillText("Score: " + tocke, WIDTH / 2 - 200, HEIGHT / 2 + 100);
    ctx.fillText("Time: " +izpisTimer, WIDTH / 2 - 200, HEIGHT / 2 + 150);
    start = true;
	//stop the timer
    clearInterval(intTimer);
    paddlex = -100;
    paddlew = 0;
    paddleh = 0;
  }
  function gamewon() {
    clear();
    ctx.fillStyle="black";
    ctx.font = "bold 72px sans-serif";
    ctx.fillText("You Won!", WIDTH / 2 - 200, HEIGHT / 2);  
    ctx.font = "bold 36px sans-serif";
    ctx.fillText("Score: " + tocke, WIDTH / 2 - 200, HEIGHT / 2 + 100);
    ctx.fillText("Time: " +izpisTimer, WIDTH / 2 - 200, HEIGHT / 2 + 150);
    start = true;
    dx=0;
    dy=0;
    //stop the timer
    clearInterval(intTimer);
    paddlex = -100;
    paddlew = 0;
    paddleh = 0;
  }
  
  $("#start").click(function() {
    location.reload();
  });
  init();
  init_paddle();
  initbricks();
}

