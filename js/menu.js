
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

  if (keyPressed('enter')) {
    gameState.state = 'game';
  }
}
