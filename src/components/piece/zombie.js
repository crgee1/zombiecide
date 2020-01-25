import Piece from "./piece";
import pic from './zombie.png'

export default class Zombie extends Piece {
    constructor(x, y, numActions, ctx) {
        super(x, y, numActions, ctx);
        this.image = new Image();
        this.image.onerror = function () { alert(this.image.src + ' failed'); } 
        this.image.src = pic
        this.size = 200;
        this.draw()
    }

    draw() {
        // this.ctx.clearRect(0, 0, 1000, 1000);
        // document.getElementById('game').appendChild(this.image);
        this.ctx.drawImage(this.image, this.posX, this.posY, 30, 30);
        console.log('here')
    }
}