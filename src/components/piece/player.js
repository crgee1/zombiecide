import Piece from './piece';
import slayerPic from '../../assets/images/slayer.png'
import magePic from '../../assets/images/mage.png'
import rougePic from '../../assets/images/rouge.png'
import amazonPic from '../../assets/images/amazon.png'
import bardPic from '../../assets/images/bard.png'
import warriorPic from '../../assets/images/warrior.png'

export default class Player extends Piece {
    constructor(x, y, row, col, ctx, name, numActions = 3) {
        super(x, y, row, col, numActions, ctx);
        this.image = new Image();
        this.maxActions = numActions;
        this.size = 45;
        this.exp = 0;
        this.items = [];
        
        switch (name) {
            case 'slayer':
                this.image.src = slayerPic;
                break;
            case 'mage':
                this.image.src = magePic;
                break;
            case 'rouge':
                this.image.src = rougePic;
                break;
            case 'amazon':
                this.image.src = amazonPic;
                break;
            case 'bard':
                this.image.src = bardPic;
                break;
            case 'warrior':
                this.image.src = warriorPic;
                break;
            default:
                break;
        }

        this.name = name;
    }

    addGrid(grid) {
        this.grid = grid;
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