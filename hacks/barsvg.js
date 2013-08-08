jQuery(function() { 
    //var data  = d3.range(50);
    //var data  = d3.range(50).map(function() { return Math.random() });
    //var data  = d3.range(50).map(function(x) { return x*x });
    //var data  = d3.range(30).map(function(x) { return x*x*x });

    // top referring sources
    var data, labels, width, height;
    data = [13279482, 14253116, 16001234, 18423838, 28014659, 39884685, 41323947, 51386513, 73492651, 235993615];
    labels = ['bing', 'drudgereport', 'msn', 'news sites*', 'twitter', 'parse.ly sites*', 'yahoo', 'outbrain', 'facebook', 'google sites*'];
    data.reverse();
    labels.reverse();
    width = 500;
    height = 200;

    hbar(data, labels, width, height, "#top_10_sources");

    data = [422972, 466632, 469748, 536714, 583382, 599269, 608563, 648672, 704319, 816641, 830462, 872849, 1017778, 1031327, 1094067, 1628052, 2011511, 4929414, 7449484, 8682834, 8761231, 10268467, 13279482, 14253116, 16001234, 18423838, 28014659, 39884685, 41323947, 51386513];
    labels = ['go', 'bloglovin', 'theoldreader', 'blogspot', 'wikipedia.org', 'zemanta', 'disqus', 'tumblr', 'linkedin', 'realclearpolitics', 'pulse.me', 'taboola', 'tinyurl', 'ask', 'buzzfeed', 'digg', 'fark', 'aol', 'feedly', 'reddit', 'stumbleupon', 'pinterest', 'bing', 'drudgereport', 'msn', 'news sites*', 'twitter', 'parse.ly sites*', 'yahoo', 'outbrain'];
    data.reverse();
    labels.reverse();
    width = 500;
    height = 600;

    hbar(data, labels, width, height, "#top_30_sources");

    data = [73492651, 28014659, 10268467, 704319, 648672]
    labels = ['facebook', 'twitter', 'pinterest', 'linkedin', 'tumblr'];
    width = 500;
    height = 100;

    hbar(data, labels, width, height, "#social_networks");

    data = [235993615, 41323947, 13279482, 1031327];
    labels = ['google sites*', 'yahoo', 'bing', 'ask'];
    width = 500;
    height = 100;

    hbar(data, labels, width, height, "#search_engines");

    data = [7449484, 830462, 469748, 466632, 400006];
    labels = ['feedly', 'pulse.me', 'theoldreader', 'bloglovin', 'netvibes'];
    width = 500;
    height = 100;

    hbar(data, labels, width, height, "#tools");

    data = [51386513, 8761231, 872849, 608563, 599269];
    labels = ['outbrain', 'stumbleupon', 'taboola', 'disqus', 'zemanta'];
    width = 500;
    height = 100;

    hbar(data, labels, width, height, "#discovery");

    data = [16001234, 14253116, 8682834, 4929414, 2011511, 1628052, 816641];
    labels = ['msn', 'drudgereport', 'reddit', 'aol', 'fark', 'digg', 'realclearpolitics'];
    width = 500;
    height = 150;

    hbar(data, labels, width, height, "#aggregators");

}); // jQuery

function hbar(data, labels, width, height, elementId) {
    var w = width;
    var h = height;
    var offset = 10;

    var colors = d3.scale.category20c();

    var x  = d3.scale.linear().domain([0, d3.max(data)]).range([0, w - offset]);
    // var x  = d3.scale.log().domain([d3.min(data), d3.max(data)]).range([0, w - offset]);
    var y = d3.scale.ordinal().domain(data).rangeBands([0, h])
    var pct = d3.scale.linear().domain([0, d3.max(data)]).range([0.3, 1])

    var chart = d3.select(elementId)
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
        .style("opacity", pct);

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
} // hbar
