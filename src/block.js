

const CONSTANTS = {
    DROP_SPEED: 2,
    WIDTH: 50,
    HEIGHT: 50,
}

class Block {
    constructor(height) {
        this.height = height;
        this.x = 0;
        this.y = 0;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
    }

    fall() {
        this.y += CONSTANTS.DROP_SPEED;
    }

    animate(ctx) {
        this.draw(ctx);
        if (this.canFall()) {
            this.fall();
        };
    }

    canFall() {
        if (this.y < 500) {
            return true;
        };
        return false;
    }

    move() {
        key("a", () => { this.x -= CONSTANTS.WIDTH });
        key("d", () => { this.x += CONSTANTS.WIDTH });
    }
}

module.exports = Block;