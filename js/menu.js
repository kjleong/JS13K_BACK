//  MENU screeen
var menu = document.getElementById("menu");
var toggleBtn = document.getElementById('toggle');
var game = document.getElementById("game");
toggleBtn.onclick = function toggleDisplay(){
  menu.classList.toggle('hide');
  game.classList.toggle('hide');
}

let { 
  init, GameLoop,
  initPointer, 
  track, 
  Sprite, 
  setStoreItem, 
  getStoreItem 
} = kontra;

let { canvas } = init();


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


g1 = new Game(getStoreItem('state'))
console.log(g1)
points = g1.getPoints();
console.log("points", points)

g1.incPoints()

console.log('update', g1.getPoints())
p1 = player;

if(getStoreItem('state') === null) {
  initState();
}

// TODO: need to add on click to menu to update game start and stop

initPointer();

let sprite = Sprite({
    x: 0,        // starting x,y position of the sprite
  y: 0,
  color: 'red',  // fill color of the sprite rectangle
  width: 100,     // width and height of the sprite rectangle
  height: 40,
  onDown: function() {
    // handle on down events on the sprite
    console.log("on down")
  },
  onUp: function() {
    // handle on up events on the sprite
    console.log("on up")
  },
  onOver: function() {
    // handle on over events on the sprite
    console.log("on over")
  }
});

console.log("sprite width", sprite)

track(sprite);
sprite.render();



// function game () {
//   this.start;
//   this.win;

// }

// function player(){

// }

