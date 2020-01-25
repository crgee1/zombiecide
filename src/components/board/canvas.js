import Grid from "./grid";
import Zombie from "../piece/zombie";


export default class Board {
    constructor(preset) { 
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.grid = new Grid(preset);

        
        this.ctx.strokeWidth = '2px';
        this.ctx.strokeStyle = 'black';
        this.grid.grid.forEach((row, i) => {
            row.forEach((cell, j) => {
                let x = j * 100;
                let y = i * 100;

                if (!cell.up) {
                    this.ctx.setLineDash([]);
                } else {
                    this.ctx.setLineDash([5, 15]);
                }
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y)
                    this.ctx.lineTo(x+100, y)
                    this.ctx.stroke();

                if (!cell.right) {
                    this.ctx.setLineDash([]);
                } else {
                    this.ctx.setLineDash([5, 15]);
                }
                this.ctx.beginPath();
                this.ctx.moveTo(x+100, y)
                this.ctx.lineTo(x+100, y + 100)
                this.ctx.stroke();

                if (!cell.down) {
                    this.ctx.setLineDash([]);
                } else {
                    this.ctx.setLineDash([5, 15]);
                }
                this.ctx.beginPath();
                this.ctx.moveTo(x+100, y + 100)
                this.ctx.lineTo(x, y + 100)
                this.ctx.stroke();
                
                if (!cell.left) {
                    this.ctx.setLineDash([]);
                } else {
                    this.ctx.setLineDash([5, 15]);
                }
                this.ctx.beginPath();
                this.ctx.moveTo(x, y + 100)
                this.ctx.lineTo(x, y)
                this.ctx.stroke();
            })
        });
    }

    spawnZombie(x, y) {
        let zombie = new Zombie(x,y,1, this.ctx);
        zombie.draw();
    }
}
