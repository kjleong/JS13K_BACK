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

    updateAllButHero() {
        for (let key in this.pieces) {
            if (!(this.pieces[key] instanceof Hero)){
                this.pieces[key].sprite.update();
            }
        }
    }

    updateAll() {
        for (let key in this.pieces) {
            this.pieces[key].sprite.update();
        }
    }

    renderAll() {
        for (let key in this.pieces) {
            if (this.pieces[key].renderMe) {
                this.pieces[key].sprite.render();
            }
        }
    }

    getByType(gpType) {
        let somePieces = {};
        for (let key in this.pieces) {
            let gp = this.pieces[key]
            if (gp.type === gpType) {
                somePieces[key] = gp
            }
        }
        return somePieces;
    }

    purgePieces() {
        for (let key in this.pieces) {
            if (this.pieces[key].destroyMe) {
                delete this.pieces[key];
            }
        }
    }

}

class Gamepiece {
    constructor(spriteKey, type, sprite) {
        this.sprite = sprite;
        this.spriteKey = spriteKey;
        this.type = type;
        this.destroyMe = false;
        this.renderMe = true;
        this.health = 0;
        this.sprite.dLeft = 0;
        this.sprite.dRight = 0;
        this.sprite.dUp = 0;
        this.sprite.dDown = 0;
        this.sprite.stopMove = {
            left: false,
            right: false,
            down: false,
            up: false,
        };
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
            up: (selfBounds.bottom === otherBounds.top && selfBounds.left < otherBounds.right && selfBounds.right > otherBounds.left),
            down: (selfBounds.top === otherBounds.bottom && selfBounds.left < otherBounds.right && selfBounds.right > otherBounds.left),
            left: (selfBounds.right === otherBounds.left && selfBounds.top < otherBounds.bottom && selfBounds.bottom > otherBounds.top),
            right: (selfBounds.left === otherBounds.right && selfBounds.top < otherBounds.bottom && selfBounds.bottom > otherBounds.top),
        };
    }

    touchedOn (gpArray) {
        let gpsTouchedOn = {
            right: false,
            left: false,
            up: false,
            down: false
        };
        for (let key in gpArray) {
            let gp = gpArray[key]
            let gpContectdOnWith = gp.contactedOnWith(this);
            for (let dirKey in gpContectdOnWith) {
                if (gpsTouchedOn[dirKey] === false && gpContectdOnWith[dirKey] === true) {
                    gpsTouchedOn[dirKey] = true
                }
            };
        };
        
        return gpsTouchedOn;
    };

    setStopMove(stopObj){
        for (let key in stopObj) {
            this.sprite.stopMove[key] = stopObj[key]
        }
    }

    kill() {
        this.destroyMe = true;
    }

    addToPieces(ap) {
        ap.addPiece(this)
    }
};

class Hero extends Gamepiece {
    constructor(spriteKey, sprite, health=10) {
        super(spriteKey,'hero', sprite);
        this.health = health;
        this.itemCount = 0;
        this.invulnerable = false;
        this.invulnerableCounter = 0.0;
        this.sprite.dLeft = -5;
        this.sprite.dRight = 5;
        this.sprite.dUp = -5;
        this.sprite.dDown = 5;
        this.sprite.update = this.spriteUpdate;
        this.sprite.direction = 'up'; // new for direction melee
        this.sprite.attack = false; // new for melee attack
    }

    spriteUpdate() {
        if (keyPressed('left') && !this.stopMove.left) {
            if (this.x > 0) {
                this.x += this.dLeft;
                this.direction = 'left';
                emit('melee', pieces);
            }
        }
        if (keyPressed('right') && !this.stopMove.right) {
            if ((this.x < canvas.width - this.width)) {
                this.x += this.dRight;
                this.direction = 'right';
                emit('melee', pieces);
            }
        }
        if (keyPressed('up') && !this.stopMove.up) {
            if (this.y > 0) {
                this.y += this.dUp;
                this.direction = 'up';
                emit('melee', pieces);
            }
        }
        if (keyPressed('down') && !this.stopMove.down) {
            if ((this.y < canvas.height - this.height)) {
                this.y += this.dDown;
                this.direction = 'down';
                emit('melee', pieces);
            }
        }
        // Create hero killing space / sword slash range
        if (keyPressed('a')|| keyPressed('space')) {
            this.attack = !this.attack;
            emit('melee', pieces);
        }
    }

