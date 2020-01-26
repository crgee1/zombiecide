export default class Piece {
    constructor(x, y, gridX, gridY, numActions, ctx) {
        this.posX = x;
        this.posY = y;
        this.gridX = gridX;
        this.gridY = gridY;
        this.numActions = numActions
        this.ctx = ctx
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
}