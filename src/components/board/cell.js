export default class Cell {
    constructor(up = true, right = true, down = true, left = true) {
        this.up = up;
        this.right = right;
        this.down = down;
        this.left = left;
    }
}