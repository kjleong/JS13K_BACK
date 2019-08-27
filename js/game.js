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
  dx: 10,
  dy: 10,
}));
hero.addToPieces(pieces)

//Levels (will be controlled by state)
sandboxLevel(pieces)

let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    pieces.updateAll();
  },
  render: function() { // render the game state
    pieces.renderAll();
  }
});



