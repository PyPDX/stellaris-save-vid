class Gamestate {
    constructor(data) {
        this._data = data;

        this.stars = BaseIdMapObject.loadDict(Star, this._data.galactic_object, this);
        this.empires = BaseIdMapObject.loadDict(Empire, this._data.country, this);
        this.starbases = BaseIdMapObject.loadDict(Starbase, this._data.starbases, this);
        this.bypasses = BaseIdMapObject.loadDict(Bypass, this._data.bypasses, this);
        this.wormholes = BaseIdMapObject.loadDict(Wormhole, this._data.natural_wormholes, this);
    }

    starList() {
        return Object.values(this.stars);
    }

    hyperlanes() {
        return Hyperlane.fromGamestate(this);
    }
}
