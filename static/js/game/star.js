class Star extends BaseIdMapObject {
    // --- data fields ---

    name() {
        return stripString(this._data.name);
    }

    x() {
        return -this._data.coordinate.x;
    }

    y() {
        return this._data.coordinate.y;
    }

    _serialize_self() {
        return {
            name: this.name(),
            x: this.x(),
            y: this.y(),
        };
    }

    // --- reference fields ---

    hyperlaneTo() {
        if (!this._data.hyperlane)
            return [];
        return this._data.hyperlane.map(val => val.to);
    }

    starbaseId() {
        return this._data.starbase;
    }

    starbase() {
        return this._gamestate.starbases[this.starbaseId()];
    }

    serialize() {
        return this._serialize_with(
            this.starbase(),
        );
    }
}
