import Deck from "./deck";
import SpawnCard from "../card/spawn_card";

export default class SpawnDeck extends Deck {
    constructor() {
        super();
        let walker = 'walker';
        let runner = 'runner';
        let fatty = 'fatty';
        this.deck.push(new SpawnCard(1, {1:[],2:[2,'runner'],3:[2,'runner'],4:[5,'walker']}));
        this.deck.push(new SpawnCard(2, {1:[1,walker],2:[1,walker],3:[6,walker],4:[7,walker]}));
        this.deck.push(new SpawnCard(3, {1:[1,walker],2:[1,runner],3:[1,fatty],4:[4,runner]}));
        this.deck.push(new SpawnCard(4, {1:[2,walker],2:[3,walker],3:[4,walker],4:[2,runner]}));
        this.deck.push(new SpawnCard(5, {1:[0,walker],2:[4,walker],3:[2,fatty],4:[5,walker]}));
        this.deck.push(new SpawnCard(6, {1:[1,walker],2:[1,walker],3:[3,runner],4:[7,walker]}));
        this.deck.push(new SpawnCard(7, {1:[1,walker],2:[2,walker],3:[2,walker],4:[4,runner]}));
        this.deck.push(new SpawnCard(8, {1:[2,walker],2:[3,walker],3:[4,walker],4:[2,fatty]}));
        this.deck.push(new SpawnCard(9, {1:[0,walker],2:[4,walker],3:[2,runner],4:[5,walker]}));
        this.deck.push(new SpawnCard(10, {1:[1,walker],2:[1,walker],3:[3,runner],4:[7,walker]}));
        this.deck.push(new SpawnCard(11, {1:[1,walker],2:[1,runner],3:[1,runner],4:[4,fatty]}));
        this.deck.push(new SpawnCard(12, {1:[1,fatty],2:[3,walker],3:[4,walker],4:[2,runner]}));
        this.deck.push(new SpawnCard(13, {1:[0,walker],2:[2,runner],3:[2,runner],4:[5,walker]}));
        this.deck.push(new SpawnCard(14, {1:[1,walker],2:[1,walker],3:[6,walker],4:[7,walker]}));
        this.deck.push(new SpawnCard(15, {1:[1,walker],2:[1,runner],3:[1,fatty],4:[4,runner]}));
        this.deck.push(new SpawnCard(16, {1:[2,walker],2:[3,walker],3:[4,walker],4:[2,runner]}));
        this.deck.push(new SpawnCard(17, {1:[0,walker],2:[4,walker],3:[2,fatty],4:[5,walker]}));
        this.deck.push(new SpawnCard(18, {1:[1,walker],2:[1,walker],3:[3,runner],4:[7,walker]}));
        this.deck.push(new SpawnCard(19, {1:[1,walker],2:[2,walker],3:[2,walker],4:[4,runner]}));
        this.deck.push(new SpawnCard(20, {1:[2,walker],2:[3,walker],3:[4,walker],4:[2,fatty]}));
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