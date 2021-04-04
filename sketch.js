var mario, ground, marioIMG, bg, enemyIMG,inground, enemyGroup,marioded
var PLAY = 1
var OVER = 0
var gameState = PLAY
var blockIMG
var score = 0
function preload() {
  blockIMG = loadImage("images/question.png")
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
  mario.setCollider("circle",0,0,15)

  ground = createSprite(200,330,400,20);
  ground.addImage("ground",groundIMG);
  ground.x = ground.width /2;
  
  ingroud = createSprite(200,295,400,10)
  ingroud.visible=false

  enemyGroup = new Group();
  blockGroup = new Group();
}
function draw() {
  background(bg);
  console.log(gameState)
  textSize(20)
  fill("black")
  text("Score:"+score,520,25)
  if(gameState === PLAY){
    ground.velocityX = -(3);
    if(keyDown("space") && (mario.y >= 266.5)){
      mario.velocityY=-12
    } 
    if(ground.x < 0){
      ground.x = ground.width/2
    }
    mario.velocityY=mario.velocityY + 0.5 
    enemySpawn();
    blockSpawn();
    for(var i = 0; i < blockGroup.length; i++) {
      if(mario.isTouching(blockGroup.get(i))){
        blockGroup.get(i).remove()
        score++
      }
    }
    if(enemyGroup.isTouching(mario)) {
      gameState = OVER;
    }
  }
  else{
    mario.changeAnimation("marioDead")
    ground.velocityX = 0;
    mario.velocityY = 0;
    enemyGroup.setVelocityXEach(0);
    enemyGroup.setLifetimeEach(-100)
    blockGroup.setVelocityXEach(0);
    blockGroup.setLifetimeEach(-100)
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

function blockSpawn() {
  if(frameCount % 140 === 0) {
    var rand = Math.round(random(110,150))
    var block = createSprite(600,rand,10,10)
    block.velocityX = -(3);
    block.addImage(blockIMG)
    block.scale = .025
    block.lifetime = 300
    blockGroup.add(block)
  }
}