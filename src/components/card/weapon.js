
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

    attack(multiple=1) {
        let roll = [];
        for (let i = 0; i < this.dice * multiple; i++) {
            roll.push(this.rollDie());
        }
        let result = roll.reduce((acc, die) => {
            return die >= this.hit ? acc+1 : acc
        }, 0);
        return [...roll, result];
    }

    rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }
}