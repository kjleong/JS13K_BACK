
// ertetrete//  MENU screeen
// var menu = document.getElementById("menu");
// var toggleBtn = document.getElementById('toggle');
// var game = document.getElementById("game");
// toggleBtn.onclick = function toggleDisplay(){
//   menu.classList.toggle('hide');
//   game.classList.toggle('hide');
// }

let { 
  setStoreItem, 
  getStoreItem 
} = kontra;

function initState(){
  let state = {
    start: false,
    health: 100,
    points: 0,
    stage: 10,
    currentRoom: 1,
    enemies: {
      1: {x: 400, y: 400, w: 10, h: 10}
    },
    win: false
  };
  setStoreItem('state', state);
}

function get(element){
  return getStoreItem(element)
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

function Enemy() {}

Enemy.prototype.getAll = function(){
  var e = get('enemies');
  return Object.values(e);
}

Enemy.prototype.getById = function(id){
  var e = get('enemies');
  console.log("e",e)
  return e[id];
}

e1 = new Enemy();
console.log("esdf", e1)
// Example of new game and player
g1 = new Game(getStoreItem('state'))

p1 = new Player();

if(getStoreItem('state') === null) {
  initState();
}

// TODO: need to add on click to menu to update game start and stop

