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

    _serialize_data() {
        return {
            name: this.name(),
            x: this.x(),
            y: this.y(),
        };
    }

    // --- reference fields ---

    linkIds() {
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

    _serialize_reference_data() {
        const result = {};

        const starbase = this.starbase();
        if (starbase) {
            result.starbase_level = starbase.level();
        }

        const empire = this.empire();
        if (empire) {
            result.color0 = empire.color(0);
            result.color1 = empire.color(1);
        }

        return result;
    }

    // --- related ---

    empireId() {
        return this.starbase() && this.starbase().empireId();
    }

    empire() {
        return this._gamestate.empires[this.empireId()];
    }
}
