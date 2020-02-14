
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

    attack(multiple=1, ammo=false) {
        if (this.name === 'molotov') return [Infinity];
        let roll = [];
        let numDice = this.dice * multiple;
        if (this.owner.level >= 3) numDice += 1;
        for (let i = 0; i < numDice; i++) {
            roll.push(this.rollDie());
        }
        if (ammo) {
            roll = roll.map(die => {
                if (this.owner.level >= 4 && die < this.hit-1) return this.rollDie();
                if (die < this.hit) return this.rollDie();
                return die;
            })
        }
        let result = roll.reduce((acc, die) => {
            if (this.owner.level >= 4) return die >= this.hit-1 ? acc + 1 : acc;
            return die >= this.hit ? acc+1 : acc
        }, 0);
        return [...roll, result];
    }

    rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }
}