class Map {
    static radius = 5;

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
            xMin - Map.radius,
            yMin - Map.radius,
            xMax - xMin + Map.radius * 2,
            yMax - yMin + Map.radius * 2,
        ]}`;
    }

    static _renderStar(svg) {
        svg
            .attr('x', star => star.x)
            .attr('y', star => star.y)
            .attr('overflow', 'visible')
        ;
        svg
            .append('title')
            .text(star => star.name)
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
            .attr('r', this.radius - 2)
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('fill', star => star.color0)
        ;
    }

    static _renderHyperlane(line) {
        line
            .attr('stroke', 'black')
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
            const gamestate = new Gamestate(data);
            const stars = BaseMapObject.serializeList(gamestate.starList());
            const hyperlanes = BaseMapObject.serializeList(gamestate.hyperlanes());
            const map = new Map(stars, hyperlanes);
            map.renderTo(selector);
        };
    }
}
