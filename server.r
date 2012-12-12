require(RCurl)


shinyServer(function(input, output) {
  #use the structure from trestletechnology example to load data from bls.gov
  
  data <- reactive(function() {
      #get items available for cpi average prices
      items.data = getURL("ftp://ftp.bls.gov/pub/time.series/ap/ap.item")
      #put items in data frame
      items.df = read.delim(con <- textConnection(items.data), allowEscapes=TRUE, header=TRUE, stringsAsFactors=FALSE, strip.white=TRUE)
      close(con)
      
      #load the average price file which is large
      prices.data = getURL("ftp://ftp.bls.gov/pub/time.series/ap/ap.data.0.Current")
      #put prices into data frame
      prices.df = read.delim(con <- textConnection(prices.data), allowEscapes=TRUE, header=TRUE, stringsAsFactors=FALSE, strip.white=TRUE)
      close(con)
      
      
      #to limit the data let's just look at the same series as the example
      items <- c("APU000072511","APU0000708111","APU0000709112","APU0000711111",
                 "APU0000711311","APU0000711211","APU0000712311","APU0000713111",
                 "APU0000717311","APU000072620")
      #items <- paste("APU0000",rownames(items.df)[1:10],sep="")
      prices <- prices.df[which(prices.df[,1] %in% items),]
      #add date column in format same as in d3 example
      prices[,"date"] <- format(as.Date(paste(prices[,2],substr(prices[,3],2,3),"01",sep="-")),"%b %Y")
      
      data.list <- list(items.df[which(rownames(items.df) %in% substr(items,8,13)),1])
      for (i in 1:length(items)) {
        data.list <- append(data.list,list(cbind(items.df[which(rownames(items.df)==substr(items[i],8,13)),1],
                                          prices[which(prices[,1]==items[i]),c(6,4)])))
      }
      
      
      data.list
  })
  
  output$linechart <- reactive(function() { data() })
  
})

