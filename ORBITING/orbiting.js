// JUST ORBITING BY
// By Heewon Ahn

const canvas = document.getElementById("canvas");
const canvas2 = document.getElementById("canvas2")
const canvas3 = document.getElementById("canvas3")


const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');
const ctx3 = canvas3.getContext('2d');



canvas.height = window.innerHeight;
canvas2.height = window.innerHeight;
canvas3.height = window.innerHeight;



canvas.width = window.innerWidth;
canvas2.width = window.innerWidth;
canvas3.width = window.innerWidth;


var centerx = canvas.width/2;
var centery = canvas.height/2;

if (window.innerHeight < window.innerWidth){

  var scl = 0.00010*canvas.height; // The scale factor helps to adjust for different screen sizes 

}else{

  var scl = 0.00010*canvas.width;
}

var showStats = false;

var startScene = true;


const deadMessages = ["DEAD", "Are you serious?", "How are you this bad..?", "Try again.", "Wow...", "You've got to be joking.", "I'll wait.", "You're truly terrible.", "Come ON.", "It's not that hard", "Loser...", "Only 35631 more tries.", "Worst one yet"];

var randi = Math.floor(Math.random() * deadMessages.length);

var winMessage = false;

var timeCounter = 0;
var countdown = 3;

var paused = false;

var Lvl = 1;


const player = {

  x: 0,
  y: 0,

  radius: canvas.height*0.4,

  theta: Math.PI*3/2,

  level: 1,

  size: 100*scl,

  dead: false,
  win: false

};

const orbits = {

  one: scl*4500,

  two: scl*3600,

  three: scl*2600,

  four: scl*1600
}


const enemy = {

  size: player.size,

  width: 400*scl,
  height: 400*scl,

  thetaOne: 0,
  thetaTwo: 0,
  thetaThree: 0,
  thetaFour: 0,

  plusA: Math.PI*3/2,
  plusB: Math.PI/6,
  plusC: Math.PI*5/6,

  one: {
    x: 0,
    y: 0,
  },

  two: {
    x: 0,
    y: 0,
  },

  three: {
    x: 0,
    y: 0,
  },

  four: {
    x: 0,
    y: 0,
  },

  five: {
    x: 0,
    y: 0,
  },

  six: {
    x: 0,
    y: 0,
  },

  seven: {
    x: 0,
    y: 0,
  },

  eight: {
    x: 0,
    y: 0
  },

  nine: {
    x: 0,
    y: 0,
  },

  ten: {
    x: 0,
    y: 0,
  },

  eleven: {
    x: 0,
    y: 0,
  },

  twelve: {
    x: 0,
    y: 0,
  }

}


const coin = {

    one: {
        x: 0,
        y: 0,
        theta: Math.random()*Math.PI*2,
        captured: false
      },
    
      two: {
        x: 0,
        y: 0,
        theta: Math.random()*Math.PI*2,
        captured: false
      },
    
      three: {
        x: 0,
        y: 0,
        theta: Math.random()*Math.PI*2,
        captured: false
      },
    
      four: {
        x: 0,
        y: 0,
        theta: Math.random()*Math.PI*2,
        captured: false
      },
    
      five: {
        x: 0,
        y: 0,
        theta: Math.random()*Math.PI*2,
        captured: false
      },
    
      six: {
        x: 0,
        y: 0,
        theta: Math.random()*Math.PI*2,
        captured: false
      },
    
      seven: {
        x: 0,
        y: 0,
        theta: Math.random()*Math.PI*2,
        captured: false
      },
    
      eight: {
        x: 0,
        y: 0,
        theta: Math.random()*Math.PI*2,
        captured: false
      },
      nine: {
        x: 0,
        y: 0,
        theta: Math.random()*Math.PI*2,
        captured: false
      },
      ten: {
        x: 0,
        y: 0,
        theta: Math.random()*Math.PI*2,
        captured: false
      },


}

const planet = {

    size: 1000*scl
}

  const planetImg = new Image();

    
 



const bgstar = {

    one: {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: player.size*5
      },

    two: {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: player.size*3
      },

    three: {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: player.size*4
      },

    four: {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: player.size*10
      },

    five: {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: player.size*7
      },

    six: {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: player.size*2
      },

    seven: {
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        size: player.size*6
      },

    

}



// Handle Input

