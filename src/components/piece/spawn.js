import pic from '../../assets/images/models/spawn.png'

export default class Spawn {
    constructor(x, y, row, col, ctx, grid) {
        this.posX = x;
        this.posY = y;
        this.row = row;
        this.col = col;
        this.image = new Image();
        this.image.src = pic
        this.ctx = ctx;
        this.grid = grid;
        this.size = 30;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size);
    }
}