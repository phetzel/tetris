const Block = require("./block");

const CONSTANTS = {
    BG_COLOR: 'pink',
    DIM_X: window.innerWidth / 3,
    DIM_Y: window.innerHeight
}




class Game {
    constructor () {
        this.height = CONSTANTS.DIM_Y;
        this.block = new Block(this.height);
    }
    draw(ctx) {
        ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
        ctx.fillStyle = CONSTANTS.BG_COLOR;
        ctx.fillRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
    }

    animate(ctx) {
        this.block.move();
        setInterval(() => {
            this.draw(ctx);
            this.block.animate(ctx);
        }, 20);
    }

}

module.exports = Game;