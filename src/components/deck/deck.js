export default class Deck {
    constructor() {
        this.deck = [];
        this.discardPile = [];
    }

    shuffle() {
        let deckArr = [...this.deck];
        for (let i = deckArr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [deckArr[i], deckArr[j]] = [deckArr[j], deckArr[i]];
        }
        this.deck = deckArr;
    }

    addDiscardToDeck() {
        this.deck = [...this.discardPile];
        this.discardPile = [];
        this.shuffle();
    }

    draw() {
        let card = this.deck.pop();
        if (this.deck.length === 0) this.addDiscardToDeck();
        return card;
    }

    discard(card) {
        this.discardPile.push(card);
    }

    length() {
        return this.deck.length;
    }
}