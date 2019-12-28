class BaseMapObject {
    static loadDict(cls, data, ...args) {
        return Object.fromEntries(Object.entries(data).map(([id, val]) => [id, new cls(val, ...args)]));
    }

    static loadList(cls, data, ...args) {
        return data.map(val => new cls(val, ...args));
    }

    constructor(data, gamestate) {
        this._data = data;
        this._gamestate = gamestate;
    }

    serialize() {
        return this._serialize_with();
    }

    _serialize_self() {
        return {};
    }

    _serialize_with(...others) {
        const result = this._serialize_self();

        for (const other of others) {
            if (!other)
                continue;
            Object.assign(result, other.serialize());
        }

        return result;
    }

    static serializeList(data) {
        return Object.values(data).map(item => item.serialize());
    }
}
