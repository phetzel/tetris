const Block = require("./block");
// const Piece = require("./piece");

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
            this.allBlocks.push(this.block);
            this.completeLines();
            this.block = new Block(this.ctx, this.game);
            this.play();
        }
    }

    play() {
        this.block.move();
        this.animate();
    }

    completeLines() {
        const lineHash = {};
        let lines = 0;
        
        this.allBlocks.forEach(block => {
            if (!lineHash[block.y]) {
                lineHash[block.y] = 1;
            } else {
                lineHash[block.y] += 1;
            };
        })
        
        Object.keys(lineHash).forEach(row => {
            if (lineHash[row] === 10) {
                this.allBlocks = this.allBlocks.filter(block => {
                    return block.y.toString() !== row;
                });

                lines += 1;

                this.allBlocks.forEach(block => {
                    if (block.y < parseInt(row)) {
                        block.drop();
                    }
                })
            }
        })
    }

}

module.exports = Game;