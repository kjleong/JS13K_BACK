class Allpieces {
    constructor () {
        this.pieces = {};
    }

    addPiece(gp) {
        if (!(gp.spriteKey in this.pieces)) {
            this.pieces[gp.spriteKey] = gp
        }
    }

    removePiece(key) {
        if (key in this.pieces) {
            delete this.pieces[key]
        }
    }

    getPiece(key){
        if (key in this.pieces) {
            return this.pieces[key];
        }
        return null;
    }

    updatePiece(key, newGP) {
        if (key in this.pieces && key === newGP.spriteKey) {
            this.pieces[key] = newGP;
        }
    }

    updateAll() {
        for (let key in this.pieces) {
            this.pieces[key].sprite.update();
        }
    }

    renderAll() {
        for (let key in this.pieces) {
            this.pieces[key].sprite.render();
        }
    }

    getByType(gpType) {
        let somePieces = {};
        for (let key in this.pieces) {
            gp = this.pieces[key]
            if (gp instanceof gpType) {
                somePieces[key] = gp
            }
        }
        return somePieces;
    }

    purgePieces() {
        for (let key in this.pieces) {
            if (this.pieces[key].destoryMe === true) {
                delete this.pieces[key];
            }
        }
    }

}

class Gamepiece {
    constructor(spriteKey, sprite) {
        this.sprite = sprite;
        this.spriteKey = spriteKey;
        this.destroyMe = false;
        this.type = '';
    }

    getSpriteBoundaries() {
        let s = this.sprite;
        return {
            top: s.y - s.height * s.anchor.y,
            left: s.x - s.width * s.anchor.x,
            bottom: (s.y - s.height * s.anchor.y) + s.height * (1 - s.anchor.y),
            right: (s.x - s.width * s.anchor.x) + s.width * (1 - s.anchor.x)
        };
    }

    // contact on this/self's side with another gamePiece
    contactedOnWith(otherGP) {
        let selfBounds = this.getSpriteBoundaries();
        let otherBounds = otherGP.getSpriteBoundaries();
        return {
            bottom: (selfBounds.bottom === otherBounds.top && selfBounds.left < otherBounds.right && selfBounds.right > otherBounds.left),
            top: (selfBounds.top === otherBounds.bottom && selfBounds.left < otherBounds.right && selfBounds.right > otherBounds.left),
            right: (selfBounds.right === otherBounds.left && selfBounds.top < otherBounds.bottom && selfBounds.bottom > otherBounds.top),
            left: (selfBounds.left === otherBounds.right && selfBounds.top < otherBounds.bottom && selfBounds.bottom > otherBounds.top),
        };
    }
    
    setSpriteUpdate(newUpdate) {
        this.sprite.update = newUpdate;
    }

    gpArrayTouchedOn (gpArray) {
        let gpsTouchedOn = {
            right: false,
            left: false,
            top: false,
            bottom: false
        };
        gpArray.forEach(function (gp) {
            gpContectdOnWith = gp.contactedOnWith(this);
            for (let dirKey in gpContectdOnWith) {
                if (gpsTouchedOn[dirKey] === false && gpContectdOnWith[dirKey] === true) {
                    gpsTouchedOn[dirKey] = true
                }
            };
        });
        return gpsTouchedOn;
    };

    addToPieces(ap) {
        ap.addPiece(this)
    }
};

class Hero extends Gamepiece {
    constructor(spriteKey, sprite, health=10) {
        super(spriteKey, sprite);
        this.health = health;
        this.sprite.update = function () {
            if (keyPressed('left')) {
                if (this.x > 0) {
                    this.x -= this.dx;
                }
            }
            if (keyPressed('right')) {
                if ((this.x < canvas.width - this.width)) {
                    this.x += this.dx;
                }
            }
            if (keyPressed('up')) {
                if (this.y > 0) {
                    this.y -= this.dy;
                }
            }
            if (keyPressed('down')) {
                if ((this.y < canvas.height - this.height)) {
                    this.y += this.dy;
                }
            }
        }
    }
}

class Enemy extends Gamepiece{
    constructor(spriteKey, sprite, health = 2) {
        super(spriteKey, sprite);
        this.health = health;

    }
}

