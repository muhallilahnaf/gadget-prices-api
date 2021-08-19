# gadget-prices
---

## gadget-prices-api
## gadget-prices-admin
## gadget-prices-react
## gadget-prices-scrapy
---

### scrapy

background scraping and saving data to mongodb.  
hosting: **azure**

**types of data:**  
1. big collection of data (full specifications, benchmarks) from specific gadget-related websites  
2. products from online stores

**frequency:**  
(1) once/twice a week  
(2) thrice a day

**collection name:**  
(1) {gadget}data (eg. phonedata)  
(2) gadgets (eg. phones)

**task after completion of scraping:**  
(1) check gadgets collection and update documents (where empty)  
(2) check {gadget}data collection and update gadgets documents (where empty)


## react

convert current ui to react with materializecss  
hosting: **firebase**


## admin

workable ui just to check things and interact with db through api  
hosting: **firebase**


## api

express api for interacting with mongodb  
hosting: **azure**

- separate endpoints for gadgets (eg. /phone, /cpu, /laptop etc.)
- version endpoint (version will be used to create price history and easily figure-out latest scraped gadgets)
- search endpoint (real-time scraping via node-fetch (or scrapy?), no relation with db)