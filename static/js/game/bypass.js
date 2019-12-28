class Bypass extends BaseMapObject {
    static TYPE_WORMHOLE = 'wormhole';
    static TYPE_GATEWAY = 'gateway';
    static TYPE_LGATE = 'lgate';

    type() {
        return stripString(this._data.type);
    }

    linkId() {
        return this._data.linked_to;
    }

    link() {
        return this.linkId() && this._gamestate.bypasses[this.linkId()];
    }
}
