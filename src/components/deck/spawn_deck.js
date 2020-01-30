import Deck from "./deck";
import SpawnCard from "../card/spawn_card";

export default class SpawnDeck extends Deck {
    constructor() {
        super();
        // this.deck.push(new SpawnCard(1, {1:[],2:[2,'runner'],3:[2,'runner'],4:[5,'walker']}));
        this.deck.push(new SpawnCard(2, {1:[1,'walker'],2:[1,'walker'],3:[6,'walker'],4:[7,'walker']}));
        this.shuffle();
    }

    discard(card) {
        this.discardPile.push(card);
    }
    
    draw() {
        let card = this.deck.pop();
        this.discard(card);
        if (this.deck.length === 0) this.addDiscardToDeck();
        return card;
    }
}