
<style>
body {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.x.axis path {
  display: none;
}

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 1.5px;
  -webkit-transition: opacity 0.3s;
  -moz-transition: opacity 0.3s;
  -o-transition: opacity 0.3s;
  transition: opacity 0.3s;
}

path.invisible {
  fill: none;
  stroke: rgba(0,0,0,0);
  stroke-width: 8px;
}

text.label {
  font-size: 12px;
  font-weight: bold;
}
</style>

<script src="http://mbostock.github.com/d3/d3.v2.js"></script>

<script src="http://documentcloud.github.com/underscore/underscore.js"></script>

<script type="text/javascript">
    
    var networkOutputBinding = new Shiny.OutputBinding();
  $.extend(networkOutputBinding, {
    find: function(scope) {
      return $(scope).find('.shiny-network-output');
    },
    renderValue: function(el, data) {
        //remove the old graph
          var svg = d3.select(el).select("svg");

          svg.remove();
          
          $(el).html("");  
        
        
        
        
var margin = {top: 20, right: 220, bottom: 30, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var format = d3.time.format("%b %Y");

var start = format.parse("Jan 1995");
var end = format.parse("Oct 2012");
var range = d3.time.months(start,end);

var x = d3.time.scale()
    .range([0,width])
    .domain([start,end]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = function(i) {
  return d3.hcl(48*i,95,45).toString();
};

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .interpolate("basis")
    .defined(function(d) { return d != null; })
    .x(function(d,i) { return x(range[i]); })
    .y(function(d) { return y(d); });

          //append a new one
          svg = d3.select(el).append("svg")
              
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//d3.csv("average-prices.csv", function(raw) {
  var newdata = [];
  //var goods = _(raw).pluck("Name");
  var goods = data[0];

  newdata.push({
      id: data[1].SeriesId[0],
      name: data[1].Name[0],
      values: data[1].Values
  });
  //_(raw).each(function(series) {
//    var value = {};
//    data.push({
//      id: series["Series ID"],
//      name: series["Name"],
//      values: _(range).map(function(month) {
//                return parseFloat(series[format(month)]) || null;
//              })
//    });
//  });

  var values = _(newdata).chain().pluck('values').flatten().value();

  y.domain([
    0,
    d3.max(values)
  ]);


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .text("Average Price");

  var series = svg.selectAll(".series")
      .data(newdata)
    .enter().append("g")
      .attr("class", "series");

  series.append("path")
      .attr("class", "line")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d,i) { return color(i); });

  series.append("path")
      .attr("class", "invisible hover")
      .attr("d", function(d) { return line(d.values); });

  var labels = newdata.map(function(d) { return {name: d.name, y: y(d.values[d.values.length - 1])}});

  series.append("text")
      .attr("class", "label hover")
      .data(labels)
      .attr("transform", function(d) { return "translate(" + x(end) + "," + d.y + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .style("fill", function(d,i) { return color(i); })
      .text(function(d) { return d.name; });

  // constraint relaxation on labels
  var alpha = 0.5;
  var spacing = 12;
  function relax() {
    var again = false;
    labels.forEach(function(a,i) {
      labels.slice(i+1).forEach(function(b) {
        var dy = a.y - b.y;
        if (Math.abs(dy) < spacing) {
          again = true;
          var sign = dy > 0 ? 1 : -1;
          a.y += sign*alpha;
          b.y -= sign*alpha;
        }
      });
    });
    d3.selectAll(".label")
      .attr("transform", function(d) { return "translate(" + x(end) + "," + d.y + ")"; });
    if (again) setTimeout(relax,20);
  };

  relax();

  series.selectAll(".hover")
      .on("mouseover", function(d,i) {
        d3.selectAll(".line")
          .style("opacity", 0.12)
          .filter(function(p) { return p.name == d.name; })
          .style("opacity", 1)
          .style("stroke-width", 2.5);
        d3.selectAll(".series text")
          .style("opacity", 0)
          .filter(function(p) { return p.name == d.name; })
          .style("opacity", 1);
      })
      .on("mouseout", function(d,i) {
        d3.selectAll(".line")
          .style("opacity", 1)
          .style("stroke-width", null);
        d3.selectAll(".series text")
          .style("opacity", 1);
      });
//});







    }
  });
  Shiny.outputBindings.register(networkOutputBinding, 'timelyportfolio.networkbinding');

</script>