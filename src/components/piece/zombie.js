import Piece from "./piece";
import pic from '../../assets/images/model/zombie.png'

export default class Zombie extends Piece {
    constructor(x, y, row, col, ctx, grid, type = 'walker', numActions = 1) {
        super(x, y, row, col, numActions, ctx);
        this.image = new Image();
        this.image.src = pic
        this.grid = grid;
        this.type = type;
        this.size = 35;
        this.targeted = false;

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
        if (this.numActions > 0 && this.grid.layout[this.row][this.col].down !== 'doorClose') {
            this.removeFromCell();
            this.numActions--;
            this.destinationY = this.posY + 100;
            this.row += 1; 
            this.addToCell();
        }
    }
    moveRight() {
        if (this.numActions > 0 && this.grid.layout[this.row][this.col].right !== 'doorClose') {
            this.removeFromCell();
            this.numActions--;
            this.destinationX = this.posX + 100;
            this.col += 1;
            this.addToCell();
        }
    }
    moveUp() {
        if (this.numActions > 0 && this.grid.layout[this.row][this.col].up !== 'doorClose') {
            this.removeFromCell();
            this.numActions--;
            this.destinationY = this.posY - 100;
            this.row -= 1; 
            this.addToCell();
        }
    }
    moveLeft() {
        if (this.numActions > 0 && this.grid.layout[this.row][this.col].left !== 'doorClose') {
            this.removeFromCell();
            this.numActions--;
            this.destinationX = this.posX - 100;
            this.col -= 1;
            this.addToCell();
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

        if (this.targeted) {
            this.ctx.strokeStyle = 'red';
            this.ctx.beginPath();
            this.ctx.arc(this.posX, this.posY, this.size/1.5, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }
}