const controller = {

  left:false,
  right:false,
  up:false,
  down: false,
  fire: false,
  pause: false,

  keyListener:function(event) {

    var key_down = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// Left

      
        controller.left = key_down;
        break;

      case 39:// Right

        controller.right = key_down;
        break;

      case 38:// Up

        player.level += 1;
       
        break;
      
      case 40: // Down
        player.level -= 1;
        break;

      case 83: // S Key
        showStats = true;
        break;

      case 88: // X Key
        showStats = false;
        break;

      case 32: // Spacebar
        controller.pause = key_down;
        break;

    }
  }
}

// Mobile Button controls

var left = document.getElementById("left-btn")
var right = document.getElementById("right-btn")
var up = document.getElementById("up-btn")
var down = document.getElementById("down-btn")

left.addEventListener("mousedown", function(){

  controller.left = true;
})

left.addEventListener("mouseup", function(){

  controller.left = false;
})

right.addEventListener("mousedown", function(){

  controller.right = true;
})

right.addEventListener("mouseup", function(){

  controller.right = false;
})

up.addEventListener("mousedown", function(){

  player.level +=1;
})

down.addEventListener("mousedown", function(){

  player.level -= 1;
})




// Main Animation Loop

const loop = function(time) {


  window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    canvas3.width = window.innerWidth;
    canvas3.height = window.innerHeight;
  });

  // Handle Input

 
  if (controller.up){

    player.level += 1;
    paused = false;
  }


  if (controller.down){

    player.level -= 1;
    paused = false;
  }

 

  if (controller.left) {

    switch (player.radius){

      case orbits.one:
        player.theta += 0.02;
        break;

      case orbits.two:
        player.theta += 0.02;
        break;

      case orbits.three:
        player.theta += 0.03;
        break;

      case orbits.four:
        player.theta += 0.04;
        break;
    }

    paused = false;

  }

  if (controller.right) {

    switch (player.radius){

      case orbits.one:
        player.theta -= 0.02;
        break;

      case orbits.two:
        player.theta -= 0.02;
        break;

      case orbits.three:
        player.theta -= 0.03;
        break;

      case orbits.four:
        player.theta -= 0.04;
        break;
    }


    paused = false;
  }

  if (controller.pause){

    paused = true;
  }



  player.x = -player.radius*Math.cos(player.theta) + centerx;
  player.y = -player.radius*Math.sin(player.theta) + centery;

  // Inter-Orbit Movement
  // Bit sloppy, but it works


    if (player.level < 1){

      player.level = 1;
  
    }else if (player.level === 1){
  
      player.radius = orbits.one;
  
    }else if (player.level === 2){
  
      player.radius = orbits.two;
  
    }else if (player.level === 3){
  
      player.radius = orbits.three;
  
    }else if (player.level === 4){
  
      player.radius = orbits.four;
  
    }else if (player.level > 4){
  
      player.level = 4;
    }

  

  // ENEMIES
  
  if (startScene || player.dead){

    enemy.thetaOne += 0.001;
    enemy.thetaTwo -= 0.001;
    enemy.thetaThree += 0.001;
    enemy.thetaFour -= 0.001;

  }else if (paused){
 
    enemy.thetaOne += 0;
    enemy.thetaTwo -= 0;
    enemy.thetaThree += 0;
    enemy.thetaFour -= 0;

  }else { 

    switch (Lvl){

        case 1:
            enemy.thetaOne += 0.02;
            enemy.thetaTwo -= 0.02;
            enemy.thetaThree += 0.03;
            enemy.thetaFour -= 0.04;
            break;

        case 2:
            enemy.thetaOne -= 0.022;
            enemy.thetaTwo += 0.022;
            enemy.thetaThree -= 0.031;
            enemy.thetaFour += 0.041;
            break;

        case 3:
            enemy.thetaOne += 0.023;
            enemy.thetaTwo -= 0.024;
            enemy.thetaThree += 0.033;
            enemy.thetaFour -= 0.044;
            break;
      }
  }

  switch (Lvl){

    case 1:
        enemy.size = player.size;
        break;

    case 2:
        enemy.size = player.size*1.5;
        break;

    case 3:
        enemy.size = player.size*2;
        break;
  }

  

    

  enemy.one.x = -orbits.one * Math.cos(enemy.thetaOne + enemy.plusA) + centerx;
  enemy.one.y = orbits.one * Math.sin(enemy.thetaOne + enemy.plusA) + centery;

  enemy.two.x = -orbits.one * Math.cos(enemy.thetaOne + enemy.plusB) + centerx;
  enemy.two.y = orbits.one * Math.sin(enemy.thetaOne + enemy.plusB) + centery;

  enemy.three.x = -orbits.one * Math.cos(enemy.thetaOne + enemy.plusC) + centerx;
  enemy.three.y = orbits.one * Math.sin(enemy.thetaOne + enemy.plusC) + centery;

  enemy.four.x = -orbits.two * Math.cos(enemy.thetaTwo + enemy.plusA) + centerx;
  enemy.four.y = orbits.two * Math.sin(enemy.thetaTwo + enemy.plusA) + centery; 

  enemy.five.x = -orbits.two * Math.cos(enemy.thetaTwo + enemy.plusB) + centerx;
  enemy.five.y = orbits.two * Math.sin(enemy.thetaTwo + enemy.plusB) + centery;

  enemy.six.x = -orbits.two * Math.cos(enemy.thetaTwo + enemy.plusC) + centerx;
  enemy.six.y = orbits.two * Math.sin(enemy.thetaTwo + enemy.plusC) + centery;

  enemy.seven.x = -orbits.three * Math.cos(enemy.thetaThree + enemy.plusA) + centerx;
  enemy.seven.y = orbits.three * Math.sin(enemy.thetaThree + enemy.plusA) + centery;

  enemy.eight.x = -orbits.three * Math.cos(enemy.thetaThree + enemy.plusB) + centerx;
  enemy.eight.y = orbits.three * Math.sin(enemy.thetaThree + enemy.plusB) + centery;

  enemy.nine.x = -orbits.three * Math.cos(enemy.thetaThree + enemy.plusC) + centerx;
  enemy.nine.y = orbits.three * Math.sin(enemy.thetaThree + enemy.plusC) + centery;

  enemy.ten.x = -orbits.four * Math.cos(enemy.thetaFour + enemy.plusA) + centerx;
  enemy.ten.y = orbits.four * Math.sin(enemy.thetaFour + enemy.plusA) + centery;

  enemy.eleven.x = -orbits.four * Math.cos(enemy.thetaFour + enemy.plusB) + centerx;
  enemy.eleven.y = orbits.four * Math.sin(enemy.thetaFour + enemy.plusB) + centery;

  enemy.twelve.x = -orbits.four * Math.cos(enemy.thetaFour + enemy.plusC) + centerx;
  enemy.twelve.y = orbits.four * Math.sin(enemy.thetaFour + enemy.plusC) + centery;


  // COINS

  if (!paused){
    
    switch (Lvl){

      case 1:
        coin.one.theta += 0.002;
        coin.two.theta += 0.002;
        coin.three.theta -= 0.002;
        coin.four.theta -= 0.002;
        coin.five.theta -= 0.002;
        coin.six.theta += 0.002;
        coin.seven.theta += 0.002;
        coin.eight.theta -= 0.002;
        coin.nine.theta -= 0.002;
        coin.ten.theta -= 0.002;
        break;

      case 2:
        coin.one.theta += 0.003;
        coin.two.theta += 0.003;
        coin.three.theta -= 0.003;
        coin.four.theta -= 0.003;
        coin.five.theta -= 0.003;
        coin.six.theta += 0.003;
        coin.seven.theta += 0.003;
        coin.eight.theta -= 0.003;
        coin.nine.theta -= 0.003;
        coin.ten.theta -= 0.003;
        break;

      case 3:
        coin.one.theta -= 0.004;
        coin.two.theta -= 0.004;
        coin.three.theta += 0.004;
        coin.four.theta += 0.004;
        coin.five.theta += 0.004;
        coin.six.theta -= 0.004;
        coin.seven.theta -= 0.004;
        coin.eight.theta += 0.004;
        coin.nine.theta += 0.004;
        coin.ten.theta += 0.004;
        break;

    }
    
  }


  coin.one.x = -orbits.one * Math.cos(coin.one.theta) + centerx;
  coin.one.y = -orbits.one * Math.sin(coin.one.theta) + centery;

  coin.two.x = -orbits.one * Math.cos(coin.two.theta) + centerx;
  coin.two.y = -orbits.one * Math.sin(coin.two.theta) + centery;

  coin.three.x = -orbits.two * Math.cos(coin.three.theta) + centerx;
  coin.three.y = -orbits.two * Math.sin(coin.three.theta) + centery;

  coin.four.x = -orbits.two * Math.cos(coin.four.theta) + centerx;
  coin.four.y = -orbits.two * Math.sin(coin.four.theta) + centery;

  coin.five.x = -orbits.two * Math.cos(coin.five.theta) + centerx;
  coin.five.y = -orbits.two * Math.sin(coin.five.theta) + centery;

  coin.six.x = -orbits.three * Math.cos(coin.six.theta) + centerx;
  coin.six.y = -orbits.three * Math.sin(coin.six.theta) + centery;

  coin.seven.x = -orbits.three * Math.cos(coin.seven.theta) + centerx;
  coin.seven.y = -orbits.three * Math.sin(coin.seven.theta) + centery;
  
  coin.eight.x = -orbits.four * Math.cos(coin.eight.theta) + centerx;
  coin.eight.y = -orbits.four * Math.sin(coin.eight.theta) + centery;

  coin.nine.x = -orbits.four * Math.cos(coin.nine.theta) + centerx;
  coin.nine.y = -orbits.four * Math.sin(coin.nine.theta) + centery;

  coin.ten.x = -orbits.four * Math.cos(coin.ten.theta) + centerx;
  coin.ten.y = -orbits.four * Math.sin(coin.ten.theta) + centery;

  // BG STARS

  bgstar.one.x += 3;
  bgstar.one.y += 3;
    if (bgstar.one.x > canvas.width + bgstar.one.size*1.1){
        bgstar.one.x = 0;
    }else if (bgstar.one.y > canvas.height + bgstar.one.size*1.1){
        bgstar.one.y = 0;
    }
    
  bgstar.two.x += 3;
  bgstar.two.y += 3;
    if (bgstar.two.x > canvas.width + bgstar.two.size*1.1){
        bgstar.two.x = 0;
    }else if (bgstar.two.y > canvas.height + bgstar.two.size*1.1){
        bgstar.two.y = 0;
    }

  bgstar.three.x += 3;
  bgstar.three.y += 3;
    if (bgstar.three.x > canvas.width + bgstar.three.size*1.1){
        bgstar.three.x = 0;
    }else if (bgstar.three.y > canvas.height + bgstar.three.size*1.1){
        bgstar.three.y = 0;
    }

  bgstar.four.x += 2;
  bgstar.four.y += 2;
    if (bgstar.four.x > canvas.width + bgstar.four.size*1.1){
        bgstar.four.x = 0;
    }else if (bgstar.four.y > canvas.height + bgstar.four.size*1.1){
        bgstar.four.y = 0;
    }
    
  bgstar.five.x += 2;
  bgstar.five.y += 2;
    if (bgstar.five.x > canvas.width + bgstar.five.size*1.1){
        bgstar.five.x = 0;
    }else if (bgstar.five.y > canvas.height + bgstar.five.size*1.1){
        bgstar.five.y = 0;
    }

  bgstar.six.x += 1;
  bgstar.six.y += 1;
    if (bgstar.six.x > canvas.width + bgstar.six.size*1.1){
        bgstar.six.x = 0;
    }else if (bgstar.six.y > canvas.height + bgstar.six.size*1.1){
        bgstar.six.y = 0;
    }

  bgstar.seven.x += 1;
  bgstar.seven.y += 1;
    if (bgstar.seven.x > canvas.width + bgstar.seven.size*1.1){
        bgstar.seven.x = 0;
    }else if (bgstar.seven.y > canvas.height + bgstar.seven.size*1.1){
        bgstar.seven.y = 0;
    }

  



