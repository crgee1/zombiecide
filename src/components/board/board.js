import Grid from "./grid";
import Zombie from "../piece/zombie";
import Player from "../piece/player";
import Blood from "../piece/blood";
import Spawn from "../piece/spawn";
import SpawnDeck from "../deck/spawn_deck";

export default class Board {
    constructor(preset, players, ctx) { 
        this.canvas = document.getElementById('canvas');
        this.ctx = ctx;
        this.grid = new Grid(preset, this.ctx);
        this.spawnDeck = new SpawnDeck();
        this.zombies = [];
        this.bloods = [];
        this.spawns = [];
        this.objectives = [];
        this.players = players;
        this.setup(preset);
        this.playerIdx = 0;
        
        players.forEach(player => this.grid.layout[player.row][player.col].add(player))
        this.animate = this.animate.bind(this);
    }

    setup(preset) {
        this.grid = new Grid(preset, this.ctx);

        switch (preset) {
            case 1:
                this.preset1()
                break;
            case 2:
                this.preset2()
                break;
            case 3:
                this.preset3()
                break;
            default:
                break;
        }
    }

    preset1() {
        this.spawnZombie(0, 1);
        this.spawnZombie(0, 1);
        this.spawnZombie(2, 0);
        this.placePlayers(30, 350, 3, 0);
    }

    preset2() {
        this.spawnZombie(340,3);
        this.spawnZombie(370,3);
        this.spawnZombie(250,2);
        this.spawnZombie(320,380,3,3);
    }

    preset3() {
        // this.spawnZombie(4,2);
        // this.spawnZombie(2,3);
        // this.spawnZombie(2,2);
        // this.spawnZombie(3,4);
        this.spawnSpawn(6,4);
        this.spawnSpawn(0,2);
        this.spawnSpawn(2,5);
        this.spawnSpawn(4,0);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
        this.frame = requestAnimationFrame(this.animate);
        this.clear();
        this.grid.draw();
        this.spawns.forEach(spawn => spawn.draw());
        this.zombies.forEach(zombie => zombie.draw());
        this.players.forEach(player => player.draw());
        this.bloods.forEach(blood => blood.draw());
    }

    spawnZombies() {
        let highestLevel = this.players.reduce((acc, player) => {
            return acc > player.level ? acc : player.level;
        });

        this.spawns.forEach(spawn => {
            let card = this.spawnDeck.draw();
            let result = card.actions[String(highestLevel)];
            if (result.length > 0) {
                this.zombies.push(...spawn.spawnZombie(result[0], result[1]));
            }
        });
    }

    roomSpawns(startCell) {
        if (startCell.type === 'street') return;
        let highestLevel = this.players.reduce((acc, player) => {
            return acc > player.level ? acc : player.level;
        });

        let rooms = this.grid.connectingRooms(startCell);
        rooms = rooms.map(cell => new Spawn(cell.row, cell.col, this.ctx, this.grid))
        rooms.forEach(spawn => {
            let card = this.spawnDeck.draw();
            let result = card.actions[String(highestLevel)];
            if (result.length > 0) {
                this.zombies.push(...spawn.spawnZombie(result[0], result[1]));
            }
        });
    }

    placePlayers(x, y, row, col, name) {
        const player = new Player(x, y, row, col, this.ctx, name);
        this.grid.layout[row][col].add(player);
        this.players.push(player);
    }

    spawnZombie(row, col, type = 'walker') {
        let randomX = Math.random() * 80 + 10 + col * 100;
        let randomY = Math.random() * 80 + 10 + row * 100;
        let zombie = new Zombie(randomX, randomY, row, col, this.ctx, this.grid, type);
        this.grid.layout[row][col].add(zombie);
        this.zombies.push(zombie);
    }

    spawnSpawn(row, col) {
        let spawn = new Spawn(row, col, this.ctx, this.grid);
        this.spawns.push(spawn);
    }

    activePlayer() {
        return this.players[this.playerIdx];
    }

    nextTurn() {
        this.zombies.forEach(zombie => zombie.reset());
        this.bloods = [];
        this.resetNoise();
        this.spawnZombies();
    }

