class Star extends BaseMapObject {
    name() {
        return stripString(this._data.name);
    }

    x() {
        return -this._data.coordinate.x;
    }

    y() {
        return this._data.coordinate.y;
    }

    starbase() {
        return this._gamestate.starbases[this._data.starbase];
    }

    hyperlaneTo() {
        if (!this._data.hyperlane)
            return [];
        return this._data.hyperlane.map(val => val.to);
    }

    _serialize_self() {
        return {
            name: this.name(),
            x: this.x(),
            y: this.y(),
        };
    }

    serialize() {
        return this._serialize_with(
            this.starbase(),
        );
    }
}
