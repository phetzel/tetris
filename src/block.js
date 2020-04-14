

const CONSTANTS = {
    DROP_SPEED: 5,
    WIDTH: 50,
    HEIGHT: 50,
}

class Block {
    constructor(ctx, game, options) {
        this.ctx = ctx;
        this.game = game;
        this.x = 0;
        this.y = 0;
        // this.color = options.color
        this.color = 'green';
        

        this.landed = false;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
    }

    fall() {
        this.y += CONSTANTS.DROP_SPEED;
    }

    animate() {
        this.draw();
        if (this.canFall()) {
            this.fall();
        } else {
            this.landed = true;
        }
    }

    canFall() {
        let fallable = true;

        if (this.y > 600) {
            fallable = false;
        };

        this.game.allBlocks.forEach(block => {
            if (block.x === this.x && block.y === this.y + CONSTANTS.HEIGHT) {
                fallable = false;
            }
        });

        return fallable;
    }

    move() {
        key("a", () => { 
            if (this.canMoveLeft() && (!this.landed)) {
                this.x -= CONSTANTS.WIDTH;
            }
        });
        key("d", () => { 
            if (this.canMoveRight() && (!this.landed)) {
                this.x += CONSTANTS.WIDTH; 
            }
        });
    }

    canMoveLeft() {
        if (this.x > 1) return true;
        return false;
    }

    canMoveRight() {
        if (this.x < CONSTANTS.WIDTH * 9) return true;
        return false;
    }

    drop() {
        this.y += CONSTANTS.HEIGHT;
    }

}

module.exports = Block;