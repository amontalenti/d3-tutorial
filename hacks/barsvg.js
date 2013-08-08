jQuery(function() { 
//var data  = d3.range(50);
//var data  = d3.range(50).map(function() { return Math.random() });
// var data  = d3.range(50).map(function(x) { return x*x });
var data = [   816641,    830462,    872849,   1017778,   1031327,   1094067,
         1237090,   1628052,   2011511,   4929414,   5654235,   6675601,
         7449484,   8682834,   8761231,  10268467,  13279482,  14253116,
        16001234,  28013699,  33892766,  41323947,  51386513,  73492651,
       235993615];
var labels = ['google sites', 'facebook', 'outbrain', 'yahoo', 'parse.ly sites', 
't.co', 'msn', 'drudgereport', 'bing', 'pinterest', 'stumbleupon',
'reddit', 'feedly', 'news sites', 'tmz', 'aol', 'fark', 'digg', 'danarimedia',
'buzzfeed', 'ask', 'tinyurl', 'taboola', 'pulse.me', 'realclearpolitics'];

//var data  = d3.range(30).map(function(x) { return x*x*x });
data.reverse();
var w = 1000;
var h = 500;
var offset = 10;

var colors = d3.scale.category20c();

var x  = d3.scale.linear().domain([0, d3.max(data)]).range([0, w - offset]);
var y = d3.scale.ordinal().domain(data).rangeBands([0, h])

var chart = d3.select("#chart")
    .append("svg:svg")
        .attr("class", "chart")
        .attr("width", w + 300)
        .attr("height", h + offset)
    .append("svg:g")
        .attr("transform", "translate(10, 15)");
    

// draw the rectangles
chart.selectAll("rect")
    .data(data)
.enter().append("svg:rect")
    .attr("width", x)
    .attr("height", y.rangeBand())
    .attr("y", y)
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

/*
chart.selectAll("line").
    data(y)
.enter().append("svg:line")
    .attr("x1", 0)
    .attr("x2", w)
    .attr("y1", y)
    .attr("y2", y)
    .attr("stroke", "#ddd");
*/

// draw some labels for the marks
chart.selectAll("text.rule")
    .data(x.ticks(10))
.enter().append("svg:text")
    .attr("class", "rule")
    .attr("x", x)
    .attr("y", 0)
    .attr("dy", -3)
    .attr("text-anchor", "middle")
    .text(function(d) { return d / 1000000 + "m"; } );

window.y = y;

chart.selectAll("text.label")
    .data(labels)
.enter().append("svg:text")
    .attr("class", "label")
    .attr("x", w + offset)
    .attr("y", function(d) { return y(d) + offset })
    .attr("height", y.rangeBand())
    .attr("text-anchor", "left")
    .text(function(d) { return d; } );
});
