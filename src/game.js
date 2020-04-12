const Block = require("./block");

const CONSTANTS = {
    BG_COLOR: 'pink',
    DIM_X: 500,
    DIM_Y: 650
}

class Game {
    constructor (ctx) {
        this.game = this;
        this.ctx = ctx;
        this.height = CONSTANTS.DIM_Y;
        this.block = new Block(this.ctx, this.game);
        this.allBlocks = [];
    }

    draw() {
        this.ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
        this.ctx.fillStyle = CONSTANTS.BG_COLOR;
        this.ctx.fillRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);

        this.allBlocks.forEach(block => block.draw());
    }

    animate() {
        this.draw();
        this.block.animate();

        if (!this.block.landed) {
            requestAnimationFrame(this.animate.bind(this))
        } else {
            this.nextBlock();
            this.play();
        }
    }

    play() {
        this.block.move();
        this.animate();
    }

    nextBlock() {
        this.allBlocks.push(this.block);
        console.log(this.allBlocks)
        this.block = new Block(this.ctx, this.game);
    }

}

module.exports = Game;