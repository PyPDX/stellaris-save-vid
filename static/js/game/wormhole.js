class Wormhole extends BaseIdMapObject {
    // --- data fields ---

    // --- reference fields ---

    bypassId() {
        return this._data.bypass;
    }

    bypass() {
        return this._gamestate.bypasses[this.bypassId()];
    }

    starId() {
        return this._data.coordinate.origin;
    }

    star() {
        return this._gamestate.stars[this.starId()];
    }

    // --- related ---

    linkId() {
        return this.bypass().link().wormholeId();
    }

    link() {
        return this.bypass().link().wormhole();
    }
}
