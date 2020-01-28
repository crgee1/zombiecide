export default class Deck {
    constructor() {
        this.deck = [];
        this.discard = [];
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
        this.deck = [...this.discard];
        this.discard = [];
        this.shuffle();
    }

    draw() {
        return this.deck.pop()
    }

    discard(card) {
        this.discard.push(card);
    }

    length() {
        return this.deck.length;
    }
}