d3-shiny-cpi
============

Using the example given in http://bl.ocks.org/3891711, I have made the change to use R through [RStudio Shiny](http://www.rstudio.com/shiny/) to load CPI average price data from http://bls.org.  Still getting NaN in the path, so not working perfectly, but I wanted to go ahead and show it to the world.

As stated in that example (all applies except "contructed from a CSV...",

"
Want to fix the label crowding? Check out the version by Ziggy that [dynamically positions the labels](http://bl.ocks.org/3895025). Mike Bostock suggested [constraint relaxation](http://bl.ocks.org/4053096), which works very well.

This line chart is constructed from a CSV in the "Multi-Series Format" from [Bureau of Labor Statistics Consumer Price Index](http://bls.gov/) data. The chart employs [conventional margins](http://bl.ocks.org/3019563) and a number of D3 features:

* [d3.csv](https://github.com/mbostock/d3/wiki/CSV) - load and parse data
* [d3.time.format](https://github.com/mbostock/d3/wiki/Time-Formatting) - parse dates
* [d3.time.scale](https://github.com/mbostock/d3/wiki/Time-Scales) - *x*-position encoding
* [d3.scale.linear](https://github.com/mbostock/d3/wiki/Quantitative-Scales) - *y*-position encoding
* [d3.hcl](http://bl.ocks.org/3014589) - a perceptual color space
* [d3.extent](https://github.com/mbostock/d3/wiki/Arrays#wiki-d3_extent), [d3.min](https://github.com/mbostock/d3/wiki/Arrays#wiki-d3_min) and [d3.max](https://github.com/mbostock/d3/wiki/Arrays#wiki-d3_max) - compute domains
* [d3.svg.axis](https://github.com/mbostock/d3/wiki/SVG-Axes) - display axes
* [d3.svg.line](https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-line) - display line shape

The chart also uses a couple functions from [Underscore.js](http://underscorejs.org/):

* [_.pluck](http://underscorejs.org/#pluck)
* [_.each](http://underscorejs.org/#each)
* [_.map](http://underscorejs.org/#map)

"
