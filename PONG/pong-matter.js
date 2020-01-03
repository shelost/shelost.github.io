const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const engine = Matter.Engine.create();
const world = engine.world;

world.gravity.y = -0.5;
world.gravity.x = -0.5;

class Ball{

  constructor(x,y,r){

    this.body = Matter.Bodies.circle(x,y,r, {

      density: 0.04,
    friction: 0.01,
    frictionAir: 0.00001,
    restitution: 1,
    });
    this.r = r;
    Matter.World.add(world, this.body);
  }

  show(){

    var pos = this.body.position;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, this.r, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
  }
}


class Box{

  constructor(x,y,w,h,s){

    this.w = w;
    this.h = h;

    this.xspeed = 0;
    this.yspeed = 0;

    this.body = Matter.Bodies.rectangle(x+w/2,y+h/2,w,h, {
      isStatic: s,
      density: 0.01,
      friction: 0.01,
      frictionAir: 0.00001,
      restitution: 0.2,
    
    });
    
    
    Matter.World.add(world, this.body);
  }

  show(){

    var pos = this.body.position;
    ctx.fillStyle = "white";

    ctx.fillRect(pos.x-this.w/2, pos.y-this.h/2, this.w, this.h)

  }
}



const leftWall = new Box(0,0, 10,canvas.height, true);
const rightWall = new Box(canvas.width-10,0, 10,canvas.height,true);
const topWall = new Box(0,0, canvas.width,10,true);
const bottomWall = new Box(0, canvas.height-10, canvas.width, 10,true);

const box1 = new Box(40,40,20,100,true);

Matter.Body.setInertia(box1.body, 100000000000000);

const ball = new Ball(100,20,20);
const ball2 = new Ball(300,20,20);
const ball3 = new Ball(500,20, 20);
const ball4 = new Ball(700,20,20);


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


const loop = () => {

  Matter.Engine.update(engine);

  /*if (controller2.left){
    world.gravity.x = -1;
    world.gravity.y = 0;
  }

  if (controller2.right){
    world.gravity.x = 1;
    world.gravity.y = 0;
  }

  if (controller2.up){
    world.gravity.y = -1;
    world.gravity.x = 0;
  }

  if (controller2.down){
    world.gravity.y = 1;
    world.gravity.x = 0;
  }*/


  if (controller2.up){

    box1.yspeed -= 1;
  }
  if (controller2.down){

    box1.yspeed += 1;
  }

  box1.body.position.y += box1.yspeed;

  box1.yspeed *= 0.9;

  if (box1.body.position.x < box1.w/2){

    box1.body.position.x = box1.w/2;
  }






  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width, canvas.height);

  ball.show();
  leftWall.show();
  rightWall.show();
  topWall.show();
  bottomWall.show();

  box1.show();



  ball2.show();
  ball3.show();
  ball4.show();


  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
window.addEventListener("keydown", controller2.keyListener);
window.addEventListener("keyup", controller2.keyListener);



