function resize(size, selector) {
    d3.select(selector)
        .attr('width', size)
        .attr('height', size)
    ;
}

function zoom(multiplier, selector) {
    const map = d3.select(selector);
    const size = map.attr('width');
    resize(size * multiplier, selector);
}

function resetZoom(selector) {
    resize(window.innerWidth, selector);
}

$(() => {
    resetZoom('#map');
});
