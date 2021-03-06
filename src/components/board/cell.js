import Zombie from "../piece/zombie";
import Player from "../piece/player";
import Objective from "../piece/objective";

export default class Cell {
    constructor(up = true, right = true, down = true, left = true, row, col, type) {
        this.up = up;
        this.right = right;
        this.down = down;
        this.left = left;
        this.row = row;
        this.col = col;
        this.name = 'cell'+row+col;
        this.type = type;
        this.targeted = false;

        this.players = [];
        this.zombies = [];
        this.objectives = [];
        this.noise = 0;
    }

    add(unit) {
        if (unit instanceof Zombie) this.zombies.push(unit);
        if (unit instanceof Player) this.players.push(unit);
        if (unit instanceof Objective) this.objectives.push(unit);
    }

    remove(unit) {
        if (unit instanceof Zombie) {
            this.checkAndRemove(unit, this.zombies);
        }
        if (unit instanceof Objective) {
            this.objectives = [];
        }
        if (unit instanceof Player) {
            this.checkAndRemove(unit, this.players);
        }
    }

    checkAndRemove(unit, arr) {
        const index = arr.indexOf(unit);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    killZombies() {
        for (let i = 0; i < this.zombies.length; i++) {
            let zombie = this.zombies[i];
            if (zombie.targeted) {
                this.zombies.splice(i, 1);
                i--;
            }
        }
    }

    calculateNoise() {
        return this.noise + this.players.length;
    }

    resetNoise() {
        this.noise = 0;
    }

    resetTargeted() {
        this.targeted = false;
    }
}