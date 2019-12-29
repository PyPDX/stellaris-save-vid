class Empire extends BaseIdMapObject {
    // --- data fields ---

    color(i) {
        return Colors.get(stripString(this._data.flag.colors[i]));
    }

    _serialize_self() {
        return {
            color0: this.color(0),
            color1: this.color(1),
        };
    }

    // --- reference fields ---
}
