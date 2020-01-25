import Piece from './piece';

export default class Player extends Piece {
    constructor(x, y, numActions, name) {
        super(x, y, numActions);
        this.name = name;
    }
}