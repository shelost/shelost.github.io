const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const engine = Matter.Engine.create();
const world = engine.world;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var render = Matter.Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: canvas.width,
    height: canvas.height,
    background: 'black',
    wireframes: false,
    showAngleIndicator: false
  }
});



const walls = [
  Matter.Bodies.rectangle(canvas.width/2, canvas.height-10, canvas.width, 20, { //Bottom
    density: 0.04,
    friction: 0.01,
    frictionAir: 0.00001,
    restitution: 0.2,
    isStatic: true,
    render: {
      fillStyle: '#F35e66',
 
    }
  }), Matter.Bodies.rectangle(canvas.width/2, 10, canvas.width, 20, { //Top
    density: 0.04,
    friction: 0.01,
    frictionAir: 0.00001,
    restitution: 0.2,
    isStatic: true,
    render: {
      fillStyle: '#F35e66',
      
    }
  }), Matter.Bodies.rectangle(10, canvas.height/2, 20, canvas.height, { //Left
  density: 0.04,
  friction: 0.01,
  frictionAir: 0.00001,
  restitution: 0.2,
  isStatic: true,
  render: {
    fillStyle: '#F35e66',
    
  }
}), Matter.Bodies.rectangle(canvas.width-10, canvas.height/2, 20, canvas.height, { //Right
  density: 0.04,
  friction: 0.01,
  frictionAir: 0.00001,
  restitution: 0.2,
  isStatic: true,
  render: {
    fillStyle: '#F35e66',
  
  }
}),
]


var ground = Matter.Bodies.rectangle(0, canvas.height-30, canvas.width, 30, {
  density: 0.04,
  friction: 0.01,
  frictionAir: 0.00001,
  restitution: 0.2,
  isStatic: true,
  render: {
    fillStyle: '#F35e66',
    strokeStyle: 'black',
    lineWidth: 1,
  }
})

Matter.World.add(world, walls)

var circs = [];


for (i = 0; i < 100; i++){

var rand1 = Math.floor(Math.random()*100);
var rand2 = Math.floor(Math.random()*100);
var rand3 = Math.floor(Math.random()*100);


  circs[i] = Matter.Bodies.circle(70+i*10 ,100 + Math.floor(i*0.1)*20, 20, {
    density: 0.04,
    friction: 0.01,
    frictionAir: 0.00001,
    restitution: 0.8,
    render: {
      fillStyle: `#${rand1}${rand2}${rand3}`,
    
    }
  })
}

var rects = [];

for (i = 0; i < 100; i++){

  var rand1 = Math.floor(Math.random()*100);
  var rand2 = Math.floor(Math.random()*100);
  var rand3 = Math.floor(Math.random()*100);
  
  
    rects[i] = Matter.Bodies.rectangle(70+i*10 ,100 + Math.floor(i*0.1)*20, 40, 40, {
      density: 0.04,
      friction: 0.01,
      frictionAir: 0.00001,
      restitution: 0.8,
      render: {
        fillStyle: `#${rand1}${rand2}${rand3}`,
    
      }
    })
  }


/* var ball = Matter.Bodies.circle(100,100, 20, {
  density: 0.04,
  friction: 0.01,
  frictionAir: 0.00001,
  restitution: 0.8,
  render: {
    fillStyle: '#F35e66',
    strokeStyle: 'black',
    lineWidth: 1
  }
}) */



Matter.World.add(world, circs);

Matter.World.add(world, rects);

const mouse = Matter.Mouse.create(canvas);

const mConst = Matter.MouseConstraint.create(engine, {mouse: mouse});



Matter.World.add(world, mConst)

Matter.Engine.run(engine);
Matter.Render.run(render);

/* class Box{

  constructor(x,y,w,h,isStatic){

    this.body = Matter.Bodies.rectangle(x,y,w,h);
    this.body.isStatic = isStatic;
    this.w = w;
    this.h = h;
    Matter.World.add(world, this.body);
    this.pos = this.body.position;

  }

  show(){

    const pos = this.body.position;
    ctx.fillStyle = "white";
    ctx.fillRect(pos.x, pos.y, this.w, this.h)
  }

}


const box1 = new Box(100,100,200,200, false)
const box2 = new Box(200,200,200,200, false)
const ground = new Box(0,canvas.height-20,canvas.width,20, true)

*/

Matter.Engine.run(engine);

const controller = {

  left:false,
  right:false,
  up:false,
  down: false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
        break;
      case 38:// up key
        controller.up = key_state;
        break;
      case 39:// right key
        controller.right = key_state;
        break;
      case 40: // down key
        controller.down = key_state;
        break;

    }

  }

}

const loop = () => {

  window.addEventListener("resize", function(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

  })

  if (controller.up){

    world.gravity.y = -1;
    world.gravity.x = 0;
    
  }
      if (world.gravity.y === -1){

        walls[1].render.fillStyle = "blue";

      }else{

        walls[1].render.fillStyle = "#F35e66";
      }

  if (controller.down){

    world.gravity.y = 1;
    world.gravity.x = 0;

  }
      if (world.gravity.y === 1){

        walls[0].render.fillStyle = "blue";

      }else{

        walls[0].render.fillStyle = "#F35e66";
      }


  if (controller.right){

    world.gravity.x = 1;
    world.gravity.y = 0;

  }
      if (world.gravity.x === 1){

        walls[3].render.fillStyle = "blue";

      }else{

        walls[3].render.fillStyle = "#F35e66";
      }

  if (controller.left){

    world.gravity.x = -1;
    world.gravity.y = 0;

  }
      if (world.gravity.x === -1){

        walls[2].render.fillStyle = "blue";

      }else{

        walls[2].render.fillStyle = "#F35e66";
      }


  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(world.gravity.y, 100, 100)

  

  window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop); 
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);