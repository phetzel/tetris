/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nconst CONSTANTS = {\n    DROP_SPEED: 2,\n    WIDTH: 50,\n    HEIGHT: 50,\n}\n\nclass Block {\n    constructor(ctx, game, piece, options, level) {\n        this.ctx = ctx;\n        this.game = game;\n        this.piece = piece;\n        this.x = options.x;\n        this.y = options.y;\n        this.width = CONSTANTS.WIDTH;\n        this.color = options.color;\n        this.level = level;\n    }\n\n    draw() {\n        this.ctx.fillStyle = this.color;\n        this.ctx.fillRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);\n        this.ctx.strokeRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);\n    }\n\n    display(sideCtx) {\n        sideCtx.fillStyle = this.color;\n        sideCtx.fillRect(this.x - 125, this.y + 200, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);\n        sideCtx.strokeRect(this.x - 125, this.y + 200, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);\n    }\n\n    fall() {\n        this.y += CONSTANTS.DROP_SPEED;\n    }\n\n    animate() {\n        this.draw();\n        this.fall();\n    }\n\n    canFall() {\n        let fallable = true;\n\n        if (this.y > 600) {\n            fallable = false;\n        };\n\n        this.game.allBlocks.forEach(block => {\n            if (block.x === this.x && block.y === this.y + CONSTANTS.HEIGHT) {\n                fallable = false;\n            }\n        });\n\n        return fallable;\n    }\n\n\n    canMoveLeft() {\n        let moveable = true;\n\n        if (this.x < CONSTANTS.WIDTH) {\n            moveable = false;\n        };\n        \n        this.game.allBlocks.forEach(block => {\n            if (\n                block.x === (this.x - CONSTANTS.WIDTH) &&\n                block.y < (this.y + CONSTANTS.HEIGHT)\n                ) {\n                    moveable = false;\n                }\n        })\n\n        return moveable;\n    }\n\n    canMoveRight() {\n        let moveable = true;\n\n        if (this.x >= CONSTANTS.WIDTH * 9) {\n            moveable = false;\n        }\n        \n        this.game.allBlocks.forEach(block => {\n            if (\n                block.x === (this.x + CONSTANTS.WIDTH) &&\n                block.y < (this.y + CONSTANTS.HEIGHT)\n            ) {\n                moveable = false;\n            }\n        })\n\n        return moveable;\n    }\n\n\n    drop() {\n        this.y += CONSTANTS.HEIGHT * this.level;\n    }\n\n    canRotate(dir) {\n        let rotatable = true;\n        const rotated = this.rotatePos(dir, true);\n\n\n\n        if (rotated[0] < 0 || rotated[0] > CONSTANTS.WIDTH * 10\n            || rotated[1] > 600) {\n            rotatable = false;\n        }\n        \n        this.game.allBlocks.forEach(block => {\n            if (block.x === rotated[0] && block.y < (rotated.y + CONSTANTS.HEIGHT)) {\n                rotatable = false;\n            }\n        })\n\n        return rotatable;\n    }\n\n    rotatePos(dir, check) {\n        let ro;\n        (dir === \"count\") ? ro = [[0, -1], [1, 0]] : ro = [[0, 1], [-1, 0]];\n\n        const pivot = [this.piece.blocks[0].x, this.piece.blocks[0].y];\n\n        const relVec = [this.x - pivot[0], this.y - pivot[1]];\n        const transVec = [\n            ro[0][0] * relVec[0] + ro[0][1] *relVec[1],\n            ro[1][0] * relVec[0] + ro[1][1] * relVec[1]\n        ];\n\n        if(check === true) {\n            let rotatedPos = [pivot[0] + transVec[0], pivot[1] + transVec[1]];\n            return rotatedPos;\n        } else {\n            this.x = pivot[0] + transVec[0];\n            this.y = pivot[1] + transVec[1];\n        }\n    }\n\n}\n\nmodule.exports = Block;\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Piece = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n\nconst CONSTANTS = {\n    BG_COLOR: '#9FB4C7',\n    DIM_X: 500,\n    DIM_Y: 650\n}\n\nclass Game {\n    constructor (ctx, sideCtx) {\n        this.game = this;\n        this.ctx = ctx;\n        this.sideCtx = sideCtx;\n        this.score = 0;\n        this.height = CONSTANTS.DIM_Y;\n        this.piece = new Piece(this.ctx, this.game, this.level());\n        this.nextPiece = new Piece(this.ctx, this.game, this.level());\n\n        this.allBlocks = [];\n    }\n\n    draw() {\n        this.ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n        this.ctx.fillStyle = CONSTANTS.BG_COLOR;\n        this.ctx.fillRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n\n        this.allBlocks.forEach(block => block.draw());\n    }\n\n\n    display() {\n        this.sideCtx.fillStyle = CONSTANTS.BG_COLOR;\n        this.sideCtx.fillRect(0, 0, 300, 300);\n\n        this.nextPiece.display(this.sideCtx);\n    }\n\n    animate() {\n        this.draw();\n        this.updateScore();\n        this.piece.animate();\n\n        if (!this.piece.landed) {\n            requestAnimationFrame(this.animate.bind(this))\n        } else {\n\n            this.piece.blocks.forEach(block => {\n                this.allBlocks.push(block);\n            });\n\n            this.completeLines();\n\n            if (this.gameOver()) {\n                this.ctx.font = \"30px Arial\";\n                this.ctx.fillStyle = \"Black\";\n                this.ctx.fillText(`Game Over! Final Score: ${this.score}`, 10, 320);\n            } else {\n                this.piece = this.nextPiece;\n                this.nextPiece = new Piece(this.ctx, this.game, this.level());\n                this.play();\n            }\n        }\n    }\n\n    play() {\n        this.display();\n        this.piece.move();\n        this.reset();\n        this.animate();\n    }\n\n    completeLines() {\n        const lineHash = {};\n        let lines = 0;\n        \n        this.allBlocks.forEach(block => {\n            if (!lineHash[block.y]) {\n                lineHash[block.y] = 1;\n            } else {\n                lineHash[block.y] += 1;\n            };\n        })\n        \n        Object.keys(lineHash).forEach(row => {\n            if (lineHash[row] === 10) {\n                this.allBlocks = this.allBlocks.filter(block => {\n                    return block.y.toString() !== row;\n                });\n\n                lines += 1;\n\n                this.allBlocks.forEach(block => {\n                    if (block.y < parseInt(row)) {\n                        block.drop();\n                    }\n                })\n            }\n        })\n\n        //add level multiplier\n        switch(lines) {\n            case 1:\n                this.score += 40;\n                break;\n            case 2: \n                this.score += 100;\n                break;\n            case 3:\n                this.score += 300;\n                break;\n            case 4:\n                this.score += 1200;\n                break;\n        }\n    }\n\n    gameOver () {\n        return this.allBlocks.some(block => block.y < 0);\n    }\n\n    updateScore() {\n        const score = document.getElementById('score');\n\n        score.innerHTML = this.score;\n    }\n\n    level() {\n        const level = parseInt(this.score.toString().slice(0, -2));\n\n        return level ? level + 1 : 1;\n    }\n\n    reset() {\n        key(\"r\", () => {\n            this.score = 0;\n            this.allBlocks = [];\n            this.piece = new Piece(this.ctx, this.game, this.level());\n            this.nextPiece = new Piece(this.ctx, this.game, this.level());\n            this.display();\n        });\n    }\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Piece = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    const canvas = document.getElementById('my-canvas');\n    canvas.width = 500;\n    canvas.height = 650;\n    const ctx = canvas.getContext('2d');\n\n    const side = document.getElementById('side-canvas');\n    side.width = 300;\n    side.height = 300;\n    const sideCtx = side.getContext('2d');\n\n    const g = new Game(ctx, sideCtx);\n\n    g.play();\n    \n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./src/block.js\");\n\nconst PIECES = [\n    //square\n    [\n        { y: -100, x: 200, color: '#7F7CAF'},\n        { y: -100, x: 250, color: '#7F7CAF' },\n        { y: -50, x: 200, color: '#7F7CAF'},\n        { y: -50, x: 250, color: '#7F7CAF' },\n    ],\n\n    //L\n    [\n        {y: -50, x: 200, color: '#28587B'},\n        {y: -150, x: 200, color: '#28587B'},\n        {y: -100, x: 200, color: '#28587B'},\n        {y: -50, x: 250, color: '#28587B'},\n    ],\n\n    //L rev\n    [\n        { y: -50, x: 250, color: '#9FB798' },\n        { y: -150, x: 250, color: '#9FB798'},\n        { y: -100, x: 250, color: '#9FB798'},\n        { y: -50, x: 200, color: '#9FB798'},\n    ],\n\n    //W\n    [\n        { y: -50, x: 250, color: '#8D3B72'},\n        { y: -100, x: 250, color: '#8D3B72'},\n        { y: -50, x: 200, color: '#8D3B72'},\n        { y: -50, x: 300, color: '#8D3B72'},\n    ],\n\n    //|\n    [\n        { y: -150, x: 200, color: '#4B3F72'},\n        { y: -200, x: 200, color: '#4B3F72'},\n        { y: -100, x: 200, color: '#4B3F72'},\n        { y: -50, x: 200, color: '#4B3F72'},\n    ],\n\n    //z\n    [\n        { y: -50, x: 250, color: '#B9929F'},\n        { y: -100, x: 200, color: '#B9929F'},\n        { y: -100, x: 250, color: '#B9929F'},\n        { y: -50, x: 300, color: '#B9929F'},\n    ],\n\n\n    //z rev\n    [\n        { y: -50, x: 250, color: '#4381C1' },\n        { y: -100, x: 250, color: '#4381C1' },\n        { y: -100, x: 300, color: '#4381C1' },\n        { y: -50, x: 200, color: '#4381C1' },\n    ]\n\n]\n\nclass Piece {\n    constructor(ctx, game, level) {\n        this.ctx = ctx;\n        this.game = game;\n        this.blocks = [];\n        this.landed = false;\n        this.level = level;\n\n        this.randPiece();\n    }\n\n    randPiece() {\n        let i = Math.floor((Math.random() * PIECES.length));\n\n        PIECES[i].forEach(params => {\n            this.blocks.push(new Block(this.ctx, this.game, this, params, this.level));\n        })\n    }\n\n    animate() {\n        if (this.blocks.every(block => block.canFall())) {\n            this.blocks.forEach(block => block.animate());\n        } else {\n            this.landed = true;\n        }\n    }\n\n    move() {\n        key(\"a\", () => { \n            if (this.blocks.every(block => block.canMoveLeft() && (!this.landed))) {\n                this.blocks.forEach(block => block.x -= block.width);\n            }\n        });\n        key(\"d\", () => { \n            if (this.blocks.every(block => block.canMoveRight() && (!this.landed))) {\n                this.blocks.forEach(block => block.x += block.width); \n            }\n        });\n        key(\"q\", () => {\n            if (this.blocks.every(block => block.canRotate('counter')\n                && (!this.landed))) {\n                    this.blocks.forEach(block => {\n\n                        block.rotatePos('counter');\n                    })\n            }\n        });\n        key(\"e\", () => {\n            if (this.blocks.every(block => block.canRotate('clock')\n                && (!this.landed))) {\n                    this.blocks.forEach(block => {\n\n                        block.rotatePos('clock');\n                    })\n            }\n        });\n    }\n\n    display(ctx) {\n        this.blocks.forEach(block => block.display(ctx));\n    }\n\n\n\n}\n\nmodule.exports = Piece;\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ })

/******/ });