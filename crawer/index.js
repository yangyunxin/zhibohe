const url = require('url')
const axios = require('axios')
const cheerio = require('cheerio')
const async = require('async')

const targetUrl = 'https://m.douyu.com'
let concurrencyCount = 0; // 当前并发数记录

module.exports = function () {
	;(async() => {
		// 获取斗鱼分类列表, 斗鱼首页是ajax请求后的页面，因此返回数据是json
		let cateResult = await axios.get(`${targetUrl}/category?type=`)
		let cates = cateResult.data.cate2Info;

		// 1个并发数
		async.mapLimit(cates, 1, async function (cate) {
			try {
				// 抓取斗鱼详情页
				let cateUrl = `${targetUrl}/roomlists/${cate.shortName}`
				console.log(cateUrl)
				concurrencyCount++
				console.log("...正在抓取 "+ cate.cate2Name + "...当前并发数记录：" + concurrencyCount);

				let liveHtml = await axios.get(cateUrl)
				// var $ = cheerio.load(liveHtml.text,{decodeEntities: false});

				console.log(liveHtml.data)

				let q = async.queue(function (task, callback) {
					const listUrl = `https://m.douyu.com/roomlists`
					let liveList = await axios({
						method: 'post',
						url: listUrl,
						data: {
							type: 2,
							type: 'wzry'
						},
						headers: {'X-Requested-With': 'XMLHttpRequest'},
					})
					callback(data.push(liveList))
				}, 5)


				concurrencyCount--;
			} catch (e) 	{
				console.log(e)
				throw e
			}
		}, (err, results) => {
			if (err) {
				err.content = 'async使用错误'
				console.log(err)
			}

		})
		
	})()
}