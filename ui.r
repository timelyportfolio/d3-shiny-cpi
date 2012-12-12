reactiveSvg <- function (outputId) 
{
  HTML(paste("<div id=\"", outputId, "\" class=\"shiny-network-output\"><svg /></div>", sep=""))
}

shinyUI(pageWithSidebar(
  headerPanel(title=HTML("R Shiny Version of <a href= \"http://bl.ocks.org/4053096\">Constraint Relaxation - Prices</a>")),
  
  sidebarPanel(
    helpText(HTML("All source available on <a href = \"https://github.com/timelyportfolio/shiny-d3-cpi\">Github</a>"))
  ),
  
  mainPanel(
    includeHTML("cpi.js"),
    reactiveSvg(outputId = "linechart")
  )
)
)