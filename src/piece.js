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
        {y: -50, x: 200, color: 'blue'},
        {y: -150, x: 200, color: 'blue'},
        {y: -100, x: 200, color: 'blue'},

        {y: -50, x: 250, color: 'blue'},
    ],

    //L rev
    [
        { y: -50, x: 250, color: 'orange' },
        {y: -150, x: 250, color: 'orange'},
        {y: -100, x: 250, color: 'orange'},
        {y: -50, x: 200, color: 'orange'},
    ],

    //W
    [
        {y: -50, x: 250, color: 'brown'},
        {y: -100, x: 250, color: 'brown'},
        {y: -50, x: 200, color: 'brown'},
        {y: -50, x: 300, color: 'brown'},
    ],

    //|
    [
        {y: -150, x: 200, color: 'green'},
        {y: -200, x: 200, color: 'green'},
        {y: -100, x: 200, color: 'green'},
        {y: -50, x: 200, color: 'green'},
    ],

    //z
    [
        {y: -50, x: 250, color: 'grey'},
        {y: -100, x: 200, color: 'grey'},
        {y: -100, x: 250, color: 'grey'},
        {y: -50, x: 300, color: 'grey'},
    ],


    //z rev
    [
        { y: -50, x: 250, color: 'yellow' },
        { y: -100, x: 250, color: 'yellow' },
        { y: -100, x: 300, color: 'yellow' },
        { y: -50, x: 200, color: 'yellow' },
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
            this.blocks.push(new Block(this.ctx, this.game, this, params));
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
        key("q", () => {
            if (this.blocks.every(block => block.canRotate('counter')
                && (!this.landed))) {
                    this.blocks.forEach(block => {

                        block.rotatePos('counter');
                    })
            }
        });
        key("e", () => {
            if (this.blocks.every(block => block.canRotate('clock')
                && (!this.landed))) {
                    this.blocks.forEach(block => {

                        block.rotatePos('clock');
                    })
            }
        });
    }




}

module.exports = Piece;