class Wormhole extends BaseIdMapObject {
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

    static pairs(wormholes) {
        const reverse = Object.fromEntries(
            Object.entries(wormholes)
                .map(([id, wormhole]) => [wormhole.bypassId(), id]),
        );
        return Object.entries(wormholes)
            .map(([id, wormhole]) => [id, reverse[wormhole.bypass().linkId()]])
            .filter(([id0, id1]) => id0 < id1)
            .map(([id0, id1]) => [wormholes[id0], wormholes[id1]])
            ;
    }
}
