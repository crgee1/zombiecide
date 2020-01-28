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
        this.setup(preset)
        

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
            default:
                break;
        }
    }

    preset1() {
        this.spawnZombie(110, 10, 0, 1);
        this.spawnZombie(150, 10, 0, 1);
        this.spawnZombie(35, 260, 2, 0);
        this.placePlayers(30, 350, 3, 0);
        
    }

    preset2() {
        this.spawnZombie(310,110,1,3)
        this.spawnZombie(310,230,2,3)
        this.spawnZombie(250,230,2,2)
        this.spawnZombie(310,360,3,3)
        this.placePlayers(25, 207,2,0)
        this.placePlayers(325, 7,0,3)
        this.placePlayers(325, 427,4,3)
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

    findTarget(startCell) {
        // while()
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
