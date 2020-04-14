const Block = require("./block");

const PIECES = {
    SQUARE: [
        {y: -100, x: 200, color: 'red'},
        {y: -100, x: 250, color: 'red' },
        {y: -50, x: 200, color: 'red'},
        {y: -50, x: 250, color: 'red' },
    ]
}

class Piece {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;
        this.blocks = [];

        this.randPiece();
        console.log(this.blocks);
    }

    randPiece() {
        const rand = PIECES[Math.floor((Math.random() * PIECES.length))];

        rand.forEach(block => {
            this.blocks.push(new Block(this.ctx, this.game, rand));
        })
    }
}

module.exports = Piece;