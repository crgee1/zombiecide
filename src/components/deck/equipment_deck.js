import Weapon from "../card/weapon";
import Deck from "./deck";

export default class EquipmentDeck extends Deck {
    constructor() {
        super()
        this.starting = [];
        this.starting.push(new Weapon('pan', 0, 0, 1, 6, 1, false, true));    
        this.starting.push(new Weapon('pan', 0, 0, 1, 6, 1, false, true));    
        this.starting.push(new Weapon('pan', 0, 0, 1, 6, 1, false, true));    
        this.starting.push(new Weapon('fire axe', 0, 0, 1, 4, 2, false, true, false));    
        this.starting.push(new Weapon('crowbar', 0, 0, 1, 4, 1, false, true, true));    
        this.starting.push(new Weapon('pistol', 0, 1, 1, 4, 1, true, false));  
    
        this.deck.push(new Weapon('baseball bat', 0, 0, 1, 3, 1, false, true));    
        this.deck.push(new Weapon('baseball bat', 0, 0, 1, 3, 1, false, true));    
        this.deck.push(new Weapon('chainsaw', 0, 0, 5, 5, 2, false, false, false));    
        this.deck.push(new Weapon('crowbar', 0, 0, 1, 4, 1, false, true, true));    
        this.deck.push(new Weapon('fire axe', 0, 0, 1, 4, 2, false, true, false));    
        this.deck.push(new Weapon('katana', 0, 0, 2, 4, 1, false, true));    
        this.deck.push(new Weapon('katana', 0, 0, 2, 4, 1, false, true));    
        this.deck.push(new Weapon('machete', 0, 0, 1, 4, 2, true, true));    
        this.deck.push(new Weapon('machete', 0, 0, 1, 4, 2, true, true));    
        this.deck.push(new Weapon('machete', 0, 0, 1, 4, 2, true, true));    
        this.deck.push(new Weapon('machete', 0, 0, 1, 4, 2, true, true));    
        this.deck.push(new Weapon('pistol', 0, 1, 1, 4, 1, true, false));    
        this.deck.push(new Weapon('rifle', 1, 3, 1, 3, 1, false, false));    
        this.deck.push(new Weapon('rifle', 1, 3, 1, 3, 1, false, false));    
        this.deck.push(new Weapon('sawed off', 0, 1, 2, 3, 1, true, false));    
        this.deck.push(new Weapon('sawed off', 0, 1, 2, 3, 1, true, false));    
        this.deck.push(new Weapon('sawed off', 0, 1, 2, 3, 1, true, false));    
        this.deck.push(new Weapon('sawed off', 0, 1, 2, 3, 1, true, false));    
        this.deck.push(new Weapon('shotgun', 0, 1, 2, 4, 2, false, false));    
        this.deck.push(new Weapon('shotgun', 0, 1, 2, 4, 2, false, false));    
        this.deck.push(new Weapon('sub mg', 0, 1, 3, 5, 1, true, false));    
        this.deck.push(new Weapon('sub mg', 0, 1, 3, 5, 1, true, false));    
        this.shuffle();
    }

    givePistol() {
        return new Weapon('pistol', 0, 1, 1, 4, 1, true, false);
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