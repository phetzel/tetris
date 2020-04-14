

const CONSTANTS = {
    DROP_SPEED: 5,
    WIDTH: 50,
    HEIGHT: 50,
}

class Block {
    constructor(ctx, game, options) {
        this.ctx = ctx;
        this.game = game;
        this.x = options.x;
        this.y = options.y;
        this.width = CONSTANTS.WIDTH;
        this.color = options.color;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
        this.ctx.strokeRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
    }


    fall() {
        this.y += CONSTANTS.DROP_SPEED;
    }

    animate() {
        this.draw();
        this.fall();
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