class Item extends Gamepiece {
    constructor(spriteKey, sprite) {
        super(spriteKey, sprite);
    }
}
class Movable extends Gamepiece {
    constructor(spriteKey, sprite) {
        super(spriteKey, sprite);
    }
}

class Wall extends Gamepiece {
    constructor(spriteKey, x, y, width, height, sprite = Sprite({}),color='white') {
        super(spriteKey, sprite);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = width;
        this.sprite.height = height;
        this.sprite.color = color;
    }
}


// // "hero" sprite
// let hero = Sprite({
//     x: 500,        // starting x,y position of the sprite
//     y: 500,
//     color: 'red',  // fill color of the sprite rectangle
//     width: 20,     // width and height of the sprite rectangle
//     height: 20,
//     dx: 10,
//     dy: 10,       // move the sprite 2px to the right every frame
//     update: function () {
//         let touchedWallOn = wallCollision(this,wallArray);
//         if (keyPressed('left')) {
//             if (this.x > 0 && !touchedWallOn.right) {
//                 this.x -= this.dx;
//             }
//         }
//         if (keyPressed('right')) {
//             if ((this.x < canvas.width - this.width) && !touchedWallOn.left) {
//                 this.x += this.dx;
//             }
//         }
//         if (keyPressed('up')) {
//             if (this.y > 0 && !touchedWallOn.bottom) {
//                 this.y -= this.dy;
//             }
//         }
//         if (keyPressed('down')) {
//             if ((this.y < canvas.height - this.height) && !touchedWallOn.top) {
//                 this.y += this.dy;
//             }
//         }
//     }
// });

// //tool to get exact boundaries of a rect sprite
// let getSpriteBoundaries = function(s) {
//     return {
//         top: s.y - s.height * s.anchor.y,
//         left: s.x - s.width * s.anchor.x,
//         bottom: (s.y - s.height * s.anchor.y) + s.height * (1-s.anchor.y),
//         right: (s.x - s.width * s.anchor.x) + s.width * (1-s.anchor.x)
//     };
// };

// returns object on the direction a w sprite was touched by s
// let touchWall = function(s,w) {
//     let wb = getSpriteBoundaries(w);
//     let sb = getSpriteBoundaries(s);
//     return {
//         top: (selfBounds.bottom === otherBounds.top && selfBounds.left < otherBounds.right && selfBounds.right > otherBounds.left),
//         bottom: (selfBounds.top === otherBounds.bottom && selfBounds.left < otherBounds.right && selfBounds.right > otherBounds.left),
//         left: (selfBounds.right === otherBounds.left && selfBounds.top < otherBounds.bottom && selfBounds.bottom > otherBounds.top),
//         right: (selfBounds.left === otherBounds.right && selfBounds.top < otherBounds.bottom && selfBounds.bottom > otherBounds.top),
//     };
// };

// checks collision of all walls in wallArray
// let wallCollision = function (sprite,wArray) {
//     var collided = {
//         right: false,
//         left: false,
//         top: false,
//         bottom: false
//     };
//     wArray.forEach(function (wall, index) {
//         touchedWallOn = touchWall(sprite, wall);
//         for (let dirKey in touchedWallOn) {
//             if (collided[dirKey] === false && touchedWallOn[dirKey] === true) {
//                 collided[dirKey] = true
//             }
//         };
//     });
//     return collided;
// };

// // wrapper for creating a wall sprite
// let getWallSprite = function(x,y,width,height,color='white') {
//     return Sprite({
//         x: x,        
//         y: y,
//         color: color,  
//         width: width,     
//         height: height,
//     });
// };

// // testing/implementing walls
// let wallThickness = 10;
// let wallArray = [
//     //walls of canvas
//     getWallSprite(0, 0, canvas.width, wallThickness),
//     getWallSprite(0, 0, wallThickness, canvas.height),
//     getWallSprite(0, canvas.height-wallThickness, canvas.width, wallThickness),
//     getWallSprite(canvas.width - wallThickness, 0, wallThickness, canvas.height),

//     //status boundary
//     getWallSprite(0, 100, canvas.width, wallThickness),

//     //tower area
//     getWallSprite(100, 100, wallThickness, canvas.height-100),

//     //test walls
//     getWallSprite(200, 350, 300, wallThickness),
//     getWallSprite(350, 200, wallThickness, 300),

// ];

