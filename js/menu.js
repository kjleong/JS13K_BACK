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

var player = {
  setHealth : function(health){
    let state = getStoreItem('state');
    state.health = health;
    setStoreItem('state', state);
  },
  getHealth : function(){
    let state = getStoreItem('state')
    return state.health;
  }
}

function Game ({start, points, stage, currentRoom}) {
  this.start = start;
  this.points = points;
  this.stage = stage;
  this.currentRoom = currentRoom;
}

function get(element) {
  var state = getStoreItem('state');
  return state[element];
}

function set(element, value) {
  var state = getStoreItem('state');
  state[element] = value;
  setStoreItem('state',state);
}

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
points = g1.getPoints();


g1.incPoints()

p1 = player;

if(getStoreItem('state') === null) {
  initState();
}

// TODO: need to add on click to menu to update game start and stop


// let sprite = Sprite({
//   x: 100,        // starting x,y position of the sprite
//   y: 80,
//   color: 'red',  // fill color of the sprite rectangle
//   width: 20,     // width and height of the sprite rectangle
//   height: 40,
//   dx: 2          // move the sprite 2px to the right every frame
// });

// let loop = GameLoop({  // create the main game loop
//   update: function() { // update the game state
//     sprite.update();

//     // wrap the sprites position when it reaches
//     // the edge of the screen
//     if (sprite.x > canvas.width) {
//       sprite.x = -sprite.width;
//     }
//   },
//   render: function() { // render the game state
//     sprite.render();
//   }
// });
// console.log(initPointer)
// this function must be called first before pointer
// functions will work
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

