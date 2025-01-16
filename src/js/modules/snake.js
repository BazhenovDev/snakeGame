export class Snake {

    currentDirection = 'right';
    snake = [
        {x: 10, y: 15}
    ];

    context = null;
    positionsCount = 30;
    positionsSize = 20;

    constructor(context, positionsCount, positionsSize) {
        this.context = context;
        this.positionsCount = positionsCount;
        this.positionsSize = positionsSize;

        this.addKeyboardHandler();
    }

    addKeyboardHandler() {
        document.addEventListener('keydown', (event) => {
            if ((event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'ф' || event.key === 'A' || event.key === 'Ф') && this.currentDirection !== 'right') {
                this.currentDirection = 'left';
            } else if ((event.key === 'ArrowRight' || event.key === 'd' || event.key === 'в' || event.key === 'D' || event.key === 'В') && this.currentDirection !== 'left') {
                this.currentDirection = 'right';
            } else if ((event.key === 'ArrowUp' || event.key === 'w' || event.key === 'ц' || event.key === 'W' || event.key === 'Ц') && this.currentDirection !== 'down') {
                this.currentDirection = 'up';
            } else if ((event.key === 'ArrowDown' || event.key === 's' || event.key === 'ы' || event.key === 'S' || event.key === 'Ы') && this.currentDirection !== 'up') {
                this.currentDirection = 'down';
            }
        });

    }

    showSnake(positionFood) {
        let result = {
            gotFood: false,
            collision: false,
        };

        for (let i = 0; i < this.snake.length; i++) {
            this.context.fillStyle = 'black';
            this.context.beginPath();
            this.context.fillRect(this.snake[i].x * this.positionsSize - this.positionsSize,
                this.snake[i].y * this.positionsSize - this.positionsSize, this.positionsSize, this.positionsSize);
        }

        let newHeadPosition = {
            x: this.snake[0].x,
            y: this.snake[0].y
        }

        if(positionFood && positionFood.x === newHeadPosition.x && positionFood.y === newHeadPosition.y) {
            result.gotFood = true;
        } else {
            this.snake.pop()
        }


        if (this.currentDirection === 'left') {
            if (newHeadPosition.x === 1) {
                newHeadPosition.x = this.positionsCount;
            } else {
                newHeadPosition.x -=1;
            }

        } else if (this.currentDirection === 'right') {
            if (newHeadPosition.x === this.positionsCount) {
                newHeadPosition.x = 1;
            } else {
                newHeadPosition.x += 1;
            }

        } else if (this.currentDirection === 'up') {
            if (newHeadPosition.y === 1) {
                newHeadPosition.y = this.positionsCount;
            } else {
                newHeadPosition.y -= 1;
            }

        } else if (this.currentDirection === 'down') {
            if (newHeadPosition.y === this.positionsCount) {
                newHeadPosition.y = 1;
            } else {
                newHeadPosition.y += 1;
            }
        }

        if (!this.checkNewHeadPositionForCollision(newHeadPosition)) {
            this.snake.unshift(newHeadPosition);
        } else {
            result.collision = true;
        }

        return result;
    }

    checkNewHeadPositionForCollision(newHeadPosition) {
        for (let i = 0; i < this.snake.length; i++) {
            if (newHeadPosition.x === this.snake[i].x && newHeadPosition.y === this.snake[i].y) {
                return true;
            }
        }
        return false;
    }

}
