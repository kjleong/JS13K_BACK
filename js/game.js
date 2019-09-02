
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



// Event Call backs
function moveSword(p) {
  let { hero, sword } = p.pieces;
  if(sword == undefined) {
    sword = new Sword('sword', 'item',hero.sprite.x + hero.sprite.width, hero.sprite.y);
    sword.addToPieces(pieces)

  } else if(sword && sword.renderMe && sword.renderTime > 0) { // keep render

    // sword.sprite.x = hero.sprite.y + hero.sprite.height;
    sword.updatePosition(hero.sprite)
  
  } else if (sword && sword.renderMe && sword.renderTime >= 0) { // switch off
    // sword.kill();
    
    
  // } else if (sword && sword.renderMe && hero.sprite.direction == 'up') {
  //   console.log('up')
  //   sword.sprite.x = hero.sprite.x + hero.sprite.width;
  }
  // else {
    
  //   console.log('show sword', sword.renderTime)
  // }
  
};

on('swing',moveSword);
// console.log(on, emit)


//Levels (will be controlled by state)
sandboxLevel(pieces)

let runGameLoopUpdate = function(pieces) {
  // Going to define hero's update and dependencies here
  // extracting pieces by type
  let hero = pieces.getPiece('hero');
  let wallPieces = pieces.getByType('wall');
  let itemPieces = pieces.getByType('item');
  let enemyPieces = pieces.getByType('enemy');
  let swordPiece = itemPieces['sword'];

  //define what would stop hero's movements
  hero.setStopMove(hero.touchedOn(wallPieces));

  // define when enemy movement -- buggy due to ignore mutliple setStopMove 
  // TODO: need to figure out why its apply multiple setStopmove

  Object.values(enemyPieces).forEach(e => {
    e.setStopMove(e.touchedOn(itemPieces)) // ignores first couple lines 
    e.setStopMove(e.touchedOn(wallPieces)) // only apply the last touched item setSTopmove here
    // e.setStopMove(e.touchedOn(enemyPieces))
   
  })

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
      enemy.kill();
    }
  }
  hero.blinkEffect(30);
  
// update sword swing -- paused to test movement
  if (swordPiece) {
    if (swordPiece.renderTime >= 0) {
      swordPiece.renderTime = swordPiece.renderTime - 1.0/60;
    } else {
      // swordPiece.kill();
      swordPiece.renderTime = 2.0;
    }
  }
  // update everything else by sprite.update function
  pieces.updateAll();
  pieces.purgePieces();
  
  // console.log(hero.getStats(['health','itemCount']));

}

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    runGameLoopUpdate(pieces);
  },
  render: function () { // render the game state
    pieces.renderAll();
  }
});



