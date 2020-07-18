const Piece = require("./piece");

const CONSTANTS = {
    BG_COLOR: '#9FB4C7',
    DIM_X: 500,
    DIM_Y: 650
}

class Game {
    constructor (ctx, sideCtx) {
        this.game = this;
        this.ctx = ctx;
        this.sideCtx = sideCtx;
        this.score = 0;
        this.height = CONSTANTS.DIM_Y;
        this.piece = new Piece(this.ctx, this.game, this.level());
        this.nextPiece = new Piece(this.ctx, this.game, this.level());

        this.allBlocks = [];
    }

    draw() {
        this.ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);
        this.ctx.fillStyle = CONSTANTS.BG_COLOR;
        this.ctx.fillRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);

        this.allBlocks.forEach(block => block.draw());
    }


    display() {
        this.sideCtx.fillStyle = CONSTANTS.BG_COLOR;
        this.sideCtx.fillRect(0, 0, 300, 300);

        this.nextPiece.display(this.sideCtx);
    }

    animate() {
        this.draw();
        this.updateScore();
        this.piece.animate();

        if (!this.piece.landed) {
            requestAnimationFrame(this.animate.bind(this))
        } else {

            this.piece.blocks.forEach(block => {
                this.allBlocks.push(block);
            });

            this.completeLines();

            if (this.gameOver()) {
                this.ctx.font = "30px Arial";
                this.ctx.fillStyle = "Black";
                this.ctx.fillText(`Game Over! Final Score: ${this.score}`, 10, 320);
            } else {
                this.piece = this.nextPiece;
                this.nextPiece = new Piece(this.ctx, this.game, this.level());
                this.play();
            }
        }
    }

    play() {
        this.display();
        this.piece.move();
        this.reset();
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

        //add level multiplier
        switch(lines) {
            case 1:
                this.score += 40;
                break;
            case 2: 
                this.score += 100;
                break;
            case 3:
                this.score += 300;
                break;
            case 4:
                this.score += 1200;
                break;
        }
    }

    gameOver () {
        return this.allBlocks.some(block => block.y < 0);
    }

    updateScore() {
        const score = document.getElementById('score');

        score.innerHTML = this.score;
    }

    level() {
        const level = parseInt(this.score.toString().slice(0, -2));

        return level ? level + 1 : 1;
    }

    reset() {
        key("r", () => {
            this.score = 0;
            this.allBlocks = [];
            this.piece = new Piece(this.ctx, this.game, this.level());
            this.nextPiece = new Piece(this.ctx, this.game, this.level());
        });
    }

}

module.exports = Game;