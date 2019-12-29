class Empire extends BaseIdMapObject {
    // --- data fields ---

    color(i) {
        return Colors.get(stripString(this._data.flag.colors[i]));
    }

    // --- reference fields ---
}
