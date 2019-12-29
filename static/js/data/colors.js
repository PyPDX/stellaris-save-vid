class Colors {
    // https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL
    static hsv2hsl = (h, s, v, l = v - v * s / 2, m = Math.min(l, 1 - l)) => [h, m ? (v - l) / m : 0, l];

    static colors = null;

    static get(name) {
        const colorDefinition = this.colors.colors[name];
        if (!colorDefinition)
            return null;

        let method = colorDefinition.__modifiers__.map[0];
        let values = colorDefinition.map;
        if (method === 'hsv') {
            method = 'hsl';
            values = this.hsv2hsl(...values);
        }
        if (method === 'hsl') {
            values[1] = `${values[1] * 100}%`;
            values[2] = `${values[2] * 100}%`;
        }
        return `${method}(${values})`;
    }
}

$.get('static/data/colors.json')
    .done(response => {
        Colors.colors = response;
    })
;