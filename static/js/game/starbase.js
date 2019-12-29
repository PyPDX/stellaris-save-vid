class Starbase extends BaseIdMapObject {
    static levels = null;

    // --- data fields ---

    level() {
        return Starbase.levels[stripString(this._data.level)];
    }

    _serialize_self() {
        return {
            starbase_level: this.level(),
        };
    }

    // --- reference fields ---

    starId() {
        return this._data.system;
    }

    star() {
        return this._gamestate.stars[this.starId()];
    }

    empireId() {
        return this._data.owner;
    }

    empire() {
        return this._gamestate.empires[this.empireId()];
    }

    serialize() {
        return this._serialize_with(this.empire());
    }
}

$.get('static/data/starbase_levels.json')
    .done(function (response) {
        Starbase.levels = response;
    })
;
