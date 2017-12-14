const startCrawler = require('./crawler')

// 开始爬取斗鱼数据
startCrawler()
.catch(e => {
	// 捕捉爬取错误
	console.log(e)
})