import pic from '../../assets/images/models/spawn.png'
import Zombie from './zombie';

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

    spawnZombie(num, type) {
        let zombies = [];
        for (let i = 0; i < num; i++) {
            let randomY = Math.random() * 80 + 10 + this.row * 100;
            let randomX = Math.random() * 80 + 10 + this.col * 100;
            let zombie = new Zombie(randomX, randomY, this.row, this.col, this.ctx, this.grid, type);
            this.grid.layout[this.row][this.col].add(zombie);
            zombies.push(zombie);
        }
        if (type === 'fatty') {
            for (let i = 0; i < num; i++) {
                zombies.push(...this.spawnZombie(2, 'walker'))
            }
        }
        return zombies;
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX - this.size / 2, this.posY - this.size / 2, this.size, this.size);
    }
}