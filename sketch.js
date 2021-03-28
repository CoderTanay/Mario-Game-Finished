var mario, ground, marioIMG, bg, enemyIMG,inground, enemyGroup,marioded
var PLAY = 1
var OVER = 0
var gameState = PLAY

function preload() {
  groundIMG = loadImage("images/ground2.png")
  bg = loadImage("images/bg.png")
  marioded = loadAnimation("images/collided.png")
  enemyIMG = loadAnimation("images/obstacle1.png", "images/obstacle2.png", "images/obstacle3.png", "images/obstacle4.png")
  marioIMG = loadAnimation("images/mario00.png", "images/mario01.png", "images/mario02.png", "images/mario03.png")
}
function setup() {
  createCanvas(600, 350);
  mario = createSprite(50,264,20,50)
  mario.addAnimation("mario",marioIMG)
  mario.addAnimation("marioDead", marioded)
  mario.scale = 1.5
  
  ground = createSprite(200,330,400,20);
  ground.addImage("ground",groundIMG);
  ground.x = ground.width /2;
  
  ingroud = createSprite(200,300,400,10)
  ingroud.visible=false

  enemyGroup = new Group();
}
function draw() {
  background(bg);
  console.log(gameState)
  if(gameState === PLAY){
    ground.velocityX = -(3);
    if(keyDown("space") && (mario.y >= 266.5)){
      mario.velocityY=-10
    } 
    if(ground.x < 0){
      ground.x = ground.width/2
    }
    mario.velocityY=mario.velocityY + 0.5 
    enemySpawn();
    if(enemyGroup.isTouching(mario)) {
      gameState = OVER;
    }
  }
  else{
    mario.changeAnimation("marioDead")
    ground.velocityX = 0;
    enemyGroup.setVelocityXEach(0);
    enemyGroup.setLifetimeEach(-100)
  }
  mario.collide(ingroud)

  drawSprites();
}

function enemySpawn() {
  if(frameCount % 200 === 0) {
    var enemy = createSprite(600,264,20,50);
    enemy.velocityX = -(3);
    enemy.addAnimation("enemy",enemyIMG)
    enemy.lifetime = 300;
    enemyGroup.add(enemy)
  }
}