// Death


  if ((player.x < enemy.one.x+enemy.size && player.x > enemy.one.x-player.size && player.y < enemy.one.y+enemy.size && player.y > enemy.one.y-player.size) ||
      (player.x < enemy.two.x+enemy.size && player.x > enemy.two.x-player.size && player.y < enemy.two.y+enemy.size && player.y > enemy.two.y-player.size) ||
      (player.x < enemy.three.x+enemy.size && player.x > enemy.three.x-player.size && player.y < enemy.three.y+enemy.size && player.y > enemy.three.y-player.size) ||
      (player.x < enemy.four.x+enemy.size && player.x > enemy.four.x-player.size && player.y < enemy.four.y+enemy.size && player.y > enemy.four.y-player.size) ||
      (player.x < enemy.five.x+enemy.size && player.x > enemy.five.x-player.size && player.y < enemy.five.y+enemy.size && player.y > enemy.five.y-player.size) ||
      (player.x < enemy.six.x+enemy.size && player.x > enemy.six.x-player.size && player.y < enemy.six.y+enemy.size && player.y > enemy.six.y-player.size) ||
      (player.x < enemy.seven.x+enemy.size && player.x > enemy.seven.x-player.size && player.y < enemy.seven.y+enemy.size && player.y > enemy.seven.y-player.size) ||
      (player.x < enemy.eight.x+enemy.size && player.x > enemy.eight.x-player.size && player.y < enemy.eight.y+enemy.size && player.y > enemy.eight.y-player.size) ||
      (player.x < enemy.nine.x+enemy.size && player.x > enemy.nine.x-player.size && player.y < enemy.nine.y+enemy.size && player.y > enemy.nine.y-player.size) ||
      (player.x < enemy.ten.x+enemy.size && player.x > enemy.ten.x-player.size && player.y < enemy.ten.y+enemy.size && player.y > enemy.ten.y-player.size) ||
      (player.x < enemy.eleven.x+enemy.size && player.x > enemy.eleven.x-player.size && player.y < enemy.eleven.y+enemy.size && player.y > enemy.eleven.y-player.size) ||
      (player.x < enemy.twelve.x+enemy.size && player.x > enemy.twelve.x-player.size && player.y < enemy.twelve.y+enemy.size && player.y > enemy.twelve.y-player.size)){

            player.dead = true;
        }


    if (player.dead){

            reset();
          
            setTimeout(function(){
              player.dead = false;
              randi = Math.floor(Math.random() * deadMessages.length);
        
            }, 400)
          
          }

