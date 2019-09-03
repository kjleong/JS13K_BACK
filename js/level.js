

//Make boundaries
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
    new FastGP('i_blue', 'item', 200, 200, 20, 20, 'blue').addToPieces(pieces);
    new FastGP('i_orange', 'item', 400, 300, 20, 20, 'orange').addToPieces(pieces);

    new FastGP('e_white', 'enemy', 500, 400, 20, 20, 'white').addToPieces(pieces);

    // Enemies
    var a = new Enemy('e_red', 'enemy', 150, 200, 20, 20, 'red', 'horizontal').addToPieces(pieces);
    var b = new Enemy('e_purple', 'enemy', 250, 200, 20, 20, 'purple', 'vertical', 200, 5).addToPieces(pieces);

}
