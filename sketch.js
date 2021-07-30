const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;


var bg,bg2,bg3,form,system,code,security;
var aladin,aladinn,coin,coin_img,coinGroup,i=0;
var score=0;
var level=0;
var coinScore=0;

function preload() {
 
  
  bg= loadImage("aladdin_cave.jpg")
  //load image for the treasure background
  bg2=loadImage("treasure.jpg")
  bg3=loadImage("Aladdin-Disney.jpg")
  coin_Img=loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png","coin7.png",)
}

function setup() {
  createCanvas(1000,500);
  engine = Engine.create();
  world = engine.world;

  security = new Security();
  system = new System();
  
  coinGroup= new Group()
  aladin= new Aladin(100,100,50,50)
  
}

function draw() {
  background(bg);
Engine.update(engine);

if(level === 0)
  {clues();
  security.display();
  textSize(20);
  fill("white");
  text("Score: " + score, 450, 50);}
// add code for changing the background to the treasure background
  

  if(score === 3) {
    level = 1;
    clear()
    background(bg2)
    image(bg2,-500,0,10000,500)

    aladin.display();

    aladinn=createSprite(aladin.body.position.x+60,aladin.body.position.y+20,20,70)
    aladinn.visible=false; 
 
    camera.position.x=aladin.body.position.x
    camera.position.y=height/2

    textSize(20);
    fill("white");
    var pos = aladin.body.position.x+350
    text("Score: " + coinScore,pos , 50);

    spawnCoin();

    if(coinGroup.isTouching(aladinn))
    {
      coinScore+=10;
      coinGroup.get(i)
      coinGroup[i].destroy()
    }
   
  }

  /*if(coinScore === 20)
    {
      level=2
      clear()
        background(bg3)
        
    }*/
  if(keyDown(RIGHT_ARROW))
  {
  Matter.Body.setPosition(aladin.body,{x:aladin.body.position.x+5,y:aladin.body.position.y+0})
  }

  if(keyDown(UP_ARROW))
  {
  Matter.Body.setPosition(aladin.body,{x:aladin.body.position.x+0,y:aladin.body.position.y-5})
  }

  if(keyDown(DOWN_ARROW))
  {
  Matter.Body.setPosition(aladin.body,{x:aladin.body.position.x+0,y:aladin.body.position.y+5})
  }
  drawSprites()
}

function spawnCoin()
{
  if(frameCount%50===0)
{
     var pos = aladin.body.position.x+600
     coin=createSprite(pos,random(20,480),20,20)
     coin.addAnimation("round",coin_Img)
     coin.scale=0.080
     coinGroup.add(coin);
     coin.lifetime= 500
}

}