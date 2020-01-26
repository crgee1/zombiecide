import Piece from "./piece";
import pic from '../../assets/images/zombie.png'

export default class Zombie extends Piece {
    constructor(x, y, ctx, numActions = 1) {
        super(x, y, numActions, ctx);
        this.image = new Image();
        this.image.src = pic
        this.size = 200;

        this.destinationX = this.posX;
        this.destinationY = this.posY;
    }

    

    moveDown() {
        this.destinationY = this.posY + 100;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, 35, 35);
        if (this.destinationY < this.posY) {
            this.posY--;
        }
        if (this.destinationY > this.posY) {
            this.posY++;
        }
    }
}