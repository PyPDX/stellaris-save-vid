class BaseMapObject {
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

    static serializeList(objects) {
        return Object.values(objects)
            .map(item => item.serialize())
            ;
    }
}

class BaseIdMapObject extends BaseMapObject {
    static loadDict(cls, data, ...args) {
        return Object.fromEntries(
            Object.entries(data)
                .map(([id, val]) => [id, new cls(id, val, ...args)]),
        );
    }

    constructor(id, data, gamestate) {
        super(data, gamestate);
        this.id = id;
    }
}
