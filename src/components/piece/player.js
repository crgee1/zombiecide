import Piece from './piece';
import slayerPic from '../../assets/images/models/slayer.png'
import magePic from '../../assets/images/models/mage.png'
import rougePic from '../../assets/images/models/rouge.png'
import amazonPic from '../../assets/images/models/amazon.png'
import bardPic from '../../assets/images/models/bard.png'
import warriorPic from '../../assets/images/models/warrior.png'
import Weapon from '../card/weapon';

export default class Player extends Piece {
    constructor(x, y, row, col, ctx, name, numActions = 3) {
        super(x, y, row, col, numActions, ctx);
        this.image = new Image();
        this.maxActions = numActions;
        this.size = 45;
        this.exp = 0;
        this.level = 1;
        this.items = [];
        this.wounds = 0;
        this.name = name;
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
        if (name === 'slayer') this.items = [new Weapon('pistol', 0, 1, 1, 4, 1, true, false)];
    }

    remove(item) {
        for (let i = this.items.length - 1; i >= 0; i--) {
            if (item.name === this.items[i]) {
                let removedItem = this.items[i];
                delete this.items[i];
                return removedItem;
            }
        }
    }

    addItem(item) {
        item.owner = this;
        this.items.push(item);
    }

    onHandWeapon() {
        return this.player.items[0];
    }

    gainExp(exp) {
        let oldExp = this.exp;
        let newExp = this.exp + exp;

        if (oldExp < 43 && newExp >= 43) {
            this.level++;
        } else if (oldExp < 19 && newExp >= 19) {
            this.level++;
        } else if (oldExp < 7 && newExp >= 7) {
            this.level++;
            this.maxActions++;
        } 
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

    attack() {
        return this.items[0].attack();
    }
}