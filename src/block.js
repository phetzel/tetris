

const CONSTANTS = {
    DROP_SPEED: 2,
    WIDTH: 50,
    HEIGHT: 50,
}

class Block {
    constructor(ctx, game, piece, options, level) {
        this.ctx = ctx;
        this.game = game;
        this.piece = piece;
        this.x = options.x;
        this.y = options.y;
        this.width = CONSTANTS.WIDTH;
        this.color = options.color;
        this.level = level;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
        this.ctx.strokeRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
    }

    display(sideCtx) {
        sideCtx.fillStyle = this.color;
        sideCtx.fillRect(this.x - 125, this.y + 200, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
        sideCtx.strokeRect(this.x - 125, this.y + 200, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
    }

    fall() {
        this.y += CONSTANTS.DROP_SPEED * this.level;
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
        let moveable = true;

        if (this.x < CONSTANTS.WIDTH) {
            moveable = false;
        };
        
        this.game.allBlocks.forEach(block => {
            if (
                block.x === (this.x - CONSTANTS.WIDTH) &&
                block.y < (this.y + CONSTANTS.HEIGHT)
                ) {
                    moveable = false;
                }
        })

        return moveable;
    }

    canMoveRight() {
        let moveable = true;

        if (this.x >= CONSTANTS.WIDTH * 9) {
            moveable = false;
        }
        
        this.game.allBlocks.forEach(block => {
            if (
                block.x === (this.x + CONSTANTS.WIDTH) &&
                block.y < (this.y + CONSTANTS.HEIGHT)
            ) {
                moveable = false;
            }
        })

        return moveable;
    }


    drop() {
        this.y += CONSTANTS.HEIGHT * this.level;
    }

    canRotate(dir) {
        let rotatable = true;
        const rotated = this.rotatePos(dir, true);



        if (rotated[0] < 0 || rotated[0] > CONSTANTS.WIDTH * 10
            || rotated[1] > 600) {
            rotatable = false;
        }
        
        this.game.allBlocks.forEach(block => {
            if (block.x === rotated[0] && block.y < (rotated.y + CONSTANTS.HEIGHT)) {
                rotatable = false;
            }
        })

        return rotatable;
    }

    rotatePos(dir, check) {
        let ro;
        (dir === "count") ? ro = [[0, -1], [1, 0]] : ro = [[0, 1], [-1, 0]];

        const pivot = [this.piece.blocks[0].x, this.piece.blocks[0].y];

        const relVec = [this.x - pivot[0], this.y - pivot[1]];
        const transVec = [
            ro[0][0] * relVec[0] + ro[0][1] *relVec[1],
            ro[1][0] * relVec[0] + ro[1][1] * relVec[1]
        ];

        if(check === true) {
            let rotatedPos = [pivot[0] + transVec[0], pivot[1] + transVec[1]];
            return rotatedPos;
        } else {
            this.x = pivot[0] + transVec[0];
            this.y = pivot[1] + transVec[1];
        }
    }

}

module.exports = Block;