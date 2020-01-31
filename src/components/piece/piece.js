export default class Piece {
    constructor(x, y, row, col, numActions, ctx) {
        this.posX = x;
        this.posY = y;
        this.row = row;
        this.col = col;
        this.numActions = numActions;
        this.maxActions = numActions;
        this.ctx = ctx;
        this.size = 35;
        this.destinationX = x;
        this.destinationY = y;
    }

    move(direction) {
        switch (direction) {
            case 'up':
                this.posY += 100;
                break;
            case 'down':
                this.posY -= 100;
                break;
            case 'left':
                this.posX -= 100;
                break;
            case 'right':
                this.posX += 100;
                break;
            default:
                break;
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size);
        if (this.destinationY < this.posY) {
            this.posY--;
        }
        if (this.destinationY > this.posY) {
            this.posY++;
        }
        if (this.destinationX > this.posX) {
            this.posX++;
        }
        if (this.destinationX < this.posX) {
            this.posX--;
        }
    }
}