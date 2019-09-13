
let { 
  init, 
  GameLoop,
  Sprite, 
  initKeys,
  keyPressed,
  keyMap,
  bindKeys,
  on,
  emit
} = kontra;


initKeys();

let { canvas } = init();
//define canvas area
canvas.width = 600;
canvas.height = 600;
canvas.parentElement.style.textAlign = "center";

gameState = new Game();

let showMenu = function () {
  var ctx = canvas.getContext("2d");
  ctx.font = "100px Helvetica";
  ctx.fontWeight = "bold";
  ctx.fillStyle = "white";

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Back Down", canvas.width/2, 50);
  ctx.fillText("The Tower", canvas.width / 2, 150);
  ctx.font = "30px Arial";
  ctx.fillText("Press Enter To Play", canvas.width/2, 250);

  ctx.font = "20px Arial";
  ctx.fillText("Press Backspace For Backstory", canvas.width / 2, 300);

  ctx.textAlign = "left";
  
  ctx.fillText("[arrows] to move", canvas.width / 4, 400);
  ctx.fillText("[a] to attack non-gray (pick up sword first)", canvas.width / 4, 450);
  ctx.fillText("[z] to move gray boxes", canvas.width / 4, 500);
  ctx.fillText("[esc] to restart", canvas.width / 4, 550);

  if (keyPressed('enter')) {
    gameState.state = 'game';
  }

  if (keyPressed(keyMap[8])) {
    gameState.state = 'backstory';
  }


  let ii;
  for (ii = 0; ii < 7; ii++) {
    new Tower('tower' + ii, 'tower', 25, 200 + 60 * ii).sprite.render()
  } 
}

let backStory = function () {
  var ctx = canvas.getContext("2d");
  var ii = 0;
  ctx.textAlign = "left";
  ctx.font = "20px Arial";
  let indent = 50;
  ctx.fillText("In this game, you've most definitely defeated the boss.", indent, 50);
  ctx.fillText("You just need to go back down the tower to go home,", indent, 100);
  ctx.fillText("buy groceries and walk your dog.", indent, 150);
  ctx.fillText("Unfortunately, you've used a cheat code to get to the boss", indent, 250);
  ctx.fillText("and all of the enemies and traps are still there.", indent, 300);
  ctx.fillText("Too bad the cheat code was a one-way ticket.", indent, 350);
  ctx.fillText("It was bought from a shady cube.", indent, 400);
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Press Enter To Play", canvas.width / 2, 500);

  if (keyPressed('enter')) {
    gameState.state = 'game';
  }
}

let endGame = function () {

  var ctx = canvas.getContext("2d");
  ctx.font = "100px Helvetica";
  ctx.fontWeight = "bold";
  ctx.fillStyle = "white";

  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.font = "60px Arial";

  if (gameState.win) {
    ctx.fillText("You Win!", canvas.width / 2, 100);
    ctx.fillText("You Went Back", canvas.width / 2, 200);
    ctx.fillText("Down The Tower", canvas.width / 2, 300);
  } else {
    ctx.fillText("You Lost!", canvas.width / 2, 100);
    ctx.fillText("Your Health", canvas.width / 2, 200);
    ctx.fillText("Reached 0", canvas.width / 2, 300);
  }
  ctx.font = "30px Arial";
  ctx.fillText("Press Enter To Play Again", canvas.width / 2, 400);
  if (keyPressed('enter')) {
    gameState.resetGame();
    gameState.state = 'menu';
    resetHero(pieces,hero)
  }  
}