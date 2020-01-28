import Grid from "./grid";
import Zombie from "../piece/zombie";
import Player from "../piece/player";

export default class Board {
    constructor(preset) { 
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.grid = new Grid(preset, this.ctx);

        this.zombies = [];
        this.players = [];

        this.placePlayers(30, 350, 3, 0,);
        this.spawnZombie(130,10, 0, 1)
        this.spawnZombie(150,10, 0, 1)
        this.spawnZombie(10,210, 2, 0)

        this.animate = this.animate.bind(this);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
        this.frame = requestAnimationFrame(this.animate);
        this.clear();
        this.grid.draw();
        this.zombies.forEach(zombie => zombie.draw());
        this.players.forEach(player => player.draw());
    }

    placePlayers(x, y, gridX, gridY) {
        const player = new Player(x, y, gridX, gridY, this.ctx, 'slayer');
        this.grid.layout[gridX][gridY].add(player);
        this.players.push(player);
    }

    spawnZombie(x, y, gridX, gridY) {
        let zombie = new Zombie(x, y, gridX, gridY, this.ctx, this.grid);
        this.grid.layout[gridX][gridY].add(zombie);
        this.zombies.push(zombie);
    }

    nextDirection(startRow, startCol, endRow, endCol) {
        return this.grid.makeGraphAndPath(this.grid.layout[startRow][startCol], this.grid.layout[endRow][endCol])
    }

    nextTurn() {
        let layout = this.grid.layout
        for (let row = 0; row < layout.length; row++) {
            for (let col = 0; col < layout[0].length; col++) {
                let cell = layout[row][col];
                if (cell.zombies.length > 0) {
                    this.zombies.forEach(zombie => {
                        zombie.reset();
                    })
                }
            }
        }
    }

    moveZombies(endRow, endCol) {
        let layout = this.grid.layout
        for (let row = 0; row < layout.length; row++) {
            for (let col = 0; col < layout[0].length; col++) {
                let cell = layout[row][col];
                if (cell.zombies.length > 0) {
                    let direction = this.nextDirection(row, col, endRow, endCol);
                    let length = cell.zombies.length;

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
}
