import Cell from "./cell";

export default class Grid {
    constructor(preset, ctx, row = null, col = null) {
        this.grid = [];
        this.preset = preset;
        this.ctx = ctx;
        if (row && col) {
            for (let i = 0; i < row; i++) {
                let rowArr = new Array(col).fill(new Cell());
                this.grid.push(rowArr);
            }
        } else {
            this.setUp()
        }
    }

    draw() {
        this.ctx.strokeWidth = '2px';
        this.ctx.strokeStyle = 'black';
        this.grid.forEach((row, i) => {
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
                this.ctx.lineTo(x + 100, y)
                this.ctx.stroke();

                if (!cell.right) {
                    this.ctx.setLineDash([]);
                } else {
                    this.ctx.setLineDash([5, 15]);
                }
                this.ctx.beginPath();
                this.ctx.moveTo(x + 100, y)
                this.ctx.lineTo(x + 100, y + 100)
                this.ctx.stroke();

                if (!cell.down) {
                    this.ctx.setLineDash([]);
                } else {
                    this.ctx.setLineDash([5, 15]);
                }
                this.ctx.beginPath();
                this.ctx.moveTo(x + 100, y + 100)
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

    setUp() {
        switch (this.preset) {
            case 1:
                this.preset1();
                break;
            case 2:
                this.preset2();
                break;
            default:
                break;
        }
    }

    preset1() {
        let row1 = [this.constructCell('fftf'), this.constructCell('fftf')];
        let row2 = [this.constructCell('tfff'), this.constructCell('tftf')];
        let row3 = [this.constructCell('fttf'), this.constructCell('tfft')];
        let row4 = [this.constructCell('tfff'), this.constructCell('ffff')];
        this.grid = [row1, row2, row3, row4];
    }

    preset2() {
        let row1 = [this.constructCell('ffff'), this.constructCell('ffff')];
        let row2 = [this.constructCell('ffff'), this.constructCell('ffff')];
        this.grid = [row1, row2];
    }

    constructCell(cell) {
        let input = [];
        cell.split('').forEach(side => {
            switch (side) {
                case 't':
                    input.push(true);
                    break;
                case 'f':
                    input.push(false);
                    break;
                default:
                    break;
            }
        }) 
        return new Cell(...input)
    }
}