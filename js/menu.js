
let { 
  init, GameLoop,
  initPointer, 
  track, 
  Sprite, 
  setStoreItem, 
  getStoreItem,
  initKeys,
  keyPressed,
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
  ctx.fillText("Back Down", canvas.width/2, 100);
  ctx.fillText("The Tower", canvas.width / 2, 200);
  ctx.font = "30px Arial";
  ctx.fillText("Press Enter To Play", canvas.width/2, 400);

  ctx.textAlign = "left";
  ctx.font = "20px Arial";
  ctx.fillText("[a] to attack non-gray (pick up sword first)", canvas.width / 4, 500);
  ctx.fillText("[z] to move gray boxes", canvas.width / 4, 550);

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