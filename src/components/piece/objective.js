import box from '../../assets/images/models/box.png'
import exit from '../../assets/images/models/exit.png'

export default class Objective {
    constructor(row, col, ctx) {
        this.row = row;
        this.col = col;
        this.ctx = ctx
        this.image = new Image();
        this.image.src = row === 6 && col === 0 ? exit : box;
        this.size = 30;
        this.posX = col * 100 + 50;
        this.posY = row * 100 + 50;
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