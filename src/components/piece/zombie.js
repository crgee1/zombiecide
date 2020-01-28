import Piece from "./piece";
import pic from '../../assets/images/zombie.png'

export default class Zombie extends Piece {
    constructor(x, y, row, col, ctx, grid, type = 'walker', numActions = 1) {
        super(x, y, row, col, numActions, ctx);
        this.image = new Image();
        this.image.src = pic
        this.size = 200;
        this.grid = grid;
        this.type = type;
        this.size = 35;

        this.destinationX = this.posX;
        this.destinationY = this.posY;
    }

    removeFromCell() {
        this.grid.layout[this.row][this.col].remove(this);
    }

    addToCell() {
        this.grid.layout[this.row][this.col].add(this);
    }

    reset() {
        switch (this.type) {
            case 'walker':
                this.numActions = 1;
                break;
            default:
                break;
        }
    }

    moveDown() {
        if (this.numActions > 0) {
            this.removeFromCell();
            this.numActions--;
            this.destinationY = this.posY + 100;
            this.row += 1; 
            this.addToCell();
        }
    }
    moveRight() {
        if (this.numActions > 0) {
            this.removeFromCell();
            this.numActions--;
            this.destinationX = this.posX + 100;
            this.col += 1;
            this.addToCell();
        }
    }
    moveUp() {
        if (this.numActions > 0) {
            this.removeFromCell();
            this.numActions--;
            this.destinationY = this.posY - 100;
            this.row -= 1; 
            this.addToCell();
        }
    }
    moveLeft() {
        if (this.numActions > 0) {
            this.removeFromCell();
            this.numActions--;
            this.destinationX = this.posX - 100;
            this.col -= 1;
            this.addToCell();
        }
    }
}