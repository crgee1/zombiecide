export default class Item {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    remove() {
        this.owner = null;
        return this.owner.remove(this);
    }
}