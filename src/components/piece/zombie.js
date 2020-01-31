import Piece from "./piece";
import walker from '../../assets/images/models/zombie.png'
import runner from '../../assets/images/models/runner1.png'
import fatty from '../../assets/images/models/fatty.png'


export default class Zombie extends Piece {
    constructor(x, y, row, col, ctx, grid, type) {
        let numActions = type === 'runner' ? 2 : 1;
        super(x, y, row, col, numActions, ctx);
        this.image = new Image();
        this.grid = grid;
        this.type = type;
        
        this.targeted = false;

        switch (type) {
            case 'walker':
                this.size = 35;
                this.health = 1;
                this.image.src = walker;
                break;
            case 'runner':
                this.size = 45;
                this.health = 1;
                this.image.src = runner;
                break;
            case 'fatty':
                this.size = 45;
                this.health = 2;
                this.image.src = fatty;
                break;
            default:
                break;
        }

    }

    removeFromCell() {
        this.grid.layout[this.row][this.col].remove(this);
    }

    addToCell() {
        this.grid.layout[this.row][this.col].add(this);
    }

    reset() {
        this.numActions = this.maxActions;
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

    contains(x, y, damage) {
        var distancesquared = (x - this.posX) * (x - this.posX) + (y - this.posY) * (y - this.posY);
        let radius = this.size / 2;
        return distancesquared <= radius * radius && damage >= this.health;
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