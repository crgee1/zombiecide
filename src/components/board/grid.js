import Cell from "./cell";
import dijkstra from "./dijkstra";

export default class Grid {
    constructor(preset, ctx, row = null, col = null) {
        this.layout = [];
        this.preset = preset;
        this.ctx = ctx;
        this.setUp()

        this.rows = this.layout.length;
        this.cols = this.layout[0].length;
    }

    drawSide(side, door, x ,y) {
        if (door === 'doorOpen' || door === 'doorClose') {
            let color = door === 'doorOpen' ? 'yellow' : 'red';
            this.ctx.setLineDash([]);
            
            switch (side) {
                case 'up':
                    this.ctx.strokeStyle = 'black';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y)
                    this.ctx.lineTo(x + 33, y);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = color;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 33, y);
                    this.ctx.lineTo(x + 66, y);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = 'black';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 66, y);
                    this.ctx.lineTo(x + 100, y);
                    this.ctx.stroke();
                    break;
                case 'right':
                    this.ctx.strokeStyle = 'black';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 100, y);
                    this.ctx.lineTo(x + 100, y + 33);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = color;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 100, y + 33);
                    this.ctx.lineTo(x + 100, y + 66);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = 'black';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 100, y + 66);
                    this.ctx.lineTo(x + 100, y + 100);
                    this.ctx.stroke();
                    break;
                case 'down':
                    this.ctx.strokeStyle = 'black';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 100, y + 100);
                    this.ctx.lineTo(x + 66, y + 100);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = color;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 66, y + 100);
                    this.ctx.lineTo(x + 33, y + 100);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = 'black';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 33, y + 100);
                    this.ctx.lineTo(x, y + 100);
                    this.ctx.stroke();
                    break;
                case 'left':
                    this.ctx.strokeStyle = 'black';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y + 100);
                    this.ctx.lineTo(x, y + 66);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = color;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y + 66);
                    this.ctx.lineTo(x, y + 33);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = 'black';
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y + 33);
                    this.ctx.lineTo(x, y);
                    this.ctx.stroke();
                    break;
                default:
                    break;
            }
        } else {
            if (!door) {
                this.ctx.setLineDash([]);
            } else {
                this.ctx.setLineDash([5, 15]);
            }
            switch (side) {
                case 'up':
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(x + 100, y);
                    this.ctx.stroke();
                    break;
                case 'right':
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 100, y);
                    this.ctx.lineTo(x + 100, y + 100);
                    this.ctx.stroke();
                    break;
                case 'down':
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 100, y + 100);
                    this.ctx.lineTo(x, y + 100);
                    this.ctx.stroke();
                    break;
                case 'left':
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y + 100);
                    this.ctx.lineTo(x, y)
                    this.ctx.stroke();
                    break;
                default:
                    break;
            }
        }
    }

    draw() {
        this.ctx.lineWidth = 2;
        this.layout.forEach((row, i) => {
            row.forEach((cell, j) => {
                let x = j * 100;
                let y = i * 100;
                
                this.ctx.strokeStyle = 'black';
                this.drawSide('up', cell.up, x, y);
                this.drawSide('right', cell.right, x, y);
                this.drawSide('down', cell.down, x, y);
                this.drawSide('left', cell.left, x, y);
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
        let row1 = [this.constructCell('fftf', 0, 0), this.constructCell('fftf', 0, 1)];
        let row2 = [this.constructCell('tfff', 1, 0), this.constructCell('tftf', 1, 1)];
        let row3 = [this.constructCell('fttf', 2, 0), this.constructCell('tfft', 2, 1)];
        let row4 = [this.constructCell('tfff', 3, 0), this.constructCell('ffff', 3, 1)];
        this.layout = [row1, row2, row3, row4];
    }

    preset2() {
        let row1 = [this.constructCell('fttf', 0, 0, 'room'), this.constructCell('fttt', 0, 1, 'room'), this.constructCell('fdtt', 0, 2, 'room'), this.constructCell('fftd', 0, 3, 'street')];
        let row2 = [this.constructCell('ttff', 1, 0, 'room'), this.constructCell('ttft', 1, 1, 'room'), this.constructCell('tfft', 1, 2, 'room'), this.constructCell('tftf', 1, 3, 'street')];
        let row3 = [this.constructCell('ftdf', 2, 0, 'street'), this.constructCell('ftft', 2, 1, 'street'), this.constructCell('ftft', 2, 2, 'street'), this.constructCell('tftt', 2, 3, 'street')];
        let row4 = [this.constructCell('dttf', 3, 0, 'room'), this.constructCell('fttt', 3, 1, 'room'), this.constructCell('fftt', 3, 2, 'room'), this.constructCell('tftf', 3, 3, 'street')];
        let row5 = [this.constructCell('ttff', 4, 0, 'room'), this.constructCell('ttft', 4, 1, 'room'), this.constructCell('tfft', 4, 2, 'room'), this.constructCell('tfff', 4, 3, 'street')];
        this.layout = [row1, row2, row3, row4, row5];
    }

    preset3() {
        let row1 = [this.constructCell('fttf', 0, 0), this.constructCell('fttt', 0, 1), this.constructCell('fftt', 0, 2), this.constructCell('fftf', 0, 3)];
        let row2 = [this.constructCell('ttff', 1, 0), this.constructCell('ttft', 1, 1), this.constructCell('tfft', 1, 2), this.constructCell('tftf', 1, 3)];
        let row3 = [this.constructCell('ftff', 2, 0), this.constructCell('ftft', 2, 1), this.constructCell('ftft', 2, 2), this.constructCell('tftt', 2, 3)];
        let row4 = [this.constructCell('fttf', 3, 0), this.constructCell('fttt', 3, 1), this.constructCell('fftt', 3, 2), this.constructCell('tftf', 3, 3)];
        let row5 = [this.constructCell('ttff', 4, 0), this.constructCell('ttft', 4, 1), this.constructCell('tfft', 4, 2), this.constructCell('tfff', 4, 3)];
        this.layout = [row1, row2, row3, row4, row5];
    }

    constructCell(cell, row, col, type) {
        let input = [];
        cell.split('').forEach(side => {
            switch (side) {
                case 't':
                    input.push(true);
                    break;
                case 'f':
                    input.push(false);
                    break;
                case 'd':
                    input.push('doorClose');
                    break;
                default:
                    break;
            }
        }) 
        return new Cell(...input, row, col, type)
    }

    makeGraphAndPath(startCell, endCell) {
        if (startCell === endCell) return 'attack';
        let result = {finish: {}};
        let queue = [startCell];
        while (queue.length > 0) {
            let cell = queue.pop();
            let obj = {};
            let name;

            if (cell.up && cell.up !== 'doorClose') {
                name = `cell${cell.row-1}${cell.col}`;
                if (name === startCell.name) name = 'start';
                if (name === endCell.name) name = 'finish';
                if (name !== 'start') obj[name] = 1;
                
                if (!result[name]) queue.push(this.layout[cell.row-1][cell.col])
            }
            if (cell.right && cell.right !== 'doorClose') {
                name = `cell${cell.row}${cell.col+1}`;
                if (name === startCell.name) name = 'start';
                if (name === endCell.name) name = 'finish';
                if (name !== 'start') obj[name] = 1;
                
                if (!result[name]) queue.push(this.layout[cell.row][cell.col+1])
            }
            if (cell.down && cell.down !== 'doorClose') {
                name = `cell${cell.row+1}${cell.col}`;
                if (name === startCell.name) name = 'start';
                if (name === endCell.name) name = 'finish';
                if (name !== 'start') obj[name] = 1;
                
                if (!result[name]) queue.push(this.layout[cell.row+1][cell.col])
            }
            if (cell.left && cell.left !== 'doorClose') {
                name = `cell${cell.row}${cell.col-1}`;
                if (name === startCell.name) name = 'start';
                if (name === endCell.name) name = 'finish';
                if (name !== 'start') obj[name] = 1;
                
                if (!result[name]) queue.push(this.layout[cell.row][cell.col-1])
            }
            if (cell === startCell) {
                result['start'] = obj;
            } else {
                result[cell.name] = obj;
            }
        }

        let dijkstraObj = dijkstra(result);
        let distance = dijkstraObj.distances;
        let row;
        let col;
        let direction;

        if (distance === 1) {
            row = endCell.name[4];
            col = endCell.name[5];
        } else {
            let nextStep = dijkstraObj.path[1];
            row = nextStep[4];
            col = nextStep[5];
        }

        
        if (row > startCell.row) direction = 'down';
        if (row < startCell.row) direction = 'up';
        if (col < startCell.col) direction = 'left';
        if (col > startCell.col) direction = 'right';

        return direction;
    }
}