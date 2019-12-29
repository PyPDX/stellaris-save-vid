class Hyperlane extends BaseMapObject {
    constructor(type, data, gamestate) {
        super(data, gamestate);
        this._type = type;
    }

    // --- data fields ---

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

    _serialize_data() {
        return {
            color: this.color(),
        };
    }

    // --- reference fields ---

    star0Id() {
        return this._data[0];
    }

    star0() {
        return this._gamestate.stars[this.star0Id()];
    }

    star1Id() {
        return this._data[1];
    }

    star1() {
        return this._gamestate.stars[this.star1Id()];
    }

    _serialize_reference_data() {
        return {
            x1: this.star0().x(),
            y1: this.star0().y(),
            x2: this.star1().x(),
            y2: this.star1().y(),
        };
    }

    static fromStars(stars, gamestate) {
        return Object.values(stars)
            .map(star =>
                star.linkIds()
                    .filter(id1 => id1 > star.id)
                    .map(id1 => [star.id, id1]))
            .flat(1)
            .map(data => new Hyperlane('hyperlane', data, gamestate))
            ;
    }

    static fromWormholes(wormholes, gamestate) {
        return Object.values(wormholes)
            .filter(wh => wh.linkId() > wh.id)
            .map(wh => [wh.starId(), wh.link().starId()])
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
