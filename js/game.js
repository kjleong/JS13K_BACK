
canvas.width = 600;
canvas.height = 600;
canvas.parentElement.style.textAlign = "center";


let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    hero.update();
    wallArray.forEach(wall => wall.update())
  },
  render: function() { // render the game state
    hero.render();
    wallArray.forEach(wall => wall.render())
  }
});

// loop.start();    // start the game