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
        this.dLeft = 0;
        this.dRight = 0;
        this.dUp = 0;
        this.dDown = 0;
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
            top: (selfBounds.bottom === otherBounds.top && selfBounds.left < otherBounds.right && selfBounds.right > otherBounds.left),
            bottom: (selfBounds.top === otherBounds.bottom && selfBounds.left < otherBounds.right && selfBounds.right > otherBounds.left),
            left: (selfBounds.right === otherBounds.left && selfBounds.top < otherBounds.bottom && selfBounds.bottom > otherBounds.top),
            right: (selfBounds.left === otherBounds.right && selfBounds.top < otherBounds.bottom && selfBounds.bottom > otherBounds.top),
        };
    }

    touchedOn (gpArray) {
        let gpsTouchedOn = {
            right: false,
            left: false,
            top: false,
            bottom: false
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

    // kill() {
    //     this.destroyMe = true;
    // }

    addToPieces(ap) {
        ap.addPiece(this)
    }
};

class Hero extends Gamepiece {
    constructor(spriteKey, sprite, health=10) {
        super(spriteKey,'hero', sprite);
        this.health = health;
        this.dLeft = -10;
        this.dRight = 10;
        this.dUp = -10;
        this.dDown = 10;
        this.itemCount = 0;
        this.invulnerable = false;
        this.invulnerableCounter = 0.0;
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
    getStats() {
        return {
            health:this.health,
            itemCount:this.itemCount,
        };
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
