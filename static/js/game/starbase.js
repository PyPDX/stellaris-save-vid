class Starbase extends BaseMapObject {
    static levels = null;

    empire() {
        return this._gamestate.empires[this._data.owner];
    }

    level() {
        return Starbase.levels[stripString(this._data.level)];
    }

    _serialize_self() {
        return {
            starbase_level: this.level(),
        };
    }

    serialize() {
        return this._serialize_with(this.empire());
    }
}

$.get('static/data/starbase_levels.json')
    .done(function (response) {
        Starbase.levels = response;
    });
