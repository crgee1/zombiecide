import Item from "./item";

export default class Weapon extends Item {
    constructor(name, minRange, maxRange, dice, hit, damage, dualWield, silentKill, silentDoor = null) {
        super(name);
        this.type = 'weapon';
        this.minRange = minRange;
        this.maxRange = maxRange;
        this.dice = dice;
        this.hit = hit;
        this.damage = damage;
        this.silentKill = silentKill;
        this.dualWield = dualWield;
        this.silentDoor = silentDoor;
    }

    attack() {
        let roll = [];
        for (let i = 0; i < this.dice; i++) {
            roll.push(this.rollDie());
        }

        return roll.some(die => die >= this.hit);
    }

    rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }
}