    moveZombies() {
        let layout = this.grid.layout;
        for (let row = 0; row < layout.length; row++) {
            for (let col = 0; col < layout[0].length; col++) {
                let cell = layout[row][col];
                let length = cell.zombies.length;
                if (length > 0) {
                    let target = this.findTarget(cell);
                    let start = this.grid.layout[row][col];
                    let end = this.grid.layout[target.row][target.col]
                    let direction = this.grid.nextDirection(start, end);
    
                    switch (direction) {
                        case 'up':
                            for (let i = 0; i < length; i++) {
                                cell.zombies[0].moveUp()
                            }
                            break;
                        case 'right':
                            for (let i = 0; i < length; i++) {
                                cell.zombies[0].moveRight()
                            }
                            break;
                        case 'down':
                            for (let i = 0; i < length; i++) {
                                cell.zombies[0].moveDown()
                            }
                            break;
                        case 'left':
                            for (let i = 0; i < length; i++) {
                                cell.zombies[0].moveLeft()
                            }
                            break;
                        case 'attack':
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }

    findTarget(startCell) {
        if (startCell.players.length > 0) return startCell;
        let loudestSeenCell = this.returnLoudestSeenCell(startCell);
        return !loudestSeenCell ? this.returnLoudestCell() : loudestSeenCell;
    }

    returnLoudestCell() {
        let loudestCell = this.grid.layout[0][0];
        for (let row = 0; row < this.grid.rows; row++) {
            for (let col = 0; col < this.grid.cols; col++) {
                let cell = this.grid.layout[row][col];
                if (cell.calculateNoise() > loudestCell.calculateNoise()) loudestCell = cell;
            }
        }
        return loudestCell;
    }

    returnLoudestSeenCell(startCell) {
        let loudestSeenCell = null;
        let row = startCell.row;
        let col = startCell.col;
        let up = startCell.up;
        let right = startCell.right;
        let down = startCell.down;
        let left = startCell.left;

        while (up) {
            row--;
            let cell = this.grid.layout[row][col];
            if (cell.calculateNoise() > 0) {
                if (!loudestSeenCell || cell.calculateNoise() > loudestSeenCell.calculateNoise()) {
                    loudestSeenCell = cell;
                }
            }
            up = cell.up;
        }
        row = startCell.row;

        while (right) {
            col++;
            let cell = this.grid.layout[row][col];
            if (cell.calculateNoise() > 0) {
                if (!loudestSeenCell || cell.calculateNoise() > loudestSeenCell.calculateNoise()) {
                    loudestSeenCell = cell;
                }
            }
            right = cell.right;
        }
        col = startCell.col;

        while (down) {
            row++;
            let cell = this.grid.layout[row][col];
            if (cell.calculateNoise() > 0) {
                if (!loudestSeenCell || cell.calculateNoise() > loudestSeenCell.calculateNoise()) {
                    loudestSeenCell = cell;
                }
            }
            down = cell.down;
        }
        row = startCell.row;

        while (left) {
            col--;
            let cell = this.grid.layout[row][col];
            if (cell.calculateNoise() > 0) {
                if (!loudestSeenCell || cell.calculateNoise() > loudestSeenCell.calculateNoise()) {
                    loudestSeenCell = cell;
                }
            }
            left = cell.left;
        }

        return loudestSeenCell;
    }

    withinRange(minRange, maxRange, row, col) {
        let distance = minRange;
        let startCell = this.grid.layout[row][col];
        let cellArr = minRange === 0 ? [startCell] : [];

        if (maxRange > 0 && startCell.up && startCell.up !== 'doorClose') {
            let upCell = this.grid.layout[row-minRange][col];
            while (distance <= maxRange && upCell) {
                if (distance > 0) cellArr.push(upCell);
                distance++;
                upCell = (upCell.up && upCell.up !== 'doorClose') ? this.grid.layout[upCell.row - 1][col] : null;
            }
        }
        distance = minRange
        if (maxRange > 0 && startCell.right && startCell.right !== 'doorClose') {
            let rightCell = this.grid.layout[row][col+minRange];
            while (distance <= maxRange && rightCell) {
                if (distance > 0) cellArr.push(rightCell);
                distance++;
                rightCell = (rightCell.right && rightCell.right !== 'doorClose') ? this.grid.layout[row][rightCell.col+1] : null;
            }
        }
        distance = minRange
        if (maxRange > 0 && startCell.down && startCell.down !== 'doorClose') {
            let downCell = this.grid.layout[row+minRange][col];
            while (distance <= maxRange && downCell) {
                if (distance > 0) cellArr.push(downCell);
                distance++;
                downCell = (downCell.down && downCell.down !== 'doorClose') ? this.grid.layout[downCell.row + 1][col] : null;
            }
        }
        distance = minRange
        if (maxRange > 0 && startCell.left && startCell.left !== 'doorClose') {
            let leftCell = this.grid.layout[row][col-minRange];
            while (distance <= maxRange && leftCell) {
                if (distance > 0) cellArr.push(leftCell);
                distance++;
                leftCell = (leftCell.left && leftCell.left !== 'doorClose') ? this.grid.layout[row][leftCell.col - 1] : null;
            }
        }
        return cellArr;
    }

    killZombies() {
        for (let i = 0; i < this.zombies.length; i++) {
            let zombie = this.zombies[i];
            if (zombie.targeted) {
                this.grid.layout[zombie.row][zombie.col].killZombies();
                this.bloods.push(new Blood(zombie.posX, zombie.posY, zombie.row, zombie.col, this.ctx, this.grid));
                this.zombies.splice(i,1);
                i--;
            }
        }
    }

    resetNoise() {
        this.grid.layout.forEach(row => {
            row.forEach(cell => {
                cell.resetNoise();
            })
        })
    }

    resetTargeted() {
        this.zombies.forEach(zombie => {
            zombie.targeted = false;
        })
    }
}
