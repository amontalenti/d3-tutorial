jQuery(function() { 
//var data  = d3.range(50);
//var data  = d3.range(50).map(function() { return Math.random() });
//var data  = d3.range(50).map(function(x) { return x*x });
var data  = d3.range(30).map(function(x) { return x*x*x });
data.reverse();
var w = 800;
var h = 400;
var colors = d3.scale.category20c();

var barHeight = 20;
var x  = d3.scale.linear().domain([0, d3.max(data)]).range([0, w]);
var y = d3.scale.ordinal().domain(data).rangeBands([0, h])

var chart = d3.select("#chart")
    .append("svg:svg")
        .attr("class", "chart")
        .attr("width", w)
        .attr("height", h)
    .append("svg:g")
        .attr("transform", "translate(10, 15)");
    

// draw the rectangles
chart.selectAll("rect")
    .data(data)
.enter().append("svg:rect")
    .attr("width", x)
    //.attr("y", function(d, i) { return i * barHeight; })
    //.attr("height", barHeight)
    // STEP: now try making the chart smaller
    .attr("y", y)
    .attr("height", y.rangeBand())
    // even spacing
    //.attr("height", barHeight)
    .style("fill", colors);

// draw some marks
chart.selectAll("line")
    .data(x.ticks(10))
.enter().append("svg:line")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", 0)
    .attr("y2", h)
    .attr("stroke", "#ddd");

// draw some labels for the marks
chart.selectAll("text.rule")
    .data(x.ticks(10))
.enter().append("svg:text")
    .attr("class", "rule")
    .attr("x", x)
    .attr("y", 0)
    .attr("dy", -3)
    .attr("text-anchor", "middle")
    .text(function(d) { return d / 1000 + "k"; } );
});
