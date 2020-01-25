import Piece from './piece';

export default class Player extends Piece {
    constructor(x, y, numActions, ctx, name) {
        super(x, y, numActions, ctx);
        this.name = name;
    }
}