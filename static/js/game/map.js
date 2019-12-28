function drawMap(selector) {
    const radius = 5;
    const map = d3.select(selector);

    function callback(data) {
        $(selector).html('');
        console.log(data);

        const empires = data.country;
        const starbases = data.starbases;
        const stars = data.galactic_object;

        const getCoordX = star => -star.coordinate.x;
        const getCoordY = star => star.coordinate.y;
        const getName = star => stripString(star.name);
        const getStarbase = star => {
            return starbases[star.starbase];
        };
        const getStarbaseLevel = star => {
            let starbase = getStarbase(star);
            return starbase && stripString(starbase.level);
        };
        const isStarbaseUpgraded = star => {
            let level = getStarbaseLevel(star);
            return level && level !== 'starbase_level_outpost';
        };
        const getEmpire = star => {
            let starbase = getStarbase(star);
            return starbase && empires[starbase.owner];
        };
        const getColor = i => star => {
            let empire = getEmpire(star);
            return empire && getMapColor(stripString(empire.flag.colors[i]));
        };

        const xMin = Math.min(...Object.values(stars).map(getCoordX));
        const xMax = Math.max(...Object.values(stars).map(getCoordX));
        const yMin = Math.min(...Object.values(stars).map(getCoordY));
        const yMax = Math.max(...Object.values(stars).map(getCoordY));

        const innerSvg = map.append('svg')
            .attr('viewBox', `${xMin} ${yMin} ${xMax - xMin + radius * 2} ${yMax - yMin + radius * 2}`);

        function addStar(svg) {
            svg
                .attr('x', getCoordX)
                .attr('y', getCoordY);
            svg.append('title')
                .text(getName);
            svg
                .filter(isStarbaseUpgraded)
                .append('rect')
                .attr('width', radius * 2)
                .attr('height', radius * 2)
                .attr('fill', getColor(1));
            svg
                .filter(star => getStarbase(star) && !isStarbaseUpgraded(star))
                .append('circle')
                .attr('r', radius)
                .attr('cx', radius)
                .attr('cy', radius)
                .attr('fill', getColor(1));
            svg.append('circle')
                .attr('r', radius - 2)
                .attr('cx', radius)
                .attr('cy', radius)
                .attr('fill', getColor(0));
        }

        innerSvg
            .selectAll('svg')
            .data(Object.values(stars))
            .enter()
            .append('svg')
            .call(addStar);
    }

    return callback;
}
