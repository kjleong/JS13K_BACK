

// Stats
let heroStartLoc = [
    {x: 550, y: 120}, // top right
    {x: 300, y: 300}, // center
    {x: 120, y: 120}, // top left
]

function randArray(array){
    let index = Math.floor(Math.random()*array.length);
    return array[index];
}

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
    writeStat(ctx, 360, yRow1, "Enemy KOs: ", gameState.enemiesKilled);

    writeStat(ctx, 20, yRow2, "Time: ", gameState.getTimeMin());
    writeStat(ctx, 20 + ctx.measureText("Time: " + gameState.getTimeMin()).width, yRow2, ":", gameState.getTimeSec());
    writeStat(ctx, 220, yRow2, "Items: ", hero.itemCount);
    writeStat(ctx, 360, yRow2, "Sword Atks: ", gameState.swordHealth);
    }

//level checker/starter
let startLevels = function (gameState, pieces) {
    if (!gameState.floorStarted) {

        switch (gameState.floor) {
            case 12: level6(gameState, pieces); break;//testlevel12(gameState, pieces); break;//testlevel12(gameState, pieces); break;
            case 11: level6(gameState, pieces); break;//testlevel11(gameState, pieces); break;
            case 10: level6(gameState, pieces); break;
            case 9: level9(gameState, pieces); break;
            case 8: level6(gameState, pieces); break;
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
    new FastGP('marker', 'marker', 25 + 60 / 2 - 10, 150 + 420 / 8 * (8-gameState.floor), 20,20,'green').addToPieces(pieces);

    return pieces.getPiece('hero')
}

let sandboxLevel = function (gameState,pieces) {
    gameState.floorStarted = true;
    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 120;
    hero.sprite.y = 550;

    new Heart('h1', 400, 150).addToPieces(pieces);
}
// Sandbox
// let testlevel12 = function (gameState,pieces) {

//     let hero = initializeLevel(gameState, pieces);
//     hero.sprite.x = 300;
//     hero.sprite.y = 300;
//     new Heart('h1', 400, 150).addToPieces(pieces);
//     new Heart('h2', 300, 150).addToPieces(pieces);
//     new SwordItem('s1',200, 200).addToPieces(pieces);
    
//     new Enemy('e_12_1', 'enemy', 300, 500, 20, 20, 'grey', 'horizontal').addToPieces(pieces);
//     new Enemy('e_12_1', 'enemy', 300, 500, 20, 20, 'grey', 'vertical').addToPieces(pieces);

//     new Stairs('stair1', 300, 520).addToPieces(pieces);
    
// }


// Levels
let testlevel12 = function (gameState,pieces) {

    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 120;
    hero.sprite.y = 550;

    //test items
    new FastGP('i_green', 'item', 300, 300, 20, 20, 'green').addToPieces(pieces);
    new FastGP('i_orange', 'item', 400, 300, 20, 20, 'orange').addToPieces(pieces);

    new FastGP('e_white', 'enemy', 500, 400, 20, 20, 'white').addToPieces(pieces);

    new SwordItem('i_sword_1', 350, 350).addToPieces(pieces);
    new SwordItem('i_sword_2', 200, 350).addToPieces(pieces);
    new Move('i_purple', 200, 300, 20, 20, 'purple').addToPieces(pieces);
    new Move('i_blue', 200, 200, 20, 20, 'blue').addToPieces(pieces);

    // Enemies
    // var a = new Enemy('e_red', 'enemy', 150, 200, 20, 20, 'red', 'horizontal').addToPieces(pieces);
    var b = new Enemy('e_purple', 'enemy', 250, 200, 20, 20, 'purple', 'vertical', 200, 5).addToPieces(pieces);

    new Heart('h1', 400, 150).addToPieces(pieces);
    new Stairs('stair1', 300, 520).addToPieces(pieces);

}

// depression level - need to change hero speed to slow
let level8 = function (gameState,pieces) { 
    
    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 550;
    hero.sprite.y = 550;
    
    new Heart('h2', 300, 150).addToPieces(pieces);
    new SwordItem('s1',120, 330).addToPieces(pieces);
    new Enemy('e_purple0', 'enemy', 120, 200, 20, 20, 'purple', 'vertical', 220, 5).addToPieces(pieces);
    new Enemy('e_purple1', 'enemy', 120, 400, 20, 20, 'purple', 'vertical', 220, 5).addToPieces(pieces);
    new Enemy('e_purple2', 'enemy', 160, 200, 20, 20, 'purple', 'vertical', 100, 5).addToPieces(pieces);
    new Enemy('e_purple3', 'enemy', 200, 300, 20, 20, 'purple', 'vertical', 200, 5).addToPieces(pieces);
    new Enemy('e_purple4', 'enemy', 240, 200, 20, 20, 'red', 'vertical', 100, 5).addToPieces(pieces);
    new Enemy('e_purple5', 'enemy', 280, 300, 20, 20, 'purple', 'vertical', 150, 5).addToPieces(pieces);
    new Enemy('e_purple11', 'enemy', 340, 300, 20, 20, 'purple', 'vertical', 150, 5).addToPieces(pieces);
    new Enemy('e_purple12', 'enemy', 400, 300, 20, 20, 'red', 'vertical', 185, 5).addToPieces(pieces);
    new Enemy('e_purple13', 'enemy', 440, 300, 20, 20, 'red', 'vertical', 185, 7).addToPieces(pieces);
    new Enemy('e_purple16', 'enemy', 550, 300, 20, 20, 'purple', 'vertical', 185, 1).addToPieces(pieces);

    new Enemy('e_purple10', 'enemy', 400, 400, 20, 20, 'yellow', 'horizontal', 150, 1).addToPieces(pieces);
    new Enemy('e_purple9', 'enemy', 340, 380, 20, 20, 'yellow', 'horizontal', 150, 6).addToPieces(pieces);
    new Enemy('e_purple6', 'enemy', 280, 300, 20, 20, 'purple', 'horizontal', 150, 5).addToPieces(pieces);
    new Enemy('e_purple7', 'enemy', 280, 340, 20, 20, 'purple', 'horizontal', 150, 5).addToPieces(pieces);
    new Enemy('e_purple8', 'enemy', 280, 120, 20, 20, 'yellow', 'horizontal', 150, 5).addToPieces(pieces);
    new Enemy('e_purple14', 'enemy', 280, 500, 20, 20, 'yellow', 'horizontal', 150, 5).addToPieces(pieces);
    new Enemy('e_purple15', 'enemy', 300, 550, 20, 20, 'yellow', 'horizontal', 150, 5).addToPieces(pieces);
    
    new Stairs('stair1', 120, 120).addToPieces(pieces);
    
}

// Narrow path
let level7 = function (gameState,pieces) { 
    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 550;
    hero.sprite.y = 550;
    new Wall('w7', 'h', 200, 200, 500).addToPieces(pieces);
    new Wall('w9', 'h', 200, 240, 340).addToPieces(pieces);
    new Wall('w10', 'v', 530, 250, 120).addToPieces(pieces);
    new Wall('w11', 'h', 530, 370, 60).addToPieces(pieces);

    new Move('b0', 500, 550, 20, 20, 'grey').addToPieces(pieces);
    new Move('b1', 220, 210, 20, 20, 'grey').addToPieces(pieces);
    new Move('b2', 240, 220, 20, 20, 'grey').addToPieces(pieces);
    new Move('b3', 260, 220, 20, 20, 'grey').addToPieces(pieces);

    new Enemy('e_purple15', 'enemy', 460, 550, 20, 20, 'yellow', 'horizontal', 150, 5).addToPieces(pieces);
    new Enemy('e_purple16', 'enemy', 300, 210, 20, 20, 'yellow', 'horizontal', 150, 1).addToPieces(pieces);
    new Enemy('e_purple17', 'enemy', 555, 300, 20, 20, 'yellow', 'vertical', 150, 1).addToPieces(pieces);
    
    new Stairs('stair1', 550, 330).addToPieces(pieces);
}

function genMove(num){
    let items = [{}];
    for(let i; i < num; i++) {
        items.push(new Move(`b${num}`,))
    }
}

function wallBox(){
    for(let i; i < num; i++) {
        items.push(new Wall(`w${num}`,))
    }
}
// blocks stuck in wall to hide shortcuts
let level6 = function (gameState,pieces) { 
    gameState.floorStarted = true;
    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 120;
    hero.sprite.y = 400;

    new Move('b0', 500, 550, 20, 20, 'grey').addToPieces(pieces);
    //inner walls
    new Wall('w10','h', 280, 270, 90).addToPieces(pieces);

    new Wall('w11','h', 280, 350, 80).addToPieces(pieces);
    new Wall('w12','v', 280, 280, 80).addToPieces(pieces);
    new Wall('w13','v', 350, 280, 50).addToPieces(pieces);
       // outer walls
    new Wall('w14','v', 310, 230, 40).addToPieces(pieces);
    new Wall('w15','v', 310, 360, 30).addToPieces(pieces);
    new Wall('w16','h', 360, 310, 40).addToPieces(pieces);
    new Wall('w17','h', 240, 310, 40).addToPieces(pieces);

    new Wall('w18','v', 400, 220, 190).addToPieces(pieces);
    new Wall('w18','h', 400, 220, 190).addToPieces(pieces);

    new Move('w10-b1', 320, 260, 20, 20, 'grey').addToPieces(pieces);
    new Move('w10-b2', 290, 260, 20, 20, 'grey').addToPieces(pieces);

    new Move('w11-b1', 330, 350, 20, 20, 'grey').addToPieces(pieces);
    new Move('w11-b2', 300, 350, 20, 20, 'grey').addToPieces(pieces);

    
    new Move('w12-b1', 350, 330, 20, 20, 'grey').addToPieces(pieces);
    new Move('w12-b2', 350, 300, 20, 20, 'grey').addToPieces(pieces);
    new Move('w12-b3', 350, 270, 20, 20, 'grey').addToPieces(pieces);

    new Move('w13-b1', 270, 340, 20, 20, 'grey').addToPieces(pieces);
    new Move('w13-b2', 270, 310, 20, 20, 'grey').addToPieces(pieces);
    new Move('w13-b3', 270, 280, 20, 20, 'grey').addToPieces(pieces);

    
    new Move('b1', 350, 330, 20, 20, 'grey').addToPieces(pieces);
    new Move('b2', 350, 300, 20, 20, 'grey').addToPieces(pieces);
    new Move('b3', 350, 270, 20, 20, 'grey').addToPieces(pieces);

 

    new Move('w18-b1', 300, 230, 20, 20, 'grey').addToPieces(pieces);
    new Move('w19-b1', 310, 380, 20, 20, 'grey').addToPieces(pieces);
    new Move('w20-b1', 380, 300, 20, 20, 'grey').addToPieces(pieces);
    new Move('w21-b1', 240, 310, 20, 20, 'grey').addToPieces(pieces);
    


    // multiple block generator
    

    new Stairs('stair1', 300, 300).addToPieces(pieces);

}

let level5 = function (gameState,pieces) { 
    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 550;
    hero.sprite.y = 120;

    // new Wall('w7', 'v', 200, 200, 500).addToPieces(pieces);
    // new Wall('w8', 'v', 300, 100, 400).addToPieces(pieces);
    // new Wall('w9', 'v', 400, 200, 400).addToPieces(pieces);
    // new Wall('w10', 'v', 500, 100, 400).addToPieces(pieces);

    var a = new Enemy('e1', 'enemy', 150, 200, 20, 20, 'red', 'horizontal').addToPieces(pieces);

    new Stairs('stair1', 140, 550).addToPieces(pieces);

}




let level2 = function (gameState,pieces) { 
    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 120;
    hero.sprite.y = 400;

    new Stairs('stair1', 300, 300).addToPieces(pieces);

}

let level1 = function (gameState,pieces) { 
    let hero = initializeLevel(gameState, pieces);
    hero.sprite.x = 120;
    hero.sprite.y = 400;

    new Stairs('stair1', 300, 300).addToPieces(pieces);

}




