//  MENU screeen
var menu = document.getElementById("menu");
var toggleBtn = document.getElementById('toggle');
var game = document.getElementById("game");
toggleBtn.onclick = function toggleDisplay(){
  menu.classList.toggle('hide');
  game.classList.toggle('hide');
  loop.start();
}

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

gameState = new Game();
