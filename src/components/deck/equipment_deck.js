import Weapon from "../card/weapon";
import Deck from "./deck";

export default class EquipmentDeck extends Deck {
    constructor() {
        super()
        this.starting = [];
        this.starting.push(new Weapon(1,'pan', 0, 0, 1, 6, 1, false, true));    
        this.starting.push(new Weapon(2,'pan', 0, 0, 1, 6, 1, false, true));    
        this.starting.push(new Weapon(3,'pan', 0, 0, 1, 6, 1, false, true));    
        this.starting.push(new Weapon(4,'fire axe', 0, 0, 1, 4, 2, false, true, false));    
        this.starting.push(new Weapon(5,'crowbar', 0, 0, 1, 4, 1, false, true, true));    
        this.starting.push(new Weapon(6,'pistol', 0, 1, 4, 4, 1, true, false));  
    
        this.deck.push(new Weapon(7,'baseball bat', 0, 0, 1, 3, 1, false, true));    
        this.deck.push(new Weapon(8,'baseball bat', 0, 0, 1, 3, 1, false, true));    
        this.deck.push(new Weapon(9,'chainsaw', 0, 0, 5, 5, 2, false, false, false));    
        this.deck.push(new Weapon(10,'crowbar', 0, 0, 1, 4, 1, false, true, true));    
        this.deck.push(new Weapon(11,'fire axe', 0, 0, 1, 4, 2, false, true, false));    
        this.deck.push(new Weapon(12,'katana', 0, 0, 2, 4, 1, false, true));    
        this.deck.push(new Weapon(13,'katana', 0, 0, 2, 4, 1, false, true));    
        this.deck.push(new Weapon(14,'machete', 0, 0, 1, 4, 2, true, true));    
        this.deck.push(new Weapon(15,'machete', 0, 0, 1, 4, 2, true, true));    
        this.deck.push(new Weapon(16,'machete', 0, 0, 1, 4, 2, true, true));    
        this.deck.push(new Weapon(17,'machete', 0, 0, 1, 4, 2, true, true));    
        this.deck.push(new Weapon(18,'pistol', 0, 1, 1, 4, 1, true, false));    
        this.deck.push(new Weapon(19,'rifle', 1, 3, 1, 3, 1, false, false));    
        this.deck.push(new Weapon(20,'rifle', 1, 3, 1, 3, 1, false, false));    
        this.deck.push(new Weapon(21,'sawed off', 0, 1, 2, 3, 1, true, false));    
        this.deck.push(new Weapon(22,'sawed off', 0, 1, 2, 3, 1, true, false));    
        this.deck.push(new Weapon(23,'sawed off', 0, 1, 2, 3, 1, true, false));    
        this.deck.push(new Weapon(24,'sawed off', 0, 1, 2, 3, 1, true, false));    
        this.deck.push(new Weapon(25,'shotgun', 0, 1, 2, 4, 2, false, false));    
        this.deck.push(new Weapon(26,'shotgun', 0, 1, 2, 4, 2, false, false));    
        this.deck.push(new Weapon(27,'sub mg', 0, 1, 3, 5, 1, true, false));    
        this.deck.push(new Weapon(28,'sub mg', 0, 1, 3, 5, 1, true, false));    
        this.shuffle();
    }

    givePistol() {
        return new Weapon(0, 'pistol', 0, 1, 1, 4, 1, true, false);
    }

    findPair(pair) {
        for (let i = 0; i < this.deck.length; i++) {
            let weapon = this.deck[i];
            if (weapon.name === pair.name) {
                return this.deck.splice(i, 1)[0];
            }
        }
        return null;
    }

    dealStartingItems() {
        let deckArr = [...this.starting];
        for (let i = deckArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deckArr[i], deckArr[j]] = [deckArr[j], deckArr[i]];
        }
        return deckArr;
    }
}