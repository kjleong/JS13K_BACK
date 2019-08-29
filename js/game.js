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
  hero.setStopMove(hero.touchedOn(wallPieces));

  //pickup item interaction
  for (let key in itemPieces) {
    let item = itemPieces[key]
    if (hero.sprite.collidesWith(item.sprite)) {
      hero.itemCount += 1;
      item.kill();
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

  // update everything else by sprite.update function
  pieces.updateAll();
  pieces.purgePieces();
  
  console.log(hero.getStats(['health','itemCount']));

}

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    runGameLoopUpdate(pieces);
  },
  render: function () { // render the game state
    pieces.renderAll();
  }
});



