var bgImage,bgSprite;
var bgShip;
var spaceShip_Img;
var comet2_Img,comet3_Img;
var ogroup;
var planet,planet_Img;
var planetspawn=false;
var gameover_Img,gameover;
var restart_Img,restart;
var score=0;

var gamestate="play";


function preload(){
  bgImage=loadImage("Images/galaxy.jpg");
  spaceShip_Img=loadImage("Images/spaceship2.jpg")
  comet2_Img=loadImage("Images/comet2.jpg")
  comet3_Img=loadImage("Images/comet3.jpg")
  gameover_Img=loadImage("Images/Gameover.png")
  restart_Img=loadImage("Images/restart.png")
  planet_Img=loadImage("Images/planet.png")
}


function setup(){
  createCanvas(windowWidth,windowHeight);
  bgSprite=createSprite(windowWidth/2,windowHeight/2,50,50);
  bgSprite.addImage(bgImage);
  bgSprite.scale=9
  bgSprite.velocityX=-2;

  bgShip=createSprite(300,500,10,10);
  bgShip.addImage(spaceShip_Img);
  bgShip.scale=0.5

  bgShip.debug=false;
  bgShip.setCollider("circle",50,0,70);

  gameover=createSprite(windowWidth/2-100,windowHeight/2-100,50,50);
  gameover.addImage(gameover_Img);
  gameover.scale=1;
  gameover.visible = false;

  restart=createSprite(windowWidth/2-100,windowHeight/2+200,50,50);
  restart.addImage(restart_Img);
  restart.scale=0.2;
  restart.visible = false;

  ogroup=new Group();

}


function draw(){
  background('white');
  
  //gamestate play
  if (gamestate=="play") {
    //score = score+1;
    score=score+Math.round(getFrameRate()/60)

      //resetting the background
      if (bgSprite.x<500){
        bgSprite.x = windowWidth/2 
      }

      if (keyDown("UP_ARROW")){
        bgShip.y=bgShip.y-10;
        
      }

      if (keyDown("DOWN_ARROW")){
        bgShip.y=bgShip.y+10;
      }

      if (bgShip.y>windowHeight){
        bgShip.y=windowHeight
      }
      if (bgShip.y<0){
        bgShip.y=0
      }
      spawnobstacle();
      spawnplanet();

      if(bgShip.isTouching(ogroup)){
        gamestate="end"
        console.log("game over")
        //ds.play();
      }
      if(planetspawn==true){

       
        if(bgShip.isTouching(planet)){
          gamestate="end"
          console.log("game over")
          //ds.play();
        }
      }
   
  }
  else{
     // gamestate end 
      if (gamestate=="end"){
        bgSprite.velocityX=0;
        ogroup.setVelocityXEach(0);
        ogroup.destroyEach();
        bgShip.visible=false;
        bgShip.velocityY=0;
        ogroup.setLifetimeEach(-1)
        /*cgroup.setVelocityXEach(0);
        trex.changeAnimation("stop",trex_collide);
        cgroup.setLifetimeEach(-1)*/
        gameover.visible = true;
        restart.visible = true;
        if(mousePressedOver(restart)){
          reset()
        }
    
      }
      
  }

 

  

  drawSprites();
  textSize(50)
  text("score:"+score,windowWidth-250,50);

}

function spawnobstacle(){
  var obstacle;
  if (frameCount % 60 === 0 ) {
    obstacle = createSprite(windowWidth,random(200,windowHeight-200),40,50)
    obstacle.velocityX= -20
    //obstacle.scale= 0.2
    obstacle.lifetime=250
    var r= Math.round(random(1,2))
    obstacle.debug = false;
    //obstacle.setCollider("circle",-250,250,150); 

    switch(r){
      case 1: obstacle.addAnimation("obstacle",comet2_Img);
              obstacle.scale= 0.2
              obstacle.setCollider("circle",-250,250,150);
              break;
      case 2: obstacle.addAnimation("obstacle",comet3_Img);
              obstacle.scale= 0.4
              obstacle.setCollider("circle",-150,150,100);
              break;
      default:obstacle.addAnimation("obstacle",comet2_Img);
              obstacle.scale= 0.2
              obstacle.setCollider("circle",-250,250,150);
              break;
     /* case 3: obstacle.addAnimation("obstacle",comet2_Img);
              break;        
      case 4: obstacle.addAnimation("obstacle",comet3_Img);
              obstacle.scale= 0.2
              break;  
      case 5: obstacle.addAnimation("obstacle",comet2_Img);
              break;        
      case 6: obstacle.addAnimation("obstacle",comet3_Img);
              break;*/

    }
    ogroup.add(obstacle)
  }
}

function reset(){
  gamestate="play";
  bgShip.visible=true;
  score=0
  ogroup.destroyEach();
  bgSprite.velocityX=-2;
  gameover.visible= false;
  restart.visible= false;
}

function spawnplanet(){
  if (score==100 && planetspawn==false) {
    planet = createSprite(windowWidth,random(200,windowHeight-200),40,50)
    planet.addImage(planet_Img);
    planet.velocityX= -20
    planet.scale= 0.2
    planet.lifetime=250
    //var r= Math.round(random(1,2))
    planet.debug = false;
    //planet.setCollider("circle",-250,250,150); 
    planetspawn=true;
    
  }
}