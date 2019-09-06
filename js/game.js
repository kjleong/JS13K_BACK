
//initializing all pieces to hold pieces
let pieces = new Allpieces();
let hero = new Hero('hero', Sprite({
  x: 500,        // starting x,y position of the sprite
  y: 500,
  color: 'green',  // fill color of the sprite rectangle
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
  } else if (sword && sword.renderMe && sword.renderTime <= 0) { // switch off
    sword.kill();
  }  
};

// register action event -- used in hero class for melee
on('melee', moveSword);

let runGameLoopUpdate = function(gameState,pieces) {

  startLevels(gameState,pieces);
  

  // Going to define hero's update and dependencies here
  // extracting pieces by type
  let hero = pieces.getPiece('hero');
  let wallPieces = pieces.getByType('wall');
  let itemPieces = pieces.getByType('item');
  let enemyPieces = pieces.getByType('enemy');
  let movePieces = pieces.getByType('move');
  let stairPieces = pieces.getByType('stairs');
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
    e.updateStopMove(e.touchedOn(stairPieces), true)
  })

  //pickup item interaction
  Object.values(itemPieces).forEach(item =>{
    if (hero.sprite.collidesWith(item.sprite)) {
      hero.itemCount += 1;
      item.kill();
      if (item.itemType=='heart'){
        hero.health += 1;
      }
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
        gameState.enemiesKilled += 1;
      }
    }
  }
  hero.blinkEffect(30);

  //define what would stop movements
  hero.setStopMove(hero.touchedOn({ ...wallPieces, ...immovablePieces, ...stairPieces, }));
  for (let key in movablePieces) {
    let move = movablePieces[key];
    move.setStopMove(move.touchedOn({ ...wallPieces, ...immovablePieces, ...stairPieces, ...enemyPieces}));
    move.updateStopMove(hero.getStopMove(),true);
    hero.updateStopMove(move.getStopMove(), true);
    for (let skey in movablePieces) {
      let move2 = movablePieces[skey];
      move2.updateStopMove(move.getStopMove(), true);
      move2.updateStopMove(move2.touchedOn(enemyPieces), true);
      hero.updateStopMove(move2.getStopMove(), true);
    }
    hero.updateStopMove(move.getStopMove(), true);
  }

  //TODO: sav for later
  // Object.values(enemyPieces).forEach(e => {
  //   if (Object.values(movePieces).some((x) => e.sprite.collidesWith(x.sprite))) {
  //     e.sprite.positiveDirection = !e.sprite.positiveDirection;
  //   }
  // });
  
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

  //check stairs
  if (anyDirTrue(hero.touchedOn(stairPieces)) || Object.values(stairPieces).some((x) => hero.sprite.collidesWith(x.sprite))) {
    gameState.floor -= 1;
    gameState.floorStarted = false;
    pieces.clearPieces();
    console.log(gameState);
  }
  
  // update everything else by sprite.update function
  pieces.updateAll();
  pieces.purgePieces();
  
}

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    switch(gameState.state) {
      case 'menu':
        break;
      case 'game':
        runGameLoopUpdate(gameState,pieces);
        break
      case 'end':
        //endGameScreen
        break;
      case 'credits':
        //credits
        break;
      default:
        showMenu(gameState);
    }
  },
  render: function () { // render the game state
    switch (gameState.state) {
      case 'menu':
        showMenu(gameState);
        break;
      case 'game':
        pieces.renderAll();
        makeStats(hero);
        gameState.updateTimer();
        break;
      case 'end':
        //endGameScreen
        break;
      case 'credits':
        //credits
        break;
      default:
        showMenu(gameState);
    }
  }
});
loop.start();