// Capture Coins

    if (player.x < coin.one.x+player.size && player.x > coin.one.x-player.size && player.y < coin.one.y+player.size && player.y > coin.one.y-player.size){
            coin.one.captured = true;
    
        }

    if (player.x < coin.two.x+player.size && player.x > coin.two.x-player.size && player.y < coin.two.y+player.size && player.y > coin.two.y-player.size){
            coin.two.captured = true;
        }

    if (player.x < coin.three.x+player.size && player.x > coin.three.x-player.size && player.y < coin.three.y+player.size && player.y > coin.three.y-player.size){
            coin.three.captured = true;
        }

    if (player.x < coin.four.x+player.size && player.x > coin.four.x-player.size && player.y < coin.four.y+player.size && player.y > coin.four.y-player.size){
            coin.four.captured = true;
        }

    if (player.x < coin.five.x+player.size && player.x > coin.five.x-player.size && player.y < coin.five.y+player.size && player.y > coin.five.y-player.size){
            coin.five.captured = true;
        }

    if (player.x < coin.six.x+player.size && player.x > coin.six.x-player.size && player.y < coin.six.y+player.size && player.y > coin.six.y-player.size){
            coin.six.captured = true;
        }

    if (player.x < coin.seven.x+player.size && player.x > coin.seven.x-player.size && player.y < coin.seven.y+player.size && player.y > coin.seven.y-player.size){
            coin.seven.captured = true;
        }

    if (player.x < coin.eight.x+player.size && player.x > coin.eight.x-player.size && player.y < coin.eight.y+player.size && player.y > coin.eight.y-player.size){   
            coin.eight.captured = true;
        }

    if (player.x < coin.nine.x+player.size && player.x > coin.nine.x-player.size && player.y < coin.nine.y+player.size && player.y > coin.nine.y-player.size){  
            coin.nine.captured = true;
        }

    if (player.x < coin.ten.x+player.size && player.x > coin.ten.x-player.size && player.y < coin.ten.y+player.size && player.y > coin.ten.y-player.size){
            coin.ten.captured = true;
        }


// Victory


    if (coin.one.captured && coin.two.captured && coin.three.captured && coin.four.captured && coin.five.captured && 
        coin.six.captured && coin.seven.captured && coin.eight.captured && coin.nine.captured && coin.ten.captured && Lvl >1 ){

            player.win = true;

      }else if (coin.one.captured && coin.two.captured && coin.three.captured && coin.four.captured && 
                coin.six.captured && coin.seven.captured && coin.nine.captured && coin.ten.captured && Lvl === 1){

             player.win = true; 
      }

    if (player.win){

        Lvl += 1;

        restart();
        
    }

    if (Lvl > 3){

        victory();
    }


  



  // ----------------------------------------------------------------------------------------------------------
  // FRAMES FRAMES FRAMES FRAMES FRAMES FRAMES FRAMES FRAMES FRAMES FRAMES FRAMES FRAMES FRAMES FRAMES FRAMES
  // ----------------------------------------------------------------------------------------------------------

    if (player.dead){
        ctx.fillStyle = "darkred";
    }else{
        ctx.fillStyle = "black";
    }
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Background
      ctx2.clearRect(0,0, canvas.width, canvas.height);
      ctx3.clearRect(0,0, canvas.width, canvas.height);


    ctx.fillStyle = "#101010"; // BG Stars

        ctx.beginPath();
        ctx.arc(bgstar.one.x, bgstar.one.y, bgstar.one.size, 0, 2*Math.PI), false;  // Star 1
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bgstar.two.x, bgstar.two.y, bgstar.two.size, 0, 2*Math.PI), false; // Star 2
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bgstar.three.x, bgstar.three.y, bgstar.three.size, 0, 2*Math.PI), false; // Star 3
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bgstar.four.x, bgstar.four.y, bgstar.four.size, 0, 2*Math.PI), false; // Star 4
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bgstar.five.x, bgstar.five.y, bgstar.five.size, 0, 2*Math.PI), false; // Star 5
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bgstar.six.x, bgstar.six.y, bgstar.six.size, 0, 2*Math.PI), false; // Star 6
        ctx.fill();

        ctx.beginPath();
        ctx.arc(bgstar.seven.x, bgstar.seven.y, bgstar.seven.size, 0, 2*Math.PI), false; // Star 7
        ctx.fill();

    if (player.dead){

        ctx3.fillStyle = "white";
        ctx3.font = "5rem Arial";
        ctx3.fillText(deadMessages[randi], 20, 100)

    }

    
  
  if (showStats){ // Stats

        ctx.fillStyle = "white"; // Collision Boxes
            ctx.fillRect(player.x-player.width/2 , player.y-player.height/2, player.width, player.height);
            ctx.fillRect(enemy.one.x-enemy.size, enemy.one.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.two.x-enemy.size, enemy.two.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.three.x-enemy.size, enemy.three.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.four.x-enemy.size, enemy.four.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.five.x-enemy.size, enemy.five.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.six.x-enemy.size, enemy.six.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.seven.x-enemy.size, enemy.seven.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.eight.x-enemy.size, enemy.eight.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.nine.x-enemy.size, enemy.nine.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.ten.x-enemy.size, enemy.ten.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.eleven.x-enemy.size, enemy.eleven.y - enemy.size, enemy.size*2, enemy.size*2);
            ctx.fillRect(enemy.twelve.x-enemy.size, enemy.twelve.y - enemy.size, enemy.size*2, enemy.size*2);


          ctx3.fillStyle = "white"; // Stats
            ctx3.font = "20px Arial";
            ctx3.fillText("1", enemy.one.x+25, enemy.one.y+25);
            ctx3.fillText("2", enemy.two.x+25, enemy.two.y+25);
            ctx3.fillText("3", enemy.three.x+25, enemy.three.y+25);
            ctx3.fillText("4", enemy.four.x+25, enemy.four.y+25);
            ctx3.fillText("5", enemy.five.x+25, enemy.five.y+25);
            ctx3.fillText("6", enemy.six.x+25, enemy.six.y+25);
            ctx3.fillText("7", enemy.seven.x+25, enemy.seven.y+25);
            ctx3.fillText("8", enemy.eight.x+25, enemy.eight.y+25);
            ctx3.fillText("9", enemy.nine.x+25, enemy.nine.y+25);

            

        ctx3.fillStyle = "gray"; // Stats
            ctx3.font = "20px Arial";
            ctx3.fillText("player.theta", 20, 30);
            ctx3.fillText("player.radius", 20, 90);
            ctx3.fillText("player.dead?",20, 150);
            ctx3.fillText("paused?", 20, 210);
            ctx3.fillText("Level", 20, 270);
        
        ctx3.fillStyle = "green";
            ctx3.fillText(player.theta, 20, 60);
            ctx3.fillText(player.radius, 20, 120);
            ctx3.fillText(player.dead, 20, 180);
            ctx3.fillText(paused, 20, 240);
            ctx3.fillText(Lvl, 20, 300);

  }

  // SPRITES

  ctx.strokeStyle = "#252525"; //Orbits
  
        ctx.beginPath();
        ctx.arc(centerx, centery, orbits.one, 0, 2*Math.PI), false; // Orbit 1
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerx, centery, orbits.two, 0, 2*Math.PI), false; // Orbit 2
        ctx.stroke();
   
        ctx.beginPath();
        ctx.arc(centerx, centery, orbits.three, 0, 2*Math.PI), false; // Orbit 3
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(centerx, centery, orbits.four, 0, 2*Math.PI), false; // Orbit 4
        ctx.stroke();
   


  switch (Lvl){ // Enemies

    case 1:
        ctx2.fillStyle = "gray";
        break;

    case 2:
        ctx2.fillStyle= "#CB0000";
        break;

    case 3: 
      ctx2.fillStyle = "#00FF97";
        break;
      

  }
   

        ctx2.beginPath();
        ctx2.arc(enemy.one.x, enemy.one.y, enemy.size, 0, 2*Math.PI), false;  // Enem 1
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(enemy.two.x, enemy.two.y, enemy.size, 0, 2*Math.PI), false; // Enem 2
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(enemy.three.x, enemy.three.y, enemy.size, 0, 2*Math.PI), false; // Enem 3
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(enemy.four.x, enemy.four.y, enemy.size, 0, 2*Math.PI), false; // Enem 4
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(enemy.five.x, enemy.five.y, enemy.size, 0, 2*Math.PI), false; // Enem 5
        ctx2.fill();
 
        ctx2.beginPath();
        ctx2.arc(enemy.six.x, enemy.six.y, enemy.size, 0, 2*Math.PI), false; // Enem 6
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(enemy.seven.x, enemy.seven.y, enemy.size, 0, 2*Math.PI), false; // Enem 7
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(enemy.eight.x, enemy.eight.y, enemy.size, 0, 2*Math.PI), false; // Enem 8
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(enemy.nine.x, enemy.nine.y, enemy.size, 0, 2*Math.PI), false; // Enem 9
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(enemy.ten.x, enemy.ten.y, enemy.size, 0, 2*Math.PI), false; // Enem 10
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(enemy.eleven.x, enemy.eleven.y, enemy.size, 0, 2*Math.PI), false; // Enem 11
        ctx2.fill();

        ctx2.beginPath();
        ctx2.arc(enemy.twelve.x, enemy.twelve.y, enemy.size, 0, 2*Math.PI), false; // Enem 12
        ctx2.fill(); 

  
    



    switch (Lvl){

      case 1:
        ctx2.fillStyle = "#FFE400";
        break;

      case 2:
        ctx2.fillStyle = "#FFD500";
        break;

      case 3:
        ctx2.fillStyle = "#FFC100";
        break;

      case 4:
        ctx2.fillStyle = "#FFAA00";
        break;

    }
  

    if (!coin.one.captured){
        ctx2.beginPath();
        ctx2.arc(coin.one.x, coin.one.y, player.size, 0, 2*Math.PI), false; // Coin 1 (1)
        ctx2.fill();
    }       
    if (!coin.two.captured){
        ctx2.beginPath();
        ctx2.arc(coin.two.x, coin.two.y, player.size, 0, 2*Math.PI), false; // Coin 2 (1)
        ctx2.fill();
    }
    if (!coin.three.captured){
        ctx2.beginPath();
        ctx2.arc(coin.three.x, coin.three.y, player.size, 0, 2*Math.PI), false; // Coin 3 (2)
        ctx2.fill();
    }
    if (!coin.four.captured){
        ctx2.beginPath();
        ctx2.arc(coin.four.x, coin.four.y, player.size, 0, 2*Math.PI), false; // Coin 4 (2)
        ctx2.fill();
    }
    if (!coin.five.captured && Lvl > 1){
        ctx2.beginPath();
        ctx2.arc(coin.five.x, coin.five.y, player.size, 0, 2*Math.PI), false; // Coin 5 (2)
        ctx2.fill();
    }
    if (!coin.six.captured){
        ctx2.beginPath();
        ctx2.arc(coin.six.x, coin.six.y, player.size, 0, 2*Math.PI), false; // Coin 6 (3)
        ctx2.fill();
    }
    if (!coin.seven.captured){
        ctx2.beginPath();
        ctx2.arc(coin.seven.x, coin.seven.y, player.size, 0, 2*Math.PI), false; // Coin 7 (3)
        ctx2.fill();
    }
    if (!coin.eight.captured && Lvl >1){
        ctx2.beginPath();
        ctx2.arc(coin.eight.x, coin.eight.y, player.size, 0, 2*Math.PI), false; // Coin 8 (4)
        ctx2.fill();
    }
    if (!coin.nine.captured){
        ctx2.beginPath();
        ctx2.arc(coin.nine.x, coin.nine.y, player.size, 0, 2*Math.PI), false; // Coin 9 (4)
        ctx2.fill();
    }
    if (!coin.ten.captured){
        ctx2.beginPath();
        ctx2.arc(coin.ten.x, coin.ten.y, player.size, 0, 2*Math.PI), false; // Coin 10 (4)
        ctx2.fill();
    }

        

  ctx.drawImage(planetImg, centerx-planet.size/2, centery-planet.size/2, planet.size, planet.size); //  Planet

  switch (Lvl){

    case 1:
      planetImg.src = "./IMG/planet-1.png";
      break;

    case 2:
      planetImg.src = "./IMG/planet-2.png";
      break;

    case 3:
      planetImg.src = "./IMG/planet-3.png";
      break;


    }





    

    ctx2.fillStyle = "royalblue";
    ctx2.beginPath();
    ctx2.arc(player.x, player.y, player.size, 0, 2*Math.PI), false; // Player
    ctx2.fill()


  if (startScene){ // Start Message

    ctx3.fillStyle = "yellow"
    ctx3.font = "45px futura", "45px Arial"
    ctx3.fillText("JUST ORBITING BY", 20, 70) 

    ctx3.fillStyle = "goldenrod"
    ctx3.font = "20px Futura", "20px Arial"
    ctx3.fillText("By Heewon Ahn", 20, 100) 

    ctx3.fillStyle = "white"
    ctx3.font = "30px Arial"
    ctx3.fillText(`Level ${Lvl}`, 20, 160) 

    ctx3.fillStyle = "gray"
    ctx3.font = "60px Futura", "45px Arial"
    ctx3.fillText(countdown, 20, 250) 

  }

  if (paused){  // Paused Text
    ctx3.fillStyle = "white"
    ctx3.font = "30px Arial"
    ctx3.fillText("Paused", canvas.width-140, 50) 

    ctx3.fillStyle = "gray"
    ctx3.font = "20px Arial"
    ctx3.fillText("Move player to resume", canvas.width-240, 80)
  }

  ctx3.fillStyle = "white"
  ctx3.font = "30px Arial"
  ctx3.fillText(timeCounter, canvas.width-70, canvas.height-30); // Time Counter

  // Animation Loop
  window.requestAnimationFrame(loop);

};

// Extra Functions

function rotate(img, x, y, scale, rot){

  ctx.setTransform(scale, 0, 0, scale, x, y);
  ctx.rotate(rot);
  ctx.drawImage(img, -img.width / 2, -img.height / 2);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

}

function reset(){

  player.theta = Math.PI*3/2;
  player.level = 1;

  controller.right = false;
  controller.left = false;

  coin.one.captured = false;
  coin.two.captured = false;
  coin.three.captured = false;
  coin.four.captured = false;
  coin.five.captured = false;
  coin.six.captured = false;
  coin.seven.captured = false;
  coin.eight.captured = false;
  coin.nine.captured = false;
  coin.ten.captured = false;

  player.win = false;

  timeCounter = 0;
  countdown = 3;
  
}

function restart(){

  var restart = confirm(`You win! Your time was ${timeCounter} seconds. Press OK to proceed.`);

  startScene = true;
    setTimeout(function(){

      startScene = false;
  
    },3000) 

  if (restart){

    reset();
  }

}

function victory(){

  var startover = confirm(`You've reached the end of the game. Start over?`);

  if (startover){

    Lvl = 1;
    reset();
  }

}


setTimeout(function(){

  startScene = false;

},3000) 


setInterval(function(){

  if (!startScene && !paused){

    timeCounter += 1;
  }

  if (startScene){

    countdown -= 1;
  }

}, 1000)




// Initialize

window.addEventListener("keydown", controller.keyListener);

window.addEventListener("keyup", function(){

  controller.left = false;
  controller.right = false;
})
window.requestAnimationFrame(loop);

