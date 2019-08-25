// "hero" sprite
let getEnemySprite = function(x,y,width,height,color='blue') {
  return Sprite({
      x: x,        
      y: y,
      color: color,  
      width: width,     
      height: height,
  });
};

console.log("enemy",e1.getById(1))
enemy1 = getEnemySprite(e1.getById(1))

// let enemy = Sprite({
//   x: 400,        // starting x,y position of the sprite
//   y: 400,
//   color: 'blue',  // fill color of the sprite rectangle
//   width: 10,     // width and height of the sprite rectangle
//   height: 10,
//   // dx: 10,
//   // dy: 10,       // move the sprite 2px to the right every frame
//   // animations: spriteSheet.animations,
//   update: function () {

//       let isTouched = enemyCollision(this, hero);
//     if(isTouched) {
//       console.log("touched", this);
//     }
//   }
// });


console.log("hero", hero)
// Enemy collision detection
var rect1 = {x: 5, y: 5, width: 50, height: 50}
var rect2 = {x: 20, y: 10, width: 10, height: 10}

function enemyCollision(obj, main){
  if (obj.position._x < main.position._x + main.width &&
    obj.position._x + obj.width > main.position._x &&
    obj.position._y < main.position._y + main.height &&
    obj.y + obj.height > main.position._y) {
     // collision detected!
    return true;
 }
 return false;
}


// filling in the values =>

if (5 < 30 &&
    55 > 20 &&
    5 < 20 &&
    55 > 10) {
    // collision detected!
}

// enemy.render();
