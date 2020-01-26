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

        this.placePlayers();
        this.spawnZombie(130,10, 1 , this.ctx)

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

    placePlayers() {
        const player = new Player(30, 350, this.ctx, 'slayer')
        this.players.push(player)
    }

    spawnZombie(x, y) {
        let zombie = new Zombie(x, y, this.ctx);
        this.zombies.push(zombie);
    }
}
