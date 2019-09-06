

// Stats
let writeStat = function (ctx, x,y,label,value) {
    ctx.fillText(label, x, y);
    x += ctx.measureText(label).width;
    ctx.fillText(value, x, y);
}

let makeStats = function (hero) {
    //var c = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.fontWeight = "bold";
    ctx.fillStyle = "white";
    ctx.textAlign = "start";
    ctx.textBaseline = "top";
    let yRow1 = 20;
    let yRow2 = 65;
    writeStat(ctx, 20, yRow1, "Health: ", hero.health);
    writeStat(ctx, 220, yRow1, "Floor: ", gameState.floor);
    writeStat(ctx, 420, yRow1, "Items: ", hero.itemCount);

    writeStat(ctx, 20, yRow2, "Enemies TOTALLY Killed: ", gameState.enemiesKilled);
    writeStat(ctx, 420, yRow2, "Time: ", gameState.getTimeMin());
    writeStat(ctx, 420 + ctx.measureText("Time: " + gameState.getTimeMin()).width, yRow2, ":", gameState.getTimeSec());
}

//level checker/starter
let startLevels = function (gameState, pieces) {
    if (!gameState.floorStarted) {

        switch (gameState.floor) {
            case 12: testlevel12(gameState, pieces); break;//testlevel12(gameState, pieces); break;
            case 11: testlevel11(gameState, pieces); break;
            case 10: level10(gameState, pieces); break;
            case 9: level9(gameState, pieces); break;
            case 8: level8(gameState, pieces); break;
            case 7: level7(gameState, pieces); break;
            case 6: level6(gameState, pieces); break;
            case 5: level5(gameState, pieces); break;
            case 4: level4(gameState, pieces); break;
            case 3: level3(gameState, pieces); break;
            case 2: level2(gameState, pieces); break;
            case 1: level1(gameState, pieces); break;
            default:
                gameState.floorStarted = false;
                gameState.state = 'end';
        }
    }
}
//every level should start with this
let initializeLevel = function (gameState, pieces) {

    gameState.floorStarted = true;
    //Canvas Boarder
    new Wall('w1','h' ,0, 0, canvas.width).addToPieces(pieces);
    new Wall('w2','v' ,0, 0, canvas.height).addToPieces(pieces);
    new Wall('w3','h' , 0, canvas.height - 10, canvas.width).addToPieces(pieces);
    new Wall('w4', 'v', canvas.width - 10, 0, canvas.height).addToPieces(pieces);
    //status boundary
    new Wall('w5', 'h', 0, 100, canvas.width).addToPieces(pieces);
    //tower boundary
    new Wall('w6',  'v', 100, 100,  canvas.height - 100).addToPieces(pieces);

    for (let ii = 0; ii<7;ii++){
        new Tower('tower' + ii, 'tower',25, 170 +60 * ii).addToPieces(pieces);
    } 
    new FastGP('marker', 'marker', 25 + 60 / 2 - 10, 150 + 420 / 12 * (12-gameState.floor), 20,20,'green').addToPieces(pieces);

    return pieces.getPiece('hero')
}

let sandboxLevel = function (gameState,pieces) {

    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 120;
    hero.sprite.y = 550;
}

//Levels
let testlevel12 = function (gameState,pieces) {

    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 120;
    hero.sprite.y = 550;

    //test items
    new FastGP('i_green', 'item', 300, 300, 20, 20, 'green').addToPieces(pieces);
    new FastGP('i_orange', 'item', 400, 300, 20, 20, 'orange').addToPieces(pieces);

    new FastGP('e_white', 'enemy', 500, 400, 20, 20, 'white').addToPieces(pieces);

    new Move('i_purple', 200, 300, 20, 20, 'purple').addToPieces(pieces);
    new Move('i_blue', 200, 200, 20, 20, 'blue').addToPieces(pieces);

    // Enemies
    var a = new Enemy('e_red', 'enemy', 150, 200, 20, 20, 'red', 'horizontal').addToPieces(pieces);
    var b = new Enemy('e_purple', 'enemy', 250, 200, 20, 20, 'purple', 'vertical', 200, 5).addToPieces(pieces);

    new Stairs('stair1', 300, 520).addToPieces(pieces);

    
}

let testlevel11 = function (gameState, pieces) {

    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 120;
    hero.sprite.y = 550;

    var a = new Enemy('e1', 'enemy', 150, 200, 20, 20, 'red', 'vertical').addToPieces(pieces);
    new Stairs('stair1', 550, 120).addToPieces(pieces);

}

let level10 = function (gameState,pieces) { 
    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 120;
    hero.sprite.y = 400;

    new Stairs('stair1', 300, 300).addToPieces(pieces);
}

let level9 = function (gameState,pieces) { 

    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 550;
    hero.sprite.y = 120;

    new Wall('w7', 'v', 200, 200, 500).addToPieces(pieces);
    new Wall('w8', 'v', 300, 100, 400).addToPieces(pieces);
    new Wall('w9', 'v', 400, 200, 400).addToPieces(pieces);
    new Wall('w10', 'v', 500, 100, 400).addToPieces(pieces);

    var a = new Enemy('e1', 'enemy', 150, 200, 20, 20, 'red', 'horizontal').addToPieces(pieces);

    new Stairs('stair1', 140, 550).addToPieces(pieces);

}

let level8 = function (gameState,pieces) { }

let level7 = function (gameState,pieces) { }

let level6 = function (gameState,pieces) { }

let level5 = function (gameState,pieces) { }

let level4 = function (gameState,pieces) { }

let level3 = function (gameState,pieces) { }

let level2 = function (gameState,pieces) { }

let level1 = function (gameState,pieces) { }

