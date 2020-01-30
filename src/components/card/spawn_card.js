export default class SpawnCard {
    constructor(id, actions, action = 'spawn', manhole = false) {
        this.id = id;
        this.actions = actions;
        this.action = action;
        this.manhole = manhole;
    }
} 