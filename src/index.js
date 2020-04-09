const Game = require("./game");
const Block = require("./block");

document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('my-canvas');
    canvas.width = window.innerWidth / 3;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    const g = new Game();

    g.animate(ctx);


    
})