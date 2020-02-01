import Piece from "./piece";
import walker from '../../assets/images/models/zombie.png';
import runner from '../../assets/images/models/runner1.png';
import fatty from '../../assets/images/models/fatty.png';
import abomination from '../../assets/images/models/abomination.png';
import Item from "../card/item";


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
            case 'abomination':
                this.size = 45;
                this.health = 2;
                this.image.src = abomination;
                break;
            default:
                break;
        }

    }

    cell() {
        return this.grid.layout[this.row][this.col]
    }

    attack() {
        if (this.numActions > 0) {
            this.cell().players[0].addItem(new Item(Math.random() * 100, 'wounded'));
            this.numActions--;
        }
    }

    removeFromCell() {
        this.cell().remove(this);
    }

    addToCell() {
        this.cell().add(this);
    }

    reset() {
        this.numActions = this.maxActions;
    }

    moveDown() {
        if (this.numActions > 0 && this.cell().down !== 'doorClose') {
            this.removeFromCell();
            this.numActions--;
            this.destinationY += 100;
            this.row += 1; 
            this.addToCell();
        }
    }
    moveRight() {
        if (this.numActions > 0 && this.cell().right !== 'doorClose') {
            this.removeFromCell();
            this.numActions--;
            this.destinationX += 100;
            this.col += 1;
            this.addToCell();
        }
    }
    moveUp() {
        if (this.numActions > 0 && this.cell().up !== 'doorClose') {
            this.removeFromCell();
            this.numActions--;
            this.destinationY -= 100;
            this.row -= 1; 
            this.addToCell();
        }
    }
    moveLeft() {
        if (this.numActions > 0 && this.cell().left !== 'doorClose') {
            this.removeFromCell();
            this.numActions--;
            this.destinationX -= 100;
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
            this.posY-=1;
        }
        if (this.destinationY > this.posY) {
            this.posY+=1;
        }
        if (this.destinationX > this.posX) {
            this.posX+=1;
        }
        if (this.destinationX < this.posX) {
            this.posX-=1;
        }

        if (this.targeted) {
            this.ctx.strokeStyle = 'red';
            this.ctx.beginPath();
            this.ctx.arc(this.posX, this.posY, this.size/1.5, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }
}