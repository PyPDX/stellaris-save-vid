class Empire extends BaseIdMapObject {
    // --- data fields ---

    color(i) {
        return Colors.get(stripString(this._data.flag.colors[i]));
    }

    name() {
        return stripString(this._data.name);
    }

    // --- reference fields ---
}
