
export default class Weapon {
    constructor(id,name, minRange, maxRange, dice, hit, damage, dualWield, silentKill, silentDoor = null) {
        this.name = name;
        this.id = id
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
        let result = roll.some(die => die >= this.hit);
        return [...roll, result];
    }

    rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }
}