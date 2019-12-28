class Gamestate {
    constructor(data) {
        this._data = data;

        this.stars = BaseMapObject.loadDict(Star, this._data.galactic_object, this);
        this.empires = BaseMapObject.loadDict(Empire, this._data.country, this);
        this.starbases = BaseMapObject.loadDict(Starbase, this._data.starbases, this);
    }

    starList() {
        return Object.values(this.stars);
    }
}
