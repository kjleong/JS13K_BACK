// "hero" sprite
let hero = Sprite({
    x: 500,        // starting x,y position of the sprite
    y: 500,
    color: 'red',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 20,
    rotation: 0,
    anchor: {x: 0.5, y: 0.5},
    dx: 10,
    dy: 10,       // move the sprite 2px to the right every frame
    // animations: spriteSheet.animations,
    update: function () {

        let touchedWallOn = wallCollision(this,wallArray);

        if (keyPressed('left')) {
            if (this.x > 0 && !touchedWallOn.right) {
                this.x -= this.dx;
            }
        }
        if (keyPressed('right')) {
            if ((this.x < canvas.width - this.width) && !touchedWallOn.left) {
                this.x += this.dx;
            }
        }
        if (keyPressed('up')) {
            if (this.y > 0 && !touchedWallOn.bottom) {
                this.y -= this.dy;
            }
        }
        if (keyPressed('down')) {
            if ((this.y < canvas.height - this.height) && !touchedWallOn.top) {
                this.y += this.dy;
            }
        }
        // ATTACK OPTION
        if (keyPressed('a')) { // melee
            this.rotation = this.rotation + 10,
            console.log("swing!");
        }
    }
});

//tool to get exact boundaries of a rect sprite
let getSpriteBoundaries = function(s) {
    return {
        top: s.y - s.height * s.anchor.y,
        left: s.x - s.width * s.anchor.x,
        bottom: (s.y - s.height * s.anchor.y) + s.height * (1-s.anchor.y),
        right: (s.x - s.width * s.anchor.x) + s.width * (1-s.anchor.x)
    };
};

// returns object on the direction a w sprite was touched by s
let touchWall = function(s,w) {
    let wb = getSpriteBoundaries(w);
    let sb = getSpriteBoundaries(s);
    return {
        top: (sb.bottom === wb.top && sb.left < wb.right && sb.right > wb.left),
        bottom: (sb.top === wb.bottom && sb.left < wb.right && sb.right > wb.left),
        left: (sb.right === wb.left && sb.top < wb.bottom && sb.bottom > wb.top),
        right: (sb.left === wb.right && sb.top < wb.bottom && sb.bottom > wb.top),
    };
};

// checks collision of all walls in wallArray
let wallCollision = function (sprite,wArray) {
    var collided = {
        right: false,
        left: false,
        top: false,
        bottom: false
    };
    wArray.forEach(function (wall, index) {
        touchedWallOn = touchWall(sprite, wall);
        for (let dirKey in touchedWallOn) {
            if (collided[dirKey] === false && touchedWallOn[dirKey] === true) {
                collided[dirKey] = true
            }
        };
    });
    return collided;
};

// wrapper for creating a wall sprite
let getWallSprite = function(x,y,width,height,color='black') {
    return Sprite({
        x: x,        
        y: y,
        color: color,  
        width: width,     
        height: height,
    });
};

// testing/implementing walls
let wallThickness = 10;
let wallArray = [
    //walls of canvas
    getWallSprite(0, 0, canvas.width, wallThickness),
    getWallSprite(0, 0, wallThickness, canvas.height),
    getWallSprite(0, canvas.height-wallThickness, canvas.width, wallThickness),
    getWallSprite(canvas.width - wallThickness, 0, wallThickness, canvas.height),

    //status boundary
    getWallSprite(0, 100, canvas.width, wallThickness),

    //tower area
    getWallSprite(100, 100, wallThickness, canvas.height-100),

    //test walls
    getWallSprite(200, 350, 300, wallThickness),
    getWallSprite(350, 200, wallThickness, 300),

];

