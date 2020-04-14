const Block = require("./block");

const PIECES = [
    //square
    [
        {y: -100, x: 200, color: 'red'},
        {y: -100, x: 250, color: 'red' },
        {y: -50, x: 200, color: 'red'},
        {y: -50, x: 250, color: 'red' },
    ],
    //L
    [
        {y: -150, x: 200, color: 'blue'},
        {y: -100, x: 200, color: 'blue'},
        {y: -50, x: 200, color: 'blue'},
        {y: -50, x: 250, color: 'blue'},
    ],
    //L rev
    [
        {y: -150, x: 250, color: 'orange'},
        {y: -100, x: 250, color: 'orange'},
        {y: -50, x: 200, color: 'orange'},
        {y: -50, x: 250, color: 'orange'},
    ],
    //W
    [
        {y: -100, x: 250, color: 'brown'},
        {y: -50, x: 200, color: 'brown'},
        {y: -50, x: 250, color: 'brown'},
        {y: -50, x: 300, color: 'brown'},
    ],
    //|
    [
        {y: -200, x: 200, color: 'green'},
        {y: -150, x: 200, color: 'green'},
        {y: -100, x: 200, color: 'green'},
        {y: -50, x: 200, color: 'green'},
    ]
]

class Piece {
    constructor(ctx, game) {
        this.ctx = ctx;
        this.game = game;
        this.blocks = [];
        this.landed = false;

        this.randPiece();
    }

    randPiece() {

        let i = Math.floor((Math.random() * PIECES.length));

        PIECES[i].forEach(params => {
            this.blocks.push(new Block(this.ctx, this.game, params));
        })
    }

    animate() {
        if (this.blocks.every(block => block.canFall())) {
            this.blocks.forEach(block => block.animate());
        } else {
            this.landed = true;
        }
    }

    move() {
        key("a", () => { 
            if (this.blocks.every(block => block.canMoveLeft() && (!this.landed))) {
                this.blocks.forEach(block => block.x -= block.width);
            }
        });
        key("d", () => { 
            if (this.blocks.every(block => block.canMoveRight() && (!this.landed))) {
                this.blocks.forEach(block => block.x += block.width); 
            }
        });
    }
}

module.exports = Piece;