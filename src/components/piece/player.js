import Piece from './piece';
import slayerPic from '../../assets/images/models/slayer.png'
import magePic from '../../assets/images/models/mage.png'
import rougePic from '../../assets/images/models/rouge.png'
import amazonPic from '../../assets/images/models/amazon.png'
import bardPic from '../../assets/images/models/bard.png'
import warriorPic from '../../assets/images/models/warrior.png'

export default class Player extends Piece {
    constructor(x, y, row, col, ctx, name, numActions = 3) {
        super(x, y, row, col, numActions, ctx);
        this.image = new Image();
        this.maxActions = numActions;
        this.size = 45;
        this.exp = 0;
        this.level = 1;
        this.name = name;
        this.items = [{name: 'Empty', id: this.name+'1'}, {name: 'Empty', id: this.name+'2'}, {name: 'Empty', id: this.name+'3'}, {name: 'Empty', id: this.name+'4'}, {name: 'Empty', id: this.name+'5'},];
        this.wounds = 0;
        switch (name) {
            case 'slayer':
                this.size = 55;
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
        // if (name === 'slayer') this.addItem(new Weapon('pistol', 0, 1, 1, 4, 1, true, false));
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

    weapon() {
        return this.items[0];
    }

    splice(idx, amt) {
        let [item] = this.items.splice(idx, amt);
        while (this.items.length < 5) {
            this.items.push({ name: 'Empty', id: this.name + `${Math.random()}` })
        }
        return item;
    }

    addItem(item, idx=null) {
        let itemsIdx = this.items.reduce((acc, item) => {
            return item.name !== 'Empty' ? ++acc : acc;
        }, 0);
        if (idx === null) {
            this.items.splice(itemsIdx, 0, item);
        } else {
            this.items.splice(idx, 0, item);
        }
        let emptyCount = this.items.reduce((acc, item) => {
            return item.name === 'Empty' ? ++acc : acc;
        }, 0);
        if (this.items.length > 5 && emptyCount > 0) {
            for (let i = this.items.length-1; i >= 0; i--) {
                if (this.items[i].name === 'Empty') {
                    this.items.splice(i,1);
                    break;
                }
            }
        }
    }

    openDoorQuietly() {
        let canOpen = null;
        if (this.items[0].silentDoor === false || this.items[1].silentDoor === false) canOpen = false;
        if (this.items[0].silentDoor || this.items[1].silentDoor) canOpen = true;
        return canOpen
    }

    onHandWeapon() {
        return this.player.items[0];
    }

    gainExp(exp) {
        let oldExp = this.exp;
        this.exp = this.exp + exp;

        if (oldExp < 43 && this.exp >= 43) {
            this.level++;
        } else if (oldExp < 19 && this.exp >= 19) {
            this.level++;
        } else if (oldExp < 7 && this.exp >= 7) {
            this.level++;
            this.maxActions++;
        } 
    }

    pointsUntilLevelUp() {
        let result = 7 - this.exp;

        if (this.exp >= 43) {
            result = 'Max Level'
        } else if (this.exp >= 19) {
            result = 43 - this.exp;
        } else if (this.exp >= 7) {
            result = 19 - this.exp;
            this.maxActions++;
        } 
        return result;
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

    makeNoise() {
        this.grid.layout[this.row][this.col].noise++;
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

    hasAmmo() {
        let rightWeapon = this.items[0].name === 'pistol' || this.items[0].name === 'rifle';
        let rightAmmo = this.items.some(item => item.name === 'plenty of ammo')
        return rightAmmo && rightWeapon;
    }

    hasShells() {
        let rightWeapon = this.items[0].name === 'sawed off' || this.items[0].name === 'shotgun';
        let rightAmmo = this.items.some(item => item.name === 'plenty of shells')
        return rightAmmo && rightWeapon;
    }

    attack() {
        if ((this.items[0].name === this.items[1].name && this.items[0].dualWield) && (this.hasAmmo() || this.hasShells())) return this.items[0].attack(4);
        if ((this.items[0].name === this.items[1].name && this.items[0].dualWield) || (this.hasAmmo() || this.hasShells())) return this.items[0].attack(2);
        return this.items[0].attack();
    }
}