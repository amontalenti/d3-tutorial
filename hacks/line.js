jQuery(function() { 
//var data  = d3.range(50);
var data  = d3.range(50).map(function() { return Math.random() });
//var data  = d3.range(50).map(function(x) { return x*x });
//var data  = d3.range(50).map(function(x) { return x*x*x });
var w = 700;
var h = 300;
var max   = d3.max(data);
// Scales
var x  = d3.scale.linear().domain([0, data.length - 1]).range([0, w]);
var y  = d3.scale.linear().domain([0, max]).range([h, 0]);
// Base layer
var vis = d3.select('#chart')
            .append('svg:svg')
            .attr('width', w)
            .attr('height', h);
// Draw path
vis.selectAll('path.line')
    .data([data])
    .enter()
    .append("svg:path")
    .attr("d", 
        d3.svg.line()
       .x(function (d, i) { return x(i) })
       .y(y)
    );
});
