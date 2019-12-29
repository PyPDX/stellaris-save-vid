class BaseMapObject {
    constructor(data, gamestate) {
        this._data = data;
        this._gamestate = gamestate;
    }

    _serialize_data() {
        return {};
    }

    _serialize_reference_data() {
        return {};
    }

    serialize() {
        return {
            ...this._serialize_data(),
            ...this._serialize_reference_data(),
        };
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

    _serialize_id() {
        return {
            id: this.id,
        };
    }

    serialize() {
        return {
            id: this.id,
            ...super.serialize(),
        };
    }
}
