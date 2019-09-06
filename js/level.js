

//Make boundaries
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


let makeBasicWalls = function(pieces) {
    let wallThickness = 10;
    let wallColor = 'white';
    //Canvas Boarder
    new FastGP('w1', 'wall', 0, 0, canvas.width, wallThickness, wallColor).addToPieces(pieces);
    new FastGP('w2', 'wall', 0, 0, wallThickness, canvas.height, wallColor).addToPieces(pieces);
    new FastGP('w3', 'wall', 0, canvas.height - wallThickness, canvas.width, wallThickness, wallColor).addToPieces(pieces);
    new FastGP('w4', 'wall', canvas.width - wallThickness, 0, wallThickness, canvas.height, wallColor).addToPieces(pieces);
    //status boundary
    new FastGP('w5', 'wall', 0, 100, canvas.width, wallThickness, wallColor).addToPieces(pieces);
    //tower boundary
    new FastGP('w6', 'wall', 100, 100, wallThickness, canvas.height - 100, wallColor).addToPieces(pieces);
}

let sandboxLevel = function (pieces) {
    let hero = pieces.getPiece('hero');
    makeBasicWalls(pieces);

    //test items
    new FastGP('i_green', 'item', 300, 300, 20, 20,'green').addToPieces(pieces);
    new FastGP('i_orange', 'item', 400, 300, 20, 20, 'orange').addToPieces(pieces);

    new FastGP('e_white', 'enemy', 500, 400, 20, 20, 'white').addToPieces(pieces);

     new SwordItem('i_sword', 200, 450).addToPieces(pieces);
    new Move('i_purple',  200, 300, 20, 20, 'purple').addToPieces(pieces);
    new Move('i_blue',  200, 200, 20, 20, 'blue').addToPieces(pieces);

    // Enemies
    var a = new Enemy('e_red', 'enemy', 150, 200, 20, 20, 'red', 'horizontal').addToPieces(pieces);
    var b = new Enemy('e_purple', 'enemy', 250, 200, 20, 20, 'purple', 'vertical', 200, 5).addToPieces(pieces);

}
