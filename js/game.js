//define canvas area
canvas.width = 600;
canvas.height = 600;
canvas.parentElement.style.textAlign = "center";

//initializing all pieces to hold pieces
let pieces = new Allpieces();
let hero = new Hero('hero', Sprite({
  x: 500,        // starting x,y position of the sprite
  y: 500,
  color: 'red',  // fill color of the sprite rectangle
  width: 20,     // width and height of the sprite rectangle
  height: 20,
}));
hero.addToPieces(pieces)
hero.health = 10;

//Levels (will be controlled by state)
sandboxLevel(pieces)

let runGameLoopUpdate = function(pieces) {
  // Going to define hero's update and dependencies here
  // extracting pieces by type
  let hero = pieces.getPiece('hero');
  let wallPieces = pieces.getByType('wall');
  let itemPieces = pieces.getByType('item');
  let enemyPieces = pieces.getByType('enemy');

  //define what would stop hero's movements
  let heroStop = hero.touchedOn(wallPieces);

  //pickup item interaction
  for (let key in itemPieces) {
    let item = itemPieces[key]
    if (hero.sprite.collidesWith(item.sprite)) {
      hero.itemCount += 1;
      item.destroyMe = true;
    }
  }

  //enemy interaction
  for (let key in enemyPieces) {
    let enemy = enemyPieces[key]
    if (hero.sprite.collidesWith(enemy.sprite) && !hero.invulnerable) {
      hero.health -= 1;
      hero.invulnerable = true;
    }
  }
  hero.blinkEffect(30);

  //defining hero update here so it can interact with stuff
  if (keyPressed('left') && !heroStop.left) {
    if (hero.sprite.x > 0) {
      hero.sprite.x += hero.dLeft;
    }
  }
  if (keyPressed('right') && !heroStop.right) {
    if ((hero.sprite.x < canvas.width - hero.sprite.width)) {
      hero.sprite.x += hero.dRight;
    }
  }
  if (keyPressed('up') && !heroStop.top) {
    if (hero.sprite.y > 0) {
      hero.sprite.y += hero.dUp;
    }
  }
  if (keyPressed('down') && !heroStop.bottom) {
    if ((hero.sprite.y < canvas.height - hero.sprite.height)) {
      hero.sprite.y += hero.dDown;
    }
  }
  // update everything else by sprite.update function
  pieces.updateAllButHero();
  pieces.purgePieces();
  
  console.log('item',hero.getStats());

}

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    runGameLoopUpdate(pieces);
  },
  render: function () { // render the game state
    pieces.renderAll();
  }
});



