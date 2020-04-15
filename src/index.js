const Game = require("./game");
const Piece = require("./piece");

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('my-canvas');
    canvas.width = 500;
    canvas.height = 650;
    const ctx = canvas.getContext('2d');

    const side = document.getElementById('side-canvas');
    side.width = 300;
    side.height = 300;
    const sideCtx = side.getContext('2d');

    const g = new Game(ctx, sideCtx);

    g.play();
    
})