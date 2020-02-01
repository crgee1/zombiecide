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

    drawSide(side, door, x ,y, targetColor) {
        if (door === 'doorOpen' || door === 'doorClose') {
            let color = door === 'doorOpen' ? 'yellow' : 'red';
            this.ctx.setLineDash([]);
            switch (side) {
                case 'up':
                    this.ctx.strokeStyle = targetColor;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y)
                    this.ctx.lineTo(x + 33, y);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = color;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 33, y);
                    this.ctx.lineTo(x + 66, y);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = targetColor;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 66, y);
                    this.ctx.lineTo(x + 100, y);
                    this.ctx.stroke();
                    break;
                case 'right':
                    this.ctx.strokeStyle = targetColor;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 100, y);
                    this.ctx.lineTo(x + 100, y + 33);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = color;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 100, y + 33);
                    this.ctx.lineTo(x + 100, y + 66);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = targetColor;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 100, y + 66);
                    this.ctx.lineTo(x + 100, y + 100);
                    this.ctx.stroke();
                    break;
                case 'down':
                    this.ctx.strokeStyle = targetColor;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 100, y + 100);
                    this.ctx.lineTo(x + 66, y + 100);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = color;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 66, y + 100);
                    this.ctx.lineTo(x + 33, y + 100);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = targetColor;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x + 33, y + 100);
                    this.ctx.lineTo(x, y + 100);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = targetColor;
                    break;
                case 'left':
                    this.ctx.strokeStyle = targetColor;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y + 100);
                    this.ctx.lineTo(x, y + 66);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = color;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y + 66);
                    this.ctx.lineTo(x, y + 33);
                    this.ctx.stroke();
                    this.ctx.strokeStyle = targetColor;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y + 33);
                    this.ctx.lineTo(x, y);
                    this.ctx.stroke();
                    break;
                default:
                    break;
            }
        } else {
            this.ctx.strokeStyle = targetColor;
            if (!door) {
                this.ctx.setLineDash([]);
            } else {
                this.ctx.setLineDash([5, 25]);
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
                let targetedColor = 'black';
                targetedColor = cell.targeted ? 'blue' : 'black';
                if (this.layout[i-1] && this.layout[i-1][j]) targetedColor = cell.targeted || this.layout[i - 1][j].targeted ? 'blue' : 'black'
                this.drawSide('up', cell.up, x, y, targetedColor);
                if (this.layout[i] && this.layout[i][j+1]) targetedColor = cell.targeted || this.layout[i][j+1].targeted ? 'blue' : 'black'
                this.drawSide('right', cell.right, x, y, targetedColor);
                if (this.layout[i+1] && this.layout[i+1][j]) targetedColor = cell.targeted || this.layout[i+1][j].targeted ? 'blue' : 'black'
                this.drawSide('down', cell.down, x, y, targetedColor);
                if (this.layout[i] && this.layout[i][j-1]) targetedColor = cell.targeted || this.layout[i][j-1].targeted ? 'blue' : 'black'
                this.drawSide('left', cell.left, x, y, targetedColor);
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
            case 3:
                this.preset3();
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
        let row1 = [this.constructCell('fttf', 0, 0, 'room'), this.constructCell('fftt', 0, 1, 'room'), this.constructCell('fftf', 0, 2, 'street'), this.constructCell('fttf', 0, 3, 'room'), this.constructCell('fttt', 0, 4, 'room'), this.constructCell('fftt', 0, 5, 'room')];
        let row2 = [this.constructCell('ttff', 1, 0, 'room'), this.constructCell('tdft', 1, 1, 'room'), this.constructCell('tdtd', 1, 2, 'street'), this.constructCell('ttfd', 1, 3, 'room'), this.constructCell('ttft', 1, 4, 'room'), this.constructCell('tfdt', 1, 5, 'room')];
        let row3 = [this.constructCell('ftff', 2, 0, 'street'), this.constructCell('ftft', 2, 1, 'street'), this.constructCell('tttt', 2, 2, 'street'), this.constructCell('ftdt', 2, 3, 'street'), this.constructCell('fttt', 2, 4, 'street'), this.constructCell('dfdt', 2, 5, 'street')];
        let row4 = [this.constructCell('ftff', 3, 0, 'room'), this.constructCell('ffdt', 3, 1, 'room'), this.constructCell('tftf', 3, 2, 'street'), this.constructCell('dfdf', 3, 3, 'room'), this.constructCell('tftf', 3, 4, 'room'), this.constructCell('dfff', 3, 5, 'room')];
        let row5 = [this.constructCell('ftff', 4, 0, 'street'), this.constructCell('dtdt', 4, 1, 'street'), this.constructCell('ttft', 4, 2, 'street'), this.constructCell('dtft', 4, 3, 'street'), this.constructCell('tttt', 4, 4, 'street'), this.constructCell('ffft', 4, 5, 'street')];
        let row6 = [this.constructCell('ftff', 5, 0, 'room'), this.constructCell('dtft', 5, 1, 'room'), this.constructCell('ftft', 5, 2, 'room'), this.constructCell('fdft', 5, 3, 'room'), this.constructCell('tdtd', 5, 4, 'street'), this.constructCell('fftd', 5, 5, 'room')];
        let row7 = [this.constructCell('ftff', 6, 0, 'street'), this.constructCell('ftft', 6, 1, 'street'), this.constructCell('ftft', 6, 2, 'street'), this.constructCell('ftft', 6, 3, 'street'), this.constructCell('tfft', 6, 4, 'street'), this.constructCell('tfff', 6, 5, 'room')];
        this.layout = [row1, row2, row3, row4, row5, row6, row7];
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

    nextDirection(startCell, endCell) {
        if (startCell === endCell) return 'attack';
        let result = {finish: {}};
        let queue = [startCell];
        while (queue.length > 0) {
            let cell = queue.pop();
            let obj = {};
            let name;

            if (cell.up) {
                name = `cell${cell.row-1}${cell.col}`;
                if (name === startCell.name) name = 'start';
                if (name === endCell.name) name = 'finish';
                if (name !== 'start') obj[name] = 1;
                
                if (!result[name]) queue.push(this.layout[cell.row-1][cell.col])
            }
            if (cell.right) {
                name = `cell${cell.row}${cell.col+1}`;
                if (name === startCell.name) name = 'start';
                if (name === endCell.name) name = 'finish';
                if (name !== 'start') obj[name] = 1;
                
                if (!result[name]) queue.push(this.layout[cell.row][cell.col+1])
            }
            if (cell.down) {
                name = `cell${cell.row+1}${cell.col}`;
                if (name === startCell.name) name = 'start';
                if (name === endCell.name) name = 'finish';
                if (name !== 'start') obj[name] = 1;
                
                if (!result[name]) queue.push(this.layout[cell.row+1][cell.col])
            }
            if (cell.left) {
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
        let row, col, direction;

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

    connectingRooms(startCell) {
        let queue = [startCell];
        let result = [startCell];
        let visited = {[startCell.name]: true}
        while (queue.length > 0) {
            let cell = queue.pop();

            if (cell.up) {
                let cellUp = this.layout[cell.row - 1][cell.col];
                if (cellUp.type === 'room' && !visited[cellUp.name]) {
                    visited[cellUp.name] = true;
                    result.push(cellUp);
                    queue.push(cellUp);
                }
            }
            if (cell.right) {
                let cellRight = this.layout[cell.row][cell.col+1];
                if (cellRight.type === 'room' && !visited[cellRight.name]) {
                    visited[cellRight.name] = true;
                    result.push(cellRight);
                    queue.push(cellRight);
                }
            }
            if (cell.down) {
                let cellDown = this.layout[cell.row + 1][cell.col];
                if (cellDown.type === 'room' && !visited[cellDown.name]) {
                    visited[cellDown.name] = true;
                    result.push(cellDown);
                    queue.push(cellDown);
                }
            }
            if (cell.left) {
                let cellLeft = this.layout[cell.row][cell.col - 1];
                if (cellLeft.type === 'room' && !visited[cellLeft.name]) {
                    visited[cellLeft.name] = true;
                    result.push(cellLeft);
                    queue.push(cellLeft);
                }
            }
        }
        return result;
    }
}