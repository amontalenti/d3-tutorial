jQuery(function() { 
//var data  = d3.range(50);
//var data  = d3.range(50).map(function() { return Math.random() });
//var data  = d3.range(50).map(function(x) { return x*x });
var data  = d3.range(50).map(function(Z) { return Z*Z*Z });
data.reverse();
var w = 700;
var x  = d3.scale.linear().domain([0, d3.max(data)]).range([0, w]);
d3.select("#chart").data(data)
    .enter().append("div")
        .attr("class", "bar")
        .style("width", function(d) { return x(d) + "px"; })
        .text(function(d) { return d; });
});
