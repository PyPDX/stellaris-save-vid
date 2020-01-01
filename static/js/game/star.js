class Star extends BaseIdMapObject {
    static precursorNames = null;

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

    precursorFlags() {
        if (!this._data.flags)
            return [];
        return Object.keys(this._data.flags)
            .filter(flag => flag in Star.precursorNames);
    }

    precursors() {
        return this.precursorFlags()
            .map(flag => Star.precursorNames[flag]);
    }

    tooltip() {
        let tooltip = `${this.name()} (ID: ${this.id})`;
        if (this.empire()) {
            tooltip += `\nOwner:\n  ${this.empire().name()}`;
        }
        if (this.precursors().length)
            tooltip += `\nPrecursors:`;
        for (const precursor of this.precursors())
            tooltip += `\n  ${precursor.name}`;
        return tooltip;
    }

    _serialize_data() {
        return {
            name: this.name(),
            x: this.x(),
            y: this.y(),
            precursors: this.precursors(),
            tooltip: this.tooltip(),
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

$.get('static/data/precursors.json')
    .done(response => {
        Star.precursorNames = response;
    });
