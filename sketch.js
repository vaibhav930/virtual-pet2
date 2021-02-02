//Create variables here
var dog , happyDog,dogImage ;
var database , foods, foodStock;
var feed;
var fedTime , lastFed, addFood;
var milk;


function preload()
{
  dogImage = loadImage("dogImg.png")
  happyDog= loadImage("dogImg1.png")
}

function setup() {
  database=firebase.database()
  createCanvas(1000,500);

  dog = createSprite(800,250)
  dog.addImage(dogImage)
  dog.scale=0.2

  foodStock=database.ref('food');
  foodStock.on("value",readStock)

  

 milk= new Food();
feed= createButton("feed the dog")
feed.position(700,110);
feed.mousePressed(feedDog)

addFood= createButton("Add food")
addFood.position(800,110)
addFood.mousePressed(addFoods);

}


function draw() {  
background(46,139,87)
fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastFed= data.val();
  })


milk.display();

fill(255,255,254);
textSize(15);
if(lastFed>=12){
 text("Last Feed :"+ lastFed%12 + " PM", 350,30 );
 }else if(lastFed == 0){
   text("Last Feed : 12AM",350,30)
 }else{
   text("Last Feed : "+ lastFed + "AM",350,30)
 }


//if(keyWentDown(UP_ARROW)){
//writeStock(foods)
//dog.addImage(happyDog)
//}

drawSprites();
  
  text("Food Remaining :"+ foods,100,400)
}

function readStock(data){
foods=data.val();
milk.updateFoodStock(foods)

}


function feedDog(){
dog.addImage(happyDog)

if(milk.getFoodStock()<=0){
  milk.updateFoodStock(milk.getFoodStock()*0)
}
else{
  milk.updateFoodStock(milk.getFoodStock()-1)
}


database.ref('/').update({
  food:milk.getFoodStock(),
  FeedTime:hour()
  })
  }

function addFoods(){

foods++;
database.ref('/').update({
  food:foods
   })
  }








