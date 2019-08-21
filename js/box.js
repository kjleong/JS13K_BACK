let hero = Sprite({
    x: 500,        // starting x,y position of the sprite
    y: 500,
    color: 'red',  // fill color of the sprite rectangle
    width: 20,     // width and height of the sprite rectangle
    height: 20,
    dx: 10,
    dy: 10,       // move the sprite 2px to the right every frame
    update: function () {

        let wallTouch = wallCollision();

        if (keyPressed('left')) {
            if (this.x > 0) {
                this.x -= this.dx;
            }
        }
        if (keyPressed('right')) {
            if (this.x < canvas.width - this.width) {
                this.x += this.dx;
            }
        }
        if (keyPressed('up')) {
            if (this.y > 0) {
                this.y -= this.dy;
            }
        }
        if (keyPressed('down')) {
            if (this.y < canvas.height - this.height) {
                this.y += this.dy;
            }
        }
    }
});

function collidesWithWall(object, wall) {
    if (this.rotation || object.rotation) return null;

    // take into account sprite anchors
    let x = this.x - this.width * this.anchor.x;
    let y = this.y - this.height * this.anchor.y;

    let objX = object.x;
    let objY = object.y;
    if (object.anchor) {
        objX -= object.width * object.anchor.x;
        objY -= object.height * object.anchor.y;
    }

    let collideObj = {
        left: x < objX + object.width,
        right: x + this.width > objX,
        up: y < objY + object.height,
        down: y + this.height > objY,
    };

    return collideObj;
}

let getWallSprite = function(x,y,width,height,color='black') {
    let wall =  Sprite({
        x: x,        
        y: y,
        color: color,  
        width: width,     
        height: height,
        collidesWith: collidesWithWall
    });
    return wall;
}
let wallThickness = 10
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

    //test wall
    getWallSprite(200, 400, 300, wallThickness),

]

let wallCollision = function() {
    var collided = {
        right: false,
        left: false,
        down: false,
        up: false
    };
    wallArray.forEach(function (wall, index) {
        singleCollision = wall.collidesWith(hero);
        console.log([index,singleCollision]);
        for (let dirKey in singleCollision){
            if (collided[dirKey] === false && singleCollision[dirKey] === true) {
                collided[dirKey] = true
            }
        };
    });
    return collided; 
}