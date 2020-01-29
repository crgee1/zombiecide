import Piece from "./piece";
import pic from '../../assets/images/model/blood.png'

export default class Blood extends Piece {
    constructor(x, y, row, col, ctx, grid) {
        super(x, y, row, col, 0, ctx);
        this.image = new Image();
        this.image.src = pic
        this.grid = grid;
        this.size = 35;
    }

    removeFromCell() {
        this.grid.layout[this.row][this.col].remove(this);
    }

    addToCell() {
        this.grid.layout[this.row][this.col].add(this);
    }
}