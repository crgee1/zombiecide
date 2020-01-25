import Cell from "./cell";

export default class Board {
    constructor(preset, row = null, col = null) {
        this.grid = [];
        this.preset = preset;
        if (row && col) {
            for (let i = 0; i < row; i++) {
                let rowArr = new Array(col).fill(new Cell());
                this.grid.push(rowArr);
            }
        } else {
            this.setUp()
        }
    }

    setUp() {
        switch (this.preset) {
            case 1:
                this.preset1();
                break;
        
            default:
                break;
        }
    }

    preset1() {
        let row1 = [this.constructCell('fftf'), this.constructCell('fftf')]
        let row2 = [this.constructCell('tftf'), this.constructCell('tftf')]
        let row3 = [this.constructCell('fttf'), this.constructCell('tfft')]
        let row4 = [this.constructCell('tfff'), this.constructCell('ffff')]
        this.grid = [row1, row2, row3, row4];
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
                default:
                    break;
            }
        }) 
        return new Cell(...input)
    }
}