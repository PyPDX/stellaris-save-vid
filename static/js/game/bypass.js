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
        return this._gamestate.bypasses[this.linkId()];
    }

    wormholeId() {
        return this._gamestate.bypassWormholeIdMap[this.id];
    }

    wormhole() {
        return this._gamestate.wormholes[this.wormholeId()];
    }
}
