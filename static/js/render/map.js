class Map {
    static radius = 5;

    constructor(data) {
        this.data = data;
    }

    _xMin() {
        return Math.min(...this.data.map(star => star.x));
    }

    _xMax() {
        return Math.max(...this.data.map(star => star.x));
    }

    _yMin() {
        return Math.min(...this.data.map(star => star.y));
    }

    _yMax() {
        return Math.max(...this.data.map(star => star.y));
    }

    _viewBox() {
        const xMin = this._xMin();
        const xMax = this._xMax();
        const yMin = this._yMin();
        const yMax = this._yMax();
        return `${[
            xMin,
            yMin,
            xMax - xMin + Map.radius * 2,
            yMax - yMin + Map.radius * 2,
        ]}`;
    }

    static _renderStar(svg) {
        svg
            .attr('x', star => star.x)
            .attr('y', star => star.y);
        svg
            .append('title')
            .text(star => star.name);
        svg
            .filter(star => star.starbase_level && star.starbase_level > 0)
            .append('rect')
            .attr('width', this.radius * 2)
            .attr('height', this.radius * 2)
            .attr('fill', star => star.color1);
        svg
            .filter(star => star.starbase_level === 0)
            .append('circle')
            .attr('r', this.radius)
            .attr('cx', this.radius)
            .attr('cy', this.radius)
            .attr('fill', star => star.color1);
        svg
            .append('circle')
            .attr('r', this.radius - 2)
            .attr('cx', this.radius)
            .attr('cy', this.radius)
            .attr('fill', star => star.color0);
    }

    renderTo(selector) {
        $(selector).html('');

        const map = d3.select(selector);

        const innerSvg = map.append('svg')
            .attr('viewBox', this._viewBox());

        innerSvg
            .selectAll('svg')
            .data(this.data)
            .enter()
            .append('svg')
            .call(svg => Map._renderStar(svg));
    }

    static renderCallback(selector) {
        return data => {
            const gamestate = new Gamestate(data);
            const serializedData = BaseMapObject.serializeList(gamestate.starList());
            const map = new Map(serializedData);
            map.renderTo(selector);
        };
    }
}
