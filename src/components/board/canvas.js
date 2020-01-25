import Grid from "./grid";


export default class Board {
    constructor(preset) { 
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.grid = new Grid(preset);

        
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeWidth = '2px';
        this.grid.grid.forEach((row, i) => {
            row.forEach((cell, j) => {
                let x = j * 100;
                let y = i * 100;
                if (!cell.up) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y)
                    this.ctx.lineTo(x+100, y)
                    this.ctx.stroke();
                }
                if (!cell.right) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(x+100, y)
                    this.ctx.lineTo(x+100, y + 100)
                    this.ctx.stroke();
                }
                if (!cell.down) {
                    this.ctx.moveTo(x+100, y + 100)
                    this.ctx.lineTo(x, y + 100)
                    this.ctx.stroke();
                }
                if (!cell.left) {
                    this.ctx.moveTo(x, y + 100)
                    this.ctx.lineTo(x, y)
                    this.ctx.stroke();
                }
            })
        });
    }
}
