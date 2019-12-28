class Gamestate {
    constructor(data) {
        this._data = data;

        this.stars = BaseMapObject.loadDict(Star, this._data.galactic_object, this);
        this.empires = BaseMapObject.loadDict(Empire, this._data.country, this);
        this.starbases = BaseMapObject.loadDict(Starbase, this._data.starbases, this);
        this.bypasses = BaseMapObject.loadDict(Bypass, this._data.bypasses, this);
        this.wormholes = BaseMapObject.loadDict(Wormhole, this._data.natural_wormholes, this);
    }

    starList() {
        return Object.values(this.stars);
    }

    hyperlanes() {
        return Hyperlane.fromGamestate(this);
    }
}
