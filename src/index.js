const Game = require("./game");
const Block = require("./block");

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('my-canvas');
    canvas.width = 500;
    canvas.height = 650;

    const ctx = canvas.getContext('2d');

    const g = new Game(ctx);
    g.play();

})