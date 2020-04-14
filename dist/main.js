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

eval("\n\nconst CONSTANTS = {\n    DROP_SPEED: 5,\n    WIDTH: 50,\n    HEIGHT: 50,\n}\n\nclass Block {\n    constructor(ctx, game, options) {\n        this.ctx = ctx;\n        this.game = game;\n        this.x = options.x;\n        this.y = options.y;\n        this.width = CONSTANTS.WIDTH;\n        this.color = options.color;\n    }\n\n    draw() {\n        this.ctx.fillStyle = this.color;\n        this.ctx.fillRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);\n        this.ctx.strokeRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);\n    }\n\n\n    fall() {\n        this.y += CONSTANTS.DROP_SPEED;\n    }\n\n    animate() {\n        this.draw();\n        this.fall();\n    }\n\n    canFall() {\n        let fallable = true;\n\n        if (this.y > 600) {\n            fallable = false;\n        };\n\n        this.game.allBlocks.forEach(block => {\n            if (block.x === this.x && block.y === this.y + CONSTANTS.HEIGHT) {\n                fallable = false;\n            }\n        });\n\n        return fallable;\n    }\n\n\n    canMoveLeft() {\n        if (this.x > 1) return true;\n        return false;\n    }\n\n    canMoveRight() {\n        if (this.x < CONSTANTS.WIDTH * 9) return true;\n        return false;\n    }\n\n    drop() {\n        this.y += CONSTANTS.HEIGHT;\n    }\n\n}\n\nmodule.exports = Block;\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./src/block.js\");\nconst Piece = __webpack_require__(/*! ./piece */ \"./src/piece.js\");\n\nconst CONSTANTS = {\n    BG_COLOR: 'pink',\n    DIM_X: 500,\n    DIM_Y: 650\n}\n\nclass Game {\n    constructor (ctx) {\n        this.game = this;\n        this.ctx = ctx;\n        this.height = CONSTANTS.DIM_Y;\n        this.piece = new Piece(this.ctx, this.game);\n\n        this.allBlocks = [];\n    }\n\n    draw() {\n        this.ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n        this.ctx.fillStyle = CONSTANTS.BG_COLOR;\n        this.ctx.fillRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n\n        this.allBlocks.forEach(block => block.draw());\n    }\n\n    animate() {\n        this.draw();\n        this.piece.animate();\n\n        if (!this.piece.landed) {\n            requestAnimationFrame(this.animate.bind(this))\n        } else {\n            \n            this.piece.blocks.forEach(block => {\n                this.allBlocks.push(block);\n            });\n\n            this.completeLines();\n            this.piece = new Piece(this.ctx, this.game);\n            this.play();\n        }\n    }\n\n    play() {\n        this.piece.move();\n        this.animate();\n    }\n\n    completeLines() {\n        const lineHash = {};\n        let lines = 0;\n        \n        this.allBlocks.forEach(block => {\n            if (!lineHash[block.y]) {\n                lineHash[block.y] = 1;\n            } else {\n                lineHash[block.y] += 1;\n            };\n        })\n        \n        Object.keys(lineHash).forEach(row => {\n            if (lineHash[row] === 10) {\n                this.allBlocks = this.allBlocks.filter(block => {\n                    return block.y.toString() !== row;\n                });\n\n                lines += 1;\n\n                this.allBlocks.forEach(block => {\n                    if (block.y < parseInt(row)) {\n                        block.drop();\n                    }\n                })\n            }\n        })\n    }\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Block = __webpack_require__(/*! ./block */ \"./src/block.js\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    const canvas = document.getElementById('my-canvas');\n    canvas.width = 500;\n    canvas.height = 650;\n\n    const ctx = canvas.getContext('2d');\n\n    const g = new Game(ctx);\n    g.play();\n\n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./src/block.js\");\n\nconst PIECES = [\n    //square\n    [\n        {y: -100, x: 200, color: 'red'},\n        {y: -100, x: 250, color: 'red' },\n        {y: -50, x: 200, color: 'red'},\n        {y: -50, x: 250, color: 'red' },\n    ],\n    //L\n    [\n        {y: -150, x: 200, color: 'blue'},\n        {y: -100, x: 200, color: 'blue'},\n        {y: -50, x: 200, color: 'blue'},\n        {y: -50, x: 250, color: 'blue'},\n    ],\n    //L rev\n    [\n        {y: -150, x: 250, color: 'orange'},\n        {y: -100, x: 250, color: 'orange'},\n        {y: -50, x: 200, color: 'orange'},\n        {y: -50, x: 250, color: 'orange'},\n    ],\n    //W\n    [\n        {y: -100, x: 250, color: 'brown'},\n        {y: -50, x: 200, color: 'brown'},\n        {y: -50, x: 250, color: 'brown'},\n        {y: -50, x: 300, color: 'brown'},\n    ],\n    //|\n    [\n        {y: -200, x: 200, color: 'green'},\n        {y: -150, x: 200, color: 'green'},\n        {y: -100, x: 200, color: 'green'},\n        {y: -50, x: 200, color: 'green'},\n    ]\n]\n\nclass Piece {\n    constructor(ctx, game) {\n        this.ctx = ctx;\n        this.game = game;\n        this.blocks = [];\n        this.landed = false;\n\n        this.randPiece();\n    }\n\n    randPiece() {\n\n        let i = Math.floor((Math.random() * PIECES.length));\n\n        PIECES[i].forEach(params => {\n            this.blocks.push(new Block(this.ctx, this.game, params));\n        })\n    }\n\n    animate() {\n        if (this.blocks.every(block => block.canFall())) {\n            this.blocks.forEach(block => block.animate());\n        } else {\n            this.landed = true;\n        }\n    }\n\n    move() {\n        key(\"a\", () => { \n            if (this.blocks.every(block => block.canMoveLeft() && (!this.landed))) {\n                this.blocks.forEach(block => block.x -= block.width);\n            }\n        });\n        key(\"d\", () => { \n            if (this.blocks.every(block => block.canMoveRight() && (!this.landed))) {\n                this.blocks.forEach(block => block.x += block.width); \n            }\n        });\n    }\n}\n\nmodule.exports = Piece;\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ })

/******/ });