const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

const start = document.getElementById("start");

const scl = 0.02*canvas.height;

var startScene = true;

const centerx = canvas.width/2;
const centery = canvas.height/2;




const player1 = {

  x: 30,
  y: canvas.height/2,
  xspeed: 0,
  yspeed: 0,

  width: scl,
  height: scl*7,

  win: false,

  shroom: false,

  triple: false,

  guard: false,

  score: 0
}

const p1btm = {

  x: player1.x,
  y: player1.y + player1.height + 100,

  width: scl,
  height: scl*7
}

const p1top = {

  width: scl,
  height: scl*7,

  x: player1.x,
  y: player1.y - player1.height - 100,
}

const p1guard = {

  width: scl,
  height: scl*9,

  x: player1.x + player1.width + 200,
  y: player1.y,

  xspeed: 0,
  yspeed: 10
}

const player2 = {

  x: canvas.width-40-scl,
  y: canvas.height/2,
  xspeed: 0,
  yspeed: 0,

  width: scl,
  height: scl*7,

  win: false,

  shroom: false,

  triple: false,

  guard: false,

  score: 0
}

const player2btm = {

  x: player2.x,
  y: player2.y + player2.height + 200,

  width: scl,
  height: scl*7
}

const player2top = {

  width: scl,
  height: scl*7,

  x: player2.x,
  y: player2.y - player2.height - 100,
}

const p2guard = {

  width: scl,
  height: scl*9,

  x: player2.x - player2.width - 200,
  y: player2.y,

  xspeed: 0,
  yspeed: 10


}

const ball = {

  size: scl/2,

  x: canvas.width/2,
  y: canvas.height/2,

  xspeed: scl/2,
  yspeed: 1,

  p1: false,
  p2: false
}

const shroom = {

  size: scl/2,

  x: Math.random()*(canvas.width-800)+400,
  y: Math.random()*(canvas.height-400)+200,

  xspeed: -scl/2,
  yspeed: -scl/2,

  p1: false,
  p2: false
}

const triple = {

  size: scl/2,

  x: Math.random()*(canvas.width-800)+400,
  y: Math.random()*(canvas.height-400)+200,

  xspeed: scl/2,
  yspeed: scl/2,
  p1: false, 
  p2: false
}

const logo = new Image();
logo.src = "./IMG/super-pong.png";


const guard = {

  size: scl/2,

  x: Math.random()*(canvas.width-800)+400,
  y: Math.random()*(canvas.height-400)+200,

  xspeed: -scl/2,
  yspeed: scl/2,
  p1: false, 
  p2: false


}



const controller1 = {

  left:false,
  right:false,
  up:false,
  down: false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 65:// A key
        controller1.left = key_state;
        break;
      case 87:// W key 
        controller1.up = key_state;
        break;
      case 68:// D key
        controller1.right = key_state;
        break;
      case 83: // S Key
        controller1.down = key_state;
        break;

    }

  }

}

const controller2 = {

  left:false,
  right:false,
  up:false,
  down: false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller2.left = key_state;
        break;
      case 38:// up key
        controller2.up = key_state;
        break;
      case 39:// right key
        controller2.right = key_state;
        break;
      case 40: // down key
        controller2.down = key_state;
        break;

    }

  }

}


const loop = function() {

  // PLAYER 1
  
  if (controller1.up)  {

    player1.yspeed -= 1.5;
  }

  if (controller1.down) {

    player1.yspeed += 1.5;
  }

  player1.y += player1.yspeed;

  player1.yspeed *= 0.9;// friction

  if (player1.x < 0){

    player1.x = 0;

  }else if (player1.x > canvas.width - player1.width){

    player1.x = canvas.width - player1.width;
  }

  if (player1.y < 0){

    player1.y = 0;

  }else if (player1.y > canvas.height - player1.height){

    player1.y = canvas.height - player1.height;
  }


  // PLAYER 2

  if (controller2.up) {

    player2.yspeed -= 1.5;
  }

  if (controller2.down) {

    player2.yspeed += 1.5;
  }


  player2.y += player2.yspeed;
  player2.yspeed *= 0.9;// friction

  if (player2.x < 0){

    player2.x = 0;

  }else if (player2.x > canvas.width - player2.width){

    player2.x = canvas.width - player2.width;
  }

  if (player2.y < 0){

    player2.y = 0;

  }else if (player2.y > canvas.height - player2.height){

    player2.y = canvas.height - player2.height;
  }


  // BALL

  
  
  if (!startScene){
    
    ball.x += ball.xspeed;
    ball.y += ball.yspeed;

  }else{

    ball.x += ball.xspeed*0.1;
    ball.y += ball.yspeed*0.1;

  }


  // Ball + Player 1
  if (ball.x > player1.x - ball.size && ball.x < player1.x + player1.width + ball.size && ball.y > player1.y - ball.size && ball.y < player1.y + player1.height + ball.size){

    ball.xspeed *= -1;
    ball.yspeed *= -1;
    ball.lastHit = 1;
    ballY();
 
  }


  // Ball + Player 1 Triple
  if (player1.triple){ 

    if ((ball.x > p1btm.x - ball.size && ball.x < p1btm.x + p1btm.width + ball.size && ball.y > p1btm.y - ball.size && ball.y < p1btm.y + p1btm.height + ball.size) ||
    (ball.x > p1top.x - ball.size && ball.x < p1top.x + p1top.width + ball.size && ball.y > p1top.y - ball.size && ball.y < p1top.y + p1top.height + ball.size)){ 

      ball.xspeed *= -1;
      ball.lastHit = 1;
      ballY();

    }
  }

  // Ball + Player 1 Guard
  if (player1.guard){ 

    if (ball.x > p1guard.x - ball.size && ball.x < p1guard.x + p1guard.width + ball.size && ball.y > p1guard.y - ball.size && ball.y < p1guard.y + p1guard.height + ball.size){ 

      ball.xspeed *= -1;
      ball.yspeed *= -1;
      ball.lastHit = 1;
      ballY();
    }
  }


  // Ball + Player 2
  if (ball.x > player2.x - ball.size && ball.x < player2.x + player2.width + ball.size && ball.y > player2.y - ball.size && ball.y < player2.y + player2.height + ball.size){

    ball.xspeed *= -1;
    ball.lastHit = 2;
    ballY();
 
  }

  // Ball + Player 2 Triple
  if (player2.triple){ 

    if ((ball.x > player2btm.x - ball.size && ball.x < player2btm.x + player2btm.width + ball.size && ball.y > player2btm.y - ball.size && ball.y < player2btm.y + player2btm.height + ball.size) ||
    (ball.x > player2top.x - ball.size && ball.x < player2top.x + player2top.width + ball.size && ball.y > player2top.y - ball.size && ball.y < player2top.y + player2top.height + ball.size)){ 

      ball.xspeed *= -1;
      ball.lastHit = 1;
      ballY();
    }
  }

  // Ball + Player 2 Guard
  if (player2.guard){ 

    if (ball.x > p2guard.x - ball.size && ball.x < p2guard.x + p2guard.width + ball.size && ball.y > p2guard.y - ball.size && ball.y < p2guard.y + p2guard.height + ball.size){ 

      ball.xspeed *= -1;
      ball.lastHit = 1;
      ballY();
    }
  }

  // Ball Borders
  if (ball.x < ball.size){

    ball.xspeed *= -1;
    player2.score += 1;
    ball.p2 = true;

    setTimeout(function(){

      ball.p2 = false;
    },500)
  }
  
  if (ball.x > canvas.width-ball.size){

    ball.xspeed *= -1;
    player1.score += 1;
    ball.p1 = true;

    setTimeout(function(){

      ball.p1 = false;
    },500)
  }
  if (ball.y < ball.size || ball.y > canvas.height-ball.size){

    ball.yspeed *= -1;
  }

  // SHROOM

  if (!startScene){

    shroom.x += shroom.xspeed;
    shroom.y += shroom.yspeed;


  }else{

    shroom.x += shroom.xspeed*0.1;
    shroom.y += shroom.yspeed*0.1;
    
  }

  

  // Shroom Effects
  if (player1.shroom){

    player1.height = scl * 14;
    p1btm.height = scl * 14;
    p1top.height = scl * 14;

  }else{

    player1.height = scl*7;
    p1btm.height = scl*7;
    p1top.height = scl*7;
  }

  if (player2.shroom){

    player2.height = scl * 14;
    player2btm.height = scl * 14;
    player2top.height = scl * 14;
    
  }else{
    
    player2.height = scl * 7;
    player2btm.height = scl*7;
    player2top.height = scl*7;
  }

  

  // Shroom + Player 1
  if (shroom.x > player1.x - shroom.size && shroom.x < player1.x + player1.width + shroom.size && shroom.y > player1.y - shroom.size && shroom.y < player1.y + player1.height + shroom.size){

    shroom.xspeed *= -1;
    shroom.yspeed *= -1;
    shroomY();
    shroom.p1 = true;

    setTimeout(function(){

      shroom.p1 = false;
    }, 300)
    
    if (!player1.shroom){
      
      player1.shroom = true;
      player1.y -= scl*2;
    
    }else{

      player1.shroom = false;
      player1.y += scl*2;
    }
  }

  // Shroom + Player 1 Triple
  if (player1.triple){

    if ((shroom.x > p1btm.x - shroom.size && shroom.x < p1btm.x + p1btm.width + shroom.size && shroom.y > p1btm.y - shroom.size && shroom.y < p1btm.y + p1btm.height + shroom.size) ||
      (shroom.x > p1top.x - shroom.size && shroom.x < p1top.x + p1top.width + shroom.size && shroom.y > p1top.y - shroom.size && shroom.y < p1top.y + p1top.height + shroom.size)){

      shroom.xspeed *= -1;
      shroomY();
      shroom.p1 = true;

      setTimeout(function(){

        shroom.p1 = false;
      }, 300)
  
      if (!player1.shroom){
        
        player1.shroom = true;
        player1.y -= scl*2;
      
      }else{
  
        player1.shroom = false;
        player1.y += scl*2;
      }
  
    }
  }

  // Shroom + Player 2
  if (shroom.x > player2.x - shroom.size && shroom.x < player2.x + player2.width + shroom.size && shroom.y > player2.y - shroom.size && shroom.y < player2.y + player2.height + shroom.size){

    shroom.xspeed *= -1;
    shroom.yspeed *= -1;
    shroomY();
    shroom.p2 = true;

    setTimeout(function(){

      shroom.p2 = false;
    }, 300)

    if (!player2.shroom){
      
      player2.shroom = true;
      player2.y -= scl*2;
    
    }else{

      player2.shroom = false;
      player2.y += scl*2;
    }

  }

  // Shroom + Player 2 Triple

  if (player2.triple){

    if ((shroom.x > player2btm.x - shroom.size && shroom.x < player2btm.x + player2btm.width + shroom.size && shroom.y > player2btm.y - shroom.size && shroom.y < player2btm.y + player2btm.height + shroom.size) ||
      (shroom.x > player2top.x - shroom.size && shroom.x < player2top.x + player2top.width + shroom.size && shroom.y > player2top.y - shroom.size && shroom.y < player2top.y + player2top.height + shroom.size)){

      shroom.xspeed *= -1;
      shroomY();
      shroom.p2 = true;

      setTimeout(function(){

        shroom.p2 = false;
      }, 300)
  
      if (!player2.shroom){
        
        player2.shroom = true;
        player2.y -= scl*2;
      
      }else{
  
        player2.shroom = false;
        player2.y += scl*2;
      }
  
    }
  }

  

  // Shroom Borders
  if (shroom.x < shroom.size || shroom.x > canvas.width-shroom.size){

    shroom.xspeed *= -1;
    shroomY();

  }
  if (shroom.y < shroom.size || shroom.y > canvas.height-shroom.size){

    shroom.yspeed *= -1;

  }

  // TRIPLE

  // Bottom & Top Support Positions

  if (!startScene){

    triple.x += triple.xspeed;
    triple.y += triple.yspeed;
  }else{

    triple.x += triple.xspeed*0.1;
    triple.y += triple.yspeed*0.1;
  }
  
  p1btm.x = player1.x;
  p1btm.y = player1.y + player1.height + 50;

  p1top.x = player1.x;
  p1top.y = player1.y - player1.height - 50;

  player2btm.x = player2.x;
  player2btm.y = player2.y + player2.height + 50;

  player2top.x = player2.x;
  player2top.y = player2.y - player2.height - 50;

  // Triple + Player 1
  if (triple.x > player1.x - triple.size && triple.x < player1.x + player1.width + triple.size && triple.y > player1.y - triple.size && triple.y < player1.y + player1.height + triple.size){

    triple.xspeed *= -1;
    triple.yspeed += -1;
    tripleY();
    triple.p1 = true;

    setTimeout(function(){

      triple.p1 = false;
    }, 300)
    
    if (!player1.triple){
      
      player1.triple = true;
    
    }else{

      player1.triple = false;
    }
  }

 // Triple + Player 1 Triple

 if (player1.triple){

  if ((triple.x > p1btm.x - triple.size && triple.x < p1btm.x + p1btm.width + triple.size && triple.y > p1btm.y - triple.size && triple.y < p1btm.y + p1btm.height + triple.size) ||
    (triple.x > p1top.x - triple.size && triple.x < p1top.x + p1top.width + triple.size && triple.y > p1top.y - triple.size && triple.y < p1top.y + p1top.height + triple.size)){

    triple.xspeed *= -1;
    triple.yspeed *= -1;
    tripleY();
    triple.p1 = true;

    setTimeout(function(){

      triple.p1 = false;
    }, 300)

    player1.triple = false;
    player1.y += scl*2;


    }
  }

  // Triple + Player 2
  if (triple.x > player2.x - triple.size && triple.x < player2.x + player2.width + triple.size && triple.y > player2.y - triple.size && triple.y < player2.y + player2.height + triple.size){

    triple.xspeed *= -1;
    triple.yspeed *= -1;
    tripleY();
    triple.p2 = true;

    setTimeout(function(){

      triple.p2 = false;
    }, 300)

    if (!player2.triple){
      
      player2.triple = true;
  
    }else{

      player2.triple = false;

    }
  }

  // Triple + Player 2 Triple

 if (player2.triple){

  if ((triple.x > player2btm.x - triple.size && triple.x < player2btm.x + player2btm.width + triple.size && triple.y > player2btm.y - triple.size && triple.y < player2btm.y + player2btm.height + triple.size) ||
    (triple.x > player2top.x - triple.size && triple.x < player2top.x + player2top.width + triple.size && triple.y > player2top.y - triple.size && triple.y < player2top.y + player2top.height + triple.size)){

    triple.xspeed *= -1;
    triple.yspeed *= -1;
    tripleY();

    triple.p2 = true;

    setTimeout(function(){

      triple.p2 = false;
    }, 300)

    player2.triple = false;
    player2.y += scl*2;


  }
}
 

  // Triple Borders
  if (triple.x < triple.size || triple.x > canvas.width-triple.size){

    triple.xspeed *= -1;
    tripleY();
 
  }
  if (triple.y < triple.size || triple.y > canvas.height-triple.size){

    triple.yspeed *= -1;


  }

   // GUARD


// Guard Effects
 p1guard.y += p1guard.yspeed;


 if (p1guard.y < 0 || p1guard.y > canvas.height-p1guard.height){

  p1guard.yspeed *= -1;
 }

 p2guard.y += p2guard.yspeed;


 if (p2guard.y < 0 || p2guard.y > canvas.height-p2guard.height){

  p2guard.yspeed *= -1;
 }


  
  // Guard Movement

  if (!startScene){

    guard.x += guard.xspeed;
    guard.y += guard.yspeed;

  }else{

    guard.x += guard.xspeed*0.1;
    guard.y += guard.yspeed*0.1; 
  }


  
  


  // Guard + Player 1
  if (guard.x > player1.x - guard.size && guard.x < player1.x + player1.width + guard.size && guard.y > player1.y - guard.size && guard.y < player1.y + player1.height + guard.size){

    guard.xspeed *= -1;
    guardY();
    guard.p1 = true;

    setTimeout(function(){

      guard.p1 = false;
    }, 300)
    
    if (!player1.guard){
      
      player1.guard = true;
      player1.y -= scl*2;
    
    }else{

      player1.guard = false;
      player1.y += scl*2;
    }
  }

  // Guard + Player 1 Triple
  if (player1.triple){

    if ((guard.x > p1btm.x - guard.size && guard.x < p1btm.x + p1btm.width + guard.size && guard.y > p1btm.y - guard.size && guard.y < p1btm.y + p1btm.height + guard.size) ||
      (guard.x > p1top.x - guard.size && guard.x < p1top.x + p1top.width + guard.size && guard.y > p1top.y - guard.size && guard.y < p1top.y + p1top.height + guard.size)){

      guard.xspeed *= -1;
      guardY();
      guard.p1 = true;

      setTimeout(function(){

        guard.p1 = false;
      }, 300)
  
      if (!player1.guard){
        
        player1.guard = true;
        player1.y -= scl*2;
      
      }else{
  
        player1.guard = false;
        player1.y += scl*2;
      }
  
    }
  }

  // Guard  + Player 2
  if (guard.x > player2.x - guard.size && guard.x < player2.x + player2.width + guard.size && guard.y > player2.y - guard.size && guard.y < player2.y + player2.height + guard.size){

    guard.xspeed *= -1;
    guardY();
    guard.p2 = true;

    setTimeout(function(){

      guard.p2 = false;
    }, 300)

    if (!player2.guard){
      
      player2.guard = true;
      player2.y -= scl*2;
    
    }else{

      player2.guard = false;
      player2.y += scl*2;
    }

  }

  // Guard + Player 2 Triple

  if (player2.triple){

    if ((guard.x > player2btm.x - guard.size && guard.x < player2btm.x + player2btm.width + guard.size && guard.y > player2btm.y - guard.size && guard.y < player2btm.y + player2btm.height + guard.size) ||
      (guard.x > player2top.x - guard.size && guard.x < player2top.x + player2top.width + guard.size && guard.y > player2top.y - guard.size && guard.y < player2top.y + player2top.height + guard.size)){

      guard.xspeed *= -1;
      guard.yspeed *= -1;
      guardY();
      guard.p2 = true;

      setTimeout(function(){

        guard.p2 = false;
      }, 300)
  
      if (!player2.guard){
        
        player2.guard = true;
        player2.y -= scl*2;
      
      }else{
  
        player2.guard = false;
        player2.y += scl*2;
      }
  
    }
  }


  // Guard Borders
  if (guard.x < guard.size || guard.x > canvas.width-guard.size){

    guard.xspeed *= -1;
    guardY();

  }
  if (guard.y < guard.size || guard.y > canvas.height-guard.size){

    guard.yspeed *= -1;


  } 





  //DRAW FRAMES

  ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);// Background

  if (ball.p2){
    ctx.fillStyle = "red";
  }else{
    ctx.fillStyle = "white";
  }
    ctx.fillRect(0, 0, 10, canvas.height);

  if (ball.p1){
      ctx.fillStyle = "royalblue";
    }else{
      ctx.fillStyle = "white";
    }

    ctx.fillRect(canvas.width-10, 0, 10, canvas.height);

  
  if (shroom.p1){
    ctx.fillStyle = "cyan"
  }else if (triple.p1){
    ctx.fillStyle = "orange"
  }else if (guard.p1){
    ctx.fillStyle = "#00FF97"
  }else{
    ctx.fillStyle = "red";
  }
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height); //Player 1

  ctx.fillStyle = "orange";
  if (player1.triple){

    ctx.fillRect(p1btm.x, p1btm.y, p1btm.width, p1btm.height) //  Player 1 Triple
    ctx.fillRect(p1top.x, p1top.y, p1top.width, p1top.height)
  }

  ctx.fillStyle = "#00FF97";
  if (player1.guard){

    ctx.fillRect(p1guard.x, p1guard.y, p1guard.width, p1guard.height) //  Player 1 Guard
  }
  
  if (shroom.p2){
    ctx.fillStyle = "cyan"
  }else if (triple.p2){
    ctx.fillStyle = "orange"
  }else if (guard.p2){
    ctx.fillStyle = "#00FF97"
  }else{
    ctx.fillStyle = "royalblue";
  }
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height); //Player 2

  ctx.fillStyle = "orange";
  if (player2.triple){

    ctx.fillRect(player2btm.x, player2btm.y, player2btm.width, player2btm.height) //  Player 2 Triple
    ctx.fillRect(player2top.x, player2top.y, player2top.width, player2top.height)
  }

  ctx.fillStyle = "#00FF97";
  if (player2.guard){

    ctx.fillRect(p2guard.x, p2guard.y, p2guard.width, p2guard.height) //  Player 2 Guard
  }

  ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, 2*Math.PI, false); //Ball
    ctx.fill();
  
  ctx.fillStyle = "cyan";
    ctx.beginPath();
    ctx.arc(shroom.x, shroom.y, shroom.size, 0, 2*Math.PI, false); //Shroom
    ctx.fill();

  ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(triple.x, triple.y, triple.size, 0, 2*Math.PI, false); //Triple
    ctx.fill();

  ctx.fillStyle = "#00FF97";
    ctx.beginPath();
    ctx.arc(guard.x, guard.y, guard.size, 0, 2*Math.PI, false); //Guard
    ctx.fill();

  ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(player1.score, 80, 40)
    ctx.fillText(player2.score, canvas.width-100, 40) // Scores

  
  if (startScene){

    ctx.drawImage(logo, centerx - logo.width/40 , centery - logo.height/40, logo.width/20, logo.height/20 )


  }
  
  

  



  


  
  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};


function ballY(){

  ball.yspeed = (Math.random()*30)-15;
}

function ballX(){

  ball.xspeed = (Math.random()*30)-15;
}

function shroomX(){

  shroom.xspeed = (Math.random()*20)-10;
}

function shroomY(){

  shroom.yspeed = (Math.random()*20)-10;
}

function tripleX(){

  triple.xspeed = (Math.random()*20)-10;
}

function tripleY(){

  triple.yspeed = (Math.random()*20)-10;
}

function guardX(){

  guard.xspeed = (Math.random()*20)-10;
}

function guardY(){

  guard.yspeed = (Math.random()*20)-10;
}


setTimeout(function(){

  startScene = false
}, 3000)




window.addEventListener("keydown", controller1.keyListener);
window.addEventListener("keyup", controller1.keyListener);
window.addEventListener("keydown", controller2.keyListener);
window.addEventListener("keyup", controller2.keyListener);
window.requestAnimationFrame(loop)


;