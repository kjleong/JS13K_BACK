
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
  if(sword == undefined && hero.sprite.attack) {
    sword = new Sword('sword', 'item', hero.sprite.x + hero.sprite.width, hero.sprite.y);
    sword.updatePosition(hero.sprite);
    sword.addToPieces(pieces)
  } else if(sword && sword.renderMe && sword.renderTime > 0) { // keep render
    sword.updatePosition(hero.sprite)
    sword.updateHealth(hero.sprite.swordHealth);
    console.log("sh",sword.health)
  } else if (sword && sword.renderMe && sword.renderTime <= 0) { // switch off

    sword.kill();
  }  
};

// register action event -- used in hero class for melee
on('melee', moveSword);


//Levels (will be controlled by state)
sandboxLevel(pieces)

let runGameLoopUpdate = function(pieces) {
  // Going to define hero's update and dependencies here
  // extracting pieces by type
  let hero = pieces.getPiece('hero');
  let wallPieces = pieces.getByType('wall');
  let itemPieces = pieces.getByType('item');
  let enemyPieces = pieces.getByType('enemy');
  let movePieces = pieces.getByType('move');
  let immovablePieces = {};
  let movablePieces = {}
  let swordPiece = itemPieces['sword'];

  for (let key in movePieces) {
    let move = movePieces[key];
    let moveEnable = false;
    if (anyDirTrue(hero.contactedOnWith(move))) {
      if (hero.getMoveAbilityStatus()) {
        moveEnable = true;
      }
    }
    if (!moveEnable){
      immovablePieces[key] = move;
      move.disableMovement();
    } else {
      movablePieces[key] = move;
      move.enableMovement()
    }
  }

  // define when enemy movement -- buggy due to ignore mutliple setStopMove 
  // TODO: need to figure out why its apply multiple setStopmove

  Object.values(enemyPieces).forEach(e => {
    e.updateStopMove(e.touchedOn(itemPieces),true) // ignores first couple lines 
    e.updateStopMove(e.touchedOn(wallPieces),true) // only apply the last touched item setSTopmove here
    e.updateStopMove(e.touchedOn(movePieces), true) // only apply the last touched item setSTopmove here
    e.updateStopMove(e.touchedOn(enemyPieces),true)
  })

  //pickup item interaction
  Object.values(itemPieces).forEach(item =>{
    if (hero.sprite.collidesWith(item.sprite)) {
      if(item.sprite.itemType == 'sword') {
        hero.sprite.hasSword = true;
        hero.sprite.swordHealth = 10;
      }
      console.log(item.sprite.itemType)
      hero.itemCount += 1;
      item.kill();
    }
  });

  //enemy interaction
  for (let key in enemyPieces) {
    let enemy = enemyPieces[key]
    if (hero.sprite.collidesWith(enemy.sprite) && !hero.invulnerable) { // hero interact with enemy
      hero.health -= 1;
      hero.invulnerable = true;
    }
  
    if (swordPiece) { // sword interaction with enemy
      if(swordPiece.sprite.collidesWith(enemy.sprite)) {
        enemy.kill();
      }
    }
  }
  hero.blinkEffect(30);

  //define what would stop movements
  hero.setStopMove(hero.touchedOn({ ...wallPieces, ...immovablePieces }));
  for (let key in movablePieces) {
    let move = movablePieces[key];
    move.setStopMove(move.touchedOn({ ...wallPieces, ...immovablePieces }));
    //move.updateStopMove(move.touchedOn(enemyPieces), true);
    move.updateStopMove(hero.getStopMove(),true);
    hero.updateStopMove(move.getStopMove(), true);
    for (let skey in movablePieces) {
      let move2 = movablePieces[skey];
      move2.updateStopMove(move.getStopMove(), true);
    }
  }
 
  
// update sword swing
  if (swordPiece) {
    if (swordPiece.renderTime >= 0) {
      swordPiece.renderTime = swordPiece.renderTime - 1.0/60;
    } else {
      swordPiece.kill();
      hero.sprite.attack = false;
      swordPiece.renderTime = 0.5;
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
    makeStats(hero);
    gameState.updateTimer();
  }
});



