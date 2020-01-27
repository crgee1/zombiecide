import Piece from './piece';
import slayerPic from '../../assets/images/slayer.png'

export default class Player extends Piece {
    constructor(x, y, row, col, ctx, name, numActions = 3) {
        super(x, y, row, col, numActions, ctx);
        this.image = new Image();
        
        switch (name) {
            case 'slayer':
                this.image.src = slayerPic;
                break;
            default:
                break;
        }

        this.name = name;
    }

    move(direction) {
        switch (direction) {
            case 'down':
                
                break;
        
            default:
                break;
        }
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, 60, 60);
    }
}