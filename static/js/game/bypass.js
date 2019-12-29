class Bypass extends BaseIdMapObject {
    static TYPE_WORMHOLE = 'wormhole';
    static TYPE_GATEWAY = 'gateway';
    static TYPE_LGATE = 'lgate';

    // --- data fields ---

    type() {
        return stripString(this._data.type);
    }

    // --- reference fields ---

    linkId() {
        return this._data.linked_to;
    }

    link() {
        return this.linkId() && this._gamestate.bypasses[this.linkId()];
    }
}
