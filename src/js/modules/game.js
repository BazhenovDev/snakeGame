import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game {

    snake = null;
    context = null;
    positionsCount = null;
    positionsSize = null;
    interval = null;
    score = 0;
    scoreElement = null;

    constructor(context, settings) {
        this.context = context;

        this.positionsCount = settings.positionsCount;
        this.positionsSize = settings.positionsSize;

        this.scoreElement = document.getElementById('score')
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));

    }

    startGame() {
        if (this.interval) {
            clearInterval(this.interval)
        }
        this.score = 0;
        this.scoreElement.innerText = this.score;
        this.snake = new Snake(this.context, this.positionsCount, this.positionsSize);
        this.food = new Food(this.context, this.positionsCount, this.positionsSize);

        this.food.setNewFoodPosition();
        this.interval = setInterval(this.gameProcess.bind(this), 100)
    }

    gameProcess() {
        this.context.clearRect(0, 0, this.positionsCount * this.positionsSize, this.positionsCount * this.positionsSize)

        // this.showGrid();
        this.food.showFood();
        let result = this.snake.showSnake(this.food.positionFood);
        if (result) {
            if (result.collision) {
                this.endGame()
            } else if (result.gotFood) {
                this.score += 1;
                this.scoreElement.innerText = this.score
                this.food.setNewFoodPosition()
            }
        }
    }

    endGame() {
        clearInterval(this.interval);
        this.context.clearRect(0, 0, this.positionsSize * this.positionsCount, this.positionsSize * this.positionsCount);
        this.context.fillStyle = 'black';
        this.context.font = 'bold 48px Arial';
        this.context.textAlight = 'center';
        this.context.fillText(`Вы набрали: ${this.score} очков!`,
            40,
            (this.positionsCount * this.positionsSize) / 2);
    }

    showGrid() {
        const size = this.positionsCount * this.positionsSize;
        for (let x = 0; x <= size; x += this.positionsSize) {
            this.context.moveTo(0.5 + x + this.positionsSize, 0)
            this.context.lineTo(0.5 + x + this.positionsSize, size + this.positionsSize)
        }

        for (let x = 0; x <= size; x += this.positionsSize) {
            this.context.moveTo(0, 0.5 + x + this.positionsSize)
            this.context.lineTo(size + this.positionsSize, 0.5 + x + this.positionsSize)
        }
        this.context.strokeStyle = 'black'
        this.context.stroke()
    }
}