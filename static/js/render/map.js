class Map {
    static padding = 20;
    static innerRadius = 2;
    static radius = 3;

    constructor(stars, hyperlanes) {
        this.stars = stars;
        this.hyperlanes = hyperlanes;
    }

    _xMin() {
        return Math.min(...this.stars.map(star => star.x));
    }

    _xMax() {
        return Math.max(...this.stars.map(star => star.x));
    }

    _yMin() {
        return Math.min(...this.stars.map(star => star.y));
    }

    _yMax() {
        return Math.max(...this.stars.map(star => star.y));
    }

    _viewBox() {
        const xMin = this._xMin();
        const xMax = this._xMax();
        const yMin = this._yMin();
        const yMax = this._yMax();
        return `${[
            xMin - Map.padding,
            yMin - Map.padding,
            xMax - xMin + Map.padding * 2,
            yMax - yMin + Map.padding * 2,
        ]}`;
    }

    static _renderPrecursors(svg) {
        for (let i = 0; i < Object.keys(Star.precursorNames).length; i++) {
            svg
                .filter(star => star.precursors.length > i)
                .append('circle')
                .attr('r', 1)
                .attr('cx', this.radius + 1 + Math.floor(i / 3))
                .attr('cy', -2 + (i % 3) * 2)
                .attr('fill', star => star.precursors[i].color)
            ;
        }
    }

    static _renderStar(svg) {
        svg
            .attr('x', star => star.x)
            .attr('y', star => star.y)
            .attr('overflow', 'visible')
        ;
        svg
            .append('title')
            .text(star => star.tooltip)
        ;
        svg
            .call(svg => this._renderPrecursors(svg))
        ;
        svg
            .filter(star => star.starbase_level && star.starbase_level > 0)
            .append('rect')
            .attr('x', -this.radius)
            .attr('y', -this.radius)
            .attr('width', this.radius * 2)
            .attr('height', this.radius * 2)
            .attr('fill', star => star.color1)
        ;
        svg
            .filter(star => star.starbase_level === 0)
            .append('circle')
            .attr('r', this.radius)
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('fill', star => star.color1)
        ;
        svg
            .append('circle')
            .attr('r', this.innerRadius)
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('fill', star => star.color0)
        ;
    }

    static _renderHyperlane(line) {
        line
            .attr('stroke', hl => hl.color)
            .attr('x1', hl => hl.x1)
            .attr('y1', hl => hl.y1)
            .attr('x2', hl => hl.x2)
            .attr('y2', hl => hl.y2)
        ;
    }

    renderTo(selector) {
        $(selector).html('');

        const map = d3.select(selector);

        const innerSvg = map
            .append('svg')
            .attr('viewBox', this._viewBox())
        ;

        innerSvg
            .selectAll('line')
            .data(this.hyperlanes)
            .enter()
            .append('line')
            .call(line => Map._renderHyperlane(line))
        ;

        innerSvg
            .selectAll('svg')
            .data(this.stars)
            .enter()
            .append('svg')
            .call(svg => Map._renderStar(svg))
        ;
    }

    static renderCallback(selector) {
        return data => {
            const gamestate = new Gamestate(data.gamestate);
            const stars = BaseMapObject.serializeList(gamestate.starList());
            const hyperlanes = BaseMapObject.serializeList(gamestate.hyperlanes());
            const map = new Map(stars, hyperlanes);

            // debug
            window.stellaris = {
                data: data,
                gamestate: gamestate,
                map: map,
            };

            map.renderTo(selector);
        };
    }
}