    blinkEffect(modVal) {
        if (this.invulnerable) {
            if (this.invulnerableCounter > 2.0) {
                this.invulnerable = false
                this.invulnerableCounter = 0.0;
                this.renderMe = true;
            } else {
                this.invulnerableCounter += 1.0 / 60;
                if ((this.invulnerableCounter * 60) % modVal < modVal/2) {
                    this.renderMe = false;
                } else {
                    this.renderMe = true;
                }
            }
        }
    }
    getStats(keyList) {
        let out = {};
        for (let key of keyList) {
            if (key in this) {
                out[key] = this[key];
            }
        }
        return out;
    }
}

class FastGP extends Gamepiece {
    constructor(spriteKey, type, x, y, width, height, color, sprite = Sprite({})) {
        super(spriteKey, type, sprite);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = width;
        this.sprite.height = height;
        this.sprite.color = color;
    }
}

class Sword extends Gamepiece {
    constructor(spriteKey, type, x, y, sprite = Sprite({})) {
        super(spriteKey, type, sprite);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = 20;
        this.sprite.height = 20;
        this.sprite.color = 'white';
        this.renderTime = 0.5;
    }

    updateSword(){ // sword "animation time"
        if(this.renderMe && this.renderTime <= 0) {
            this.renderMe = false;
            this.renderTime = 0.5;
        }
        if(this.renderMe && this.renderTime > 0) {
            this.renderTime = this.renderTime - 1/60;
        }
    }

    updatePosition({x, y, width, height, direction}) { // moves the sword towards direction hero is facing
        switch(direction) {
            case 'up':
                this.sprite.x = x;
                this.sprite.y = y - height;
                break;
            case 'down':
                this.sprite.x = x;
                this.sprite.y = y + height;
                break;
            case 'right':
                this.sprite.x = x + width;
                this.sprite.y = y ;
                break;
            case 'left':
                this.sprite.x = x - width;
                this.sprite.y = y ;
                break;
            default:
                break;
        }
    }
}

class Enemy extends Gamepiece {
    constructor(spriteKey, type, x, y, width, height, color, moveType, range = 100, delta = 1, sprite = Sprite({})) {
        super(spriteKey, type, sprite);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = width;
        this.sprite.height = height;
        this.sprite.color = color;
        this.sprite.movement = moveType;
        this.sprite.positiveDirection = true;
        this.sprite.delta = delta;
        this.sprite.minHor = x - range;
        this.sprite.maxHor = x + range;
        this.sprite.minVer = y - range;
        this.sprite.maxVer = y + range;
        this.sprite.update = this.updateMovementTo(moveType);
    }

    updateMovementTo(type) {
        switch(type) {
            case 'horizontal': {
                return this.horizontalMovement;
            }
            case 'vertical': {
                return this.verticalMovement;
            }
        }
    }

    horizontalMovement() { // moves back and forth based on vertical or horizontal or stands still
        if (this.x >= this.maxHor || this.x <= this.minHor || 
            (this.stopMove.left ||  this.stopMove.right)) {
            this.positiveDirection = !this.positiveDirection;
        }
        if (this.positiveDirection) {
            this.x += this.delta;
        }
        if (!this.positiveDirection) {
            this.x -= this.delta;
        }
    }

    verticalMovement() { // moves back and forth based on vertical or horizontal or stands still
        if (this.y >= this.maxVer || this.y <= this.minVer || 
            (this.stopMove.down ||  this.stopMove.up)
            ) {
            this.positiveDirection = !this.positiveDirection;
        }
        if (this.positiveDirection) {
            this.y += this.delta;
        }
        if (!this.positiveDirection) {
            this.y -= this.delta;
        }
    }
}