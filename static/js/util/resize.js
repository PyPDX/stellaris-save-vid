function resize(size, selector) {
    d3.select(selector)
        .attr('width', size)
        .attr('height', size)
    ;
}
