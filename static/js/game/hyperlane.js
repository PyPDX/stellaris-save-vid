class Hyperlane extends BaseMapObject {
    constructor(type, data, gamestate) {
        super(data, gamestate);
        this._type = type;
    }

    star0() {
        return this._gamestate.stars[this._data[0]];
    }

    star1() {
        return this._gamestate.stars[this._data[1]];
    }

    color() {
        switch (this._type) {
            case 'hyperlane':
                return 'black';
            case 'wormhole':
                return 'pink';
            default:
                return 'red';
        }
    }

    _serialize_self() {
        return {
            color: this.color(),
            x1: this.star0().x(),
            y1: this.star0().y(),
            x2: this.star1().x(),
            y2: this.star1().y(),
        };
    }

    static fromStars(stars, gamestate) {
        return Object.entries(stars)
            .map(([id0, star]) =>
                star.hyperlaneTo()
                    .filter(id1 => id1 > id0)
                    .map(id1 => [id0, id1]))
            .flat(1)
            .map(data => new Hyperlane('hyperlane', data, gamestate))
            ;
    }

    static fromWormholes(wormholes, gamestate) {
        return Wormhole.pairs(wormholes)
            .map(([wh0, wh1]) => [wh0.starId(), wh1.starId()])
            .map(data => new Hyperlane('wormhole', data, gamestate))
            ;
    }

    static fromGamestate(gamestate) {
        return [
            ...this.fromWormholes(gamestate.wormholes, gamestate),
            ...this.fromStars(gamestate.stars, gamestate),
        ];
    }
}
