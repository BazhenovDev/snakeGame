export class Snake {

    snake = [
        {x: 10, y: 20}
    ];

    context = null;
    positionsCount = null;
    positionsSize = null;

    constructor(context, positionsCount, positionsSize) {
        this.context = context;
        this.positionsCount = positionsCount;
        this.positionsSize = positionsSize;
    }

    showSnake() {
        for (let i = 0; i < this.snake.length; i++) {
            this.context.fillStyle = 'black';
            this.context.beginPath();
            this.context.fillRect(this.snake[i].x * this.positionsSize,
                this.snake[i].y * this.positionsSize, this.positionsSize, this.positionsSize);
        }
    }
}