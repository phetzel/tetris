const Block = require("./block");

const PIECES = [
    //square
    [
        { y: -100, x: 200, color: '#7F7CAF'},
        { y: -100, x: 250, color: '#7F7CAF' },
        { y: -50, x: 200, color: '#7F7CAF'},
        { y: -50, x: 250, color: '#7F7CAF' },
    ],

    //L
    [
        {y: -50, x: 200, color: '#28587B'},
        {y: -150, x: 200, color: '#28587B'},
        {y: -100, x: 200, color: '#28587B'},
        {y: -50, x: 250, color: '#28587B'},
    ],

    //L rev
    [
        { y: -50, x: 250, color: '#9FB798' },
        { y: -150, x: 250, color: '#9FB798'},
        { y: -100, x: 250, color: '#9FB798'},
        { y: -50, x: 200, color: '#9FB798'},
    ],

    //W
    [
        { y: -50, x: 250, color: '#8D3B72'},
        { y: -100, x: 250, color: '#8D3B72'},
        { y: -50, x: 200, color: '#8D3B72'},
        { y: -50, x: 300, color: '#8D3B72'},
    ],

    //|
    [
        { y: -150, x: 200, color: '#4B3F72'},
        { y: -200, x: 200, color: '#4B3F72'},
        { y: -100, x: 200, color: '#4B3F72'},
        { y: -50, x: 200, color: '#4B3F72'},
    ],

    //z
    [
        { y: -50, x: 250, color: '#B9929F'},
        { y: -100, x: 200, color: '#B9929F'},
        { y: -100, x: 250, color: '#B9929F'},
        { y: -50, x: 300, color: '#B9929F'},
    ],


    //z rev
    [
        { y: -50, x: 250, color: '#4381C1' },
        { y: -100, x: 250, color: '#4381C1' },
        { y: -100, x: 300, color: '#4381C1' },
        { y: -50, x: 200, color: '#4381C1' },
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

    display(ctx) {
        this.blocks.forEach(block => block.display(ctx));
    }



}

module.exports = Piece;