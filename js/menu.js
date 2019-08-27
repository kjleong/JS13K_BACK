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
  bindKeys 
} = kontra;

initKeys();

let { canvas } = init();

allSprites = {}

function initState(){
  let state = {
    start: false,
    health: 100,
    points: 0,
    stage: 10,
    currentRoom: 1,
    win: false
  };
  setStoreItem('state', state);
}

function Player () {};

Player.prototype.getHealth = function(){
  return get('health');
}

Player.prototype.setHealth = function(health){
  set('health',health);
}

function Game ({start, points, stage, currentRoom, win}) {
  this.start = start;
  this.points = points;
  this.stage = stage;
  this.currentRoom = currentRoom;
  this.win = win;
}



// Score Model
Game.prototype.getStart = function(){
  return get('start');
}

Game.prototype.getPoints = function(){
  return get('points');
}

Game.prototype.incPoints = function(val = 1) {
  var newVal = get('points') + val;
  set('points',newVal);
}

Game.prototype.decPoints = function(val = 1) {
  var newVal = get('points') - val;
  set('points',newVal);
}

Game.prototype.getstage = function(){
  return get('stage');
}

Game.prototype.getRoom = function(){
  return get('currentRoom')
}

if (getStoreItem('state') === null) {
  initState();
}

g1 = new Game(getStoreItem('state'))
console.log(g1)
points = g1.getPoints();
console.log("points", points)

g1.incPoints()

console.log('update', g1.getPoints())
p1 = player;

// TODO: need to add on click to menu to update game start and stop

initPointer();



// function game () {
//   this.start;
//   this.win;

// }

// function player(){

// }

