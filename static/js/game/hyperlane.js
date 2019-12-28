class Hyperlane extends BaseMapObject {
    star0() {
        return this._gamestate.stars[this._data[0]];
    }

    star1() {
        return this._gamestate.stars[this._data[1]];
    }

    _serialize_self() {
        return {
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
            .map(data => new Hyperlane(data, gamestate))
            ;
    }

    static fromGamestate(gamestate) {
        return this.fromStars(gamestate.stars, gamestate);
    }
}
