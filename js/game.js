let { init, GameLoop, Sprite, initKeys, keyPressed, bindKeys, SpriteSheet} = kontra;
let { canvas } = init();
initKeys();
// canvas size and position
canvas.width = 600;
canvas.height = 600;
canvas.parentElement.style.textAlign = "center";


let loop = GameLoop({  // create the main game loop
  update: function() { // update the game state
    hero.update();
    enemy.update();
    wallArray.forEach(wall => wall.update())
  },
  render: function() { // render the game state
    hero.render();
    enemy.render();
    wallArray.forEach(wall => wall.render())
  }
});

loop.start();    // start the game