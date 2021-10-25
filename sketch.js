var bg_img, bg;
var topCliff, bottomCliff, topCliff_img, bottomCliff_img;
var spaceship, spaceship_img;
var welcomebg, welcomebg_img;
var obstacle1, obstacle2, obstacle3, obstacle4//, obstacle5;
var obstaclesGroup;
var power_orb;
var score;

var timeout

var enterButton

//variables for the game


var PLAY = 1;
var END = 0;
var POWER = 2
var STORY, WELCOME
var gameState = WELCOME;
//var gameState = PLAY;
//variables for the game state

//VARIABLES




function preload() {

  bg_img = loadImage("pictures/bg.png");

  spaceship_img = loadImage("pictures/spaceship 2.png");

  bottomCliff_img = loadImage("pictures/Down cliff.png");
  topCliff_img = loadImage("pictures/Top cliff (1).png");

  welcomebg_img = loadImage("pictures/Welcome page.jpg");

  obstacle1 = loadImage("pictures/obstacle 1.png");
  obstacle2 = loadImage("pictures/obstacle 2.png");
  obstacle3 = loadImage("pictures/obstacle 3.png");
  obstacle4 = loadImage("pictures/obstacle 4.png");
  //obstacle5 = loadImage("pictures/obstacle 5.png");

  power_orb_image = loadImage("pictures/orbs.png");
  
//loading audios, videos and images

//FUNCTION PRELOAD

}


function setup() {

  createCanvas(displayWidth, displayHeight);
  //canvas created

  score = 0;

  fill('white')
  text("move the mouse so that x>1200.", 200, 200)
  bg = createSprite(700, 400, displayWidth, displayHeight);
  bg.addImage(bg_img);
  //create background sprite and add image


  welcomebg = createSprite(700, 300, displayWidth, displayHeight);
  welcomebg.addImage(welcomebg_img);
  welcomebg.scale = 0.4;
  welcomebg.visible = false;
  //create welcome background sprite and add image
  //set scale to reduce the size
  //set to not visible so that is shows up iff gameState === WELCOME

  enterButton = createSprite(displayWidth/2.15,displayHeight - 200, 100, 50)
  enterButton.shapeColor = "#933A16"

  topCliff = createSprite(displayWidth/2, -20, displayWidth, displayHeight);
  topCliff.addImage(topCliff_img);
  topCliff.scale = 1.5;
  
  //creates the top cliff
  //adds the image for the top cliff
  //scales the top cliff to reduce size
   

  bottomCliff = createSprite(800, 300, displayWidth, displayHeight);
  bottomCliff.addImage(bottomCliff_img);
  bottomCliff.scale = 1.5;
  //creates the bottom cliff
  //adds the image for the bottom cliff
  //scales the bottom cliff to reduce size
  

  spaceship = createSprite(100, 200, 20, 20);
  spaceship.addImage(spaceship_img);
  spaceship.debug = true;
  spaceship.setCollider("rectangle", 30, 20, 100, 60)
  //create spaceship sprite and add image. 


  obstaclesGroup = new Group();
  orbsGroup = new Group();

}

//FUNCTION SETUP




function draw() {

  background(255,255,255);  
  spaceship.y = mouseY;
  
  
 // console.log(mouseX, mouseY);
  //console.log("MOVE THE MOUSE SO THAT X>1200");
  //to check the co ordinates of the mouse

  
 

  if(gameState === WELCOME){

    topCliff.visible = false;
    bottomCliff.visible = false;
    spaceship.visible = false;
    welcomebg.visible = true;
    bg.visible = false
  }
  //dissappear the cliffs, and the spaceship if game is at welcome stage
  //only show the welcome background

   
  /*if (mouseX>1100){
    gameState = PLAY
  }*/
   //checking if the game state play works or not

   if (mousePressedOver(enterButton)){
    gameState = PLAY
   }


  if (gameState === PLAY){
    
    topCliff.visible = true;
    bottomCliff.visible = true;
    spaceship.visible = true;
    bg.visible = true
    welcomebg.visible = false;
    enterButton.visible = false
    
    topCliff.velocityX = -10
    bottomCliff.velocityX = -10
    spaceship.y = mouseY;
    spawnObstacles();
    spawnOrbs();



    for(var i = 0; i<orbsGroup.length; i++){
      if(orbsGroup.get(i).isTouching(spaceship)){
        orbsGroup.get(i).destroy()
          gameState = POWER;
         // score = score + Math.round(getFrameRate() / 60);
         if(gameState === POWER){
        
    
          normal()
      }
      
      }
    }

    for(var i = 0; i<obstaclesGroup.length; i++){
      if(obstaclesGroup.get(i).isTouching(spaceship)){
        //obstaclesGroup.get(i).destroy()
        spaceship.destroy();
        gameState = END;
      }
    }

  }
  //iff game state is play, the cliffs move
  //and then only th spaceship moves

if(gameState === POWER){
  spawnObstacles()
  spawnOrbs()
}
 
 
  

  if(gameState === END){
   //spaceship.visible = false;
   topCliff.velocityX = 0;
   bottomCliff.velocityX = 0;
   //obstaclesGroup.setVisibleEach(false);
   obstaclesGroup.setVelocityXEach(0);
   orbsGroup.setVelocityXEach(0);
  }
  


  if (bottomCliff.x < 0) {
    bottomCliff.x = bottomCliff.width/2;
  }
  //resets the position of the bottom cliff
  //to make it seem like an infinite loop


  if (topCliff.x < 0) {
    topCliff.x = topCliff.width/2;
  }



  score = score + Math.round(getFrameRate() / 60);

  //resets the position of the top cliff
  //to make it seem like an infinite loop.
  drawSprites();


  if(gameState===WELCOME){
    fill(255)
    textSize(17)
    text("ENTER", displayWidth/2.24, displayHeight -193)
    }
  

  if (gameState === PLAY || gameState === POWER){
    text("Score: " + score, 500, 50);

  }
  
}

//FUNCTION DRAW







function spawnObstacles() {
  if (frameCount % 90 === 0) {
    var obstacle = createSprite(1500, random(165, 516), 10, 40);
    obstacle.velocityX = -(12);
    obstacle.setCollider("circle", 0, 0, 35)
    obstacle.debug = true;
    obstacle.velocityX = -(6 + 3 * score / 100);
    

    //generate random obstacles;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
       obstacle.addImage(obstacle3);
        break;
      case 4:
       obstacle.addImage(obstacle4);
        break;
        default:
        break;
      }

      obstaclesGroup.add(obstacle);
      
  }
}

function spawnOrbs() {
  if (frameCount % 300 === 0) {
    var orbs = createSprite(1500, random(165, 516), 5, 40);
    orbs.velocityX = -(12);
    orbs.setCollider("circle", 0, 0, 35)
    orbs.debug = true;
    orbs.scale = 0.3;
    orbs.velocityX = -(6 + 3 * score / 100);
    

    //generate random obstacles;
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        orbs.addImage(power_orb_image);
        break;
      case 2:
        orbs.addImage(power_orb_image);
        break;
      case 3:
       orbs.addImage(power_orb_image);
        break;
      case 4:
       orbs.addImage(power_orb_image);
        break;
        default:
        break;
      }

      orbsGroup.add(orbs);
      
  }
}


//LIKEWISE, CREATE SPAWN ORBS
//AND SPAWN POWER PALETS

function invincible(){
  gameState = POWER
  topCliff.visible = true;
  bottomCliff.visible = true;
  spaceship.visible = true;
  welcomebg.visible = false;
  enterButton.visible = false
  spawnObstacles()
  spawnOrbs()
 
  /*if(obstaclesGroup.isTouching(spaceship) || topCliff.isTouching(spaceship) || bottomCliff.isTouching(spaceship)){
    topCliff.velocityX = -10
    bottomCliff.velocityX= -10
  
  }*/

}

function timeOut(ms){
  return new Promise(invincible=> setTimeout(invincible,ms))


}

async function normal(){
  await timeOut(5000)
  gameState = PLAY
}




