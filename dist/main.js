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

eval("\n\nconst CONSTANTS = {\n    DROP_SPEED: 2,\n    WIDTH: 50,\n    HEIGHT: 50,\n}\n\nclass Block {\n    constructor(height) {\n        this.height = height;\n        this.x = 0;\n        this.y = 0;\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = 'green';\n        ctx.fillRect(this.x, this.y, CONSTANTS.WIDTH, CONSTANTS.HEIGHT);\n    }\n\n    fall() {\n        this.y += CONSTANTS.DROP_SPEED;\n    }\n\n    animate(ctx) {\n        this.draw(ctx);\n        if (this.canFall()) {\n            this.fall();\n        };\n    }\n\n    canFall() {\n        if (this.y < 500) {\n            return true;\n        };\n        return false;\n    }\n\n    move() {\n        key(\"a\", () => { this.x -= CONSTANTS.WIDTH });\n        key(\"d\", () => { this.x += CONSTANTS.WIDTH });\n    }\n}\n\nmodule.exports = Block;\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Block = __webpack_require__(/*! ./block */ \"./src/block.js\");\n\nconst CONSTANTS = {\n    BG_COLOR: 'pink',\n    DIM_X: window.innerWidth / 3,\n    DIM_Y: window.innerHeight\n}\n\n\n\n\nclass Game {\n    constructor () {\n        this.height = CONSTANTS.DIM_Y;\n        this.block = new Block(this.height);\n    }\n    draw(ctx) {\n        ctx.clearRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n        ctx.fillStyle = CONSTANTS.BG_COLOR;\n        ctx.fillRect(0, 0, CONSTANTS.DIM_X, CONSTANTS.DIM_Y);\n    }\n\n    animate(ctx) {\n        this.block.move();\n        setInterval(() => {\n            this.draw(ctx);\n            this.block.animate(ctx);\n        }, 20);\n    }\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst Block = __webpack_require__(/*! ./block */ \"./src/block.js\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n    const canvas = document.getElementById('my-canvas');\n    canvas.width = window.innerWidth / 3;\n    canvas.height = window.innerHeight;\n\n    const ctx = canvas.getContext('2d');\n\n    const g = new Game();\n\n    g.animate(ctx);\n\n\n    \n})\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });