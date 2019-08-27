//Make boundaries
let makeBasicWalls = function(pieces) {
    let wallThickness = 10;
    //Canvas Boarder
    new Wall('w1', 0, 0, canvas.width, wallThickness).addToPieces(pieces);
    new Wall('w2', 0, 0, wallThickness, canvas.height).addToPieces(pieces);
    new Wall('w3', 0, canvas.height - wallThickness, canvas.width, wallThickness).addToPieces(pieces);
    new Wall('w4', canvas.width - wallThickness, 0, wallThickness, canvas.height).addToPieces(pieces);
    //status boundary
    new Wall('w5', 0, 100, canvas.width, wallThickness).addToPieces(pieces);
    //tower boundary
    new Wall('w6', 100, 100, wallThickness, canvas.height - 100).addToPieces(pieces);
}

let sandboxLevel = function (pieces) {
    let hero = pieces.getPiece('hero');
    makeBasicWalls(pieces);
}
