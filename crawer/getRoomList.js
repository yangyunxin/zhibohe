const url = require('url')
const axios = require('axios')
const cheerio = require('cheerio')
const async = require('async')

const targetUrl = 'https://m.douyu.com'
let concurrencyCount = 0; // 当前并发数记录

// TODO 怎么返回并发后的数据
module.exports = async function (cb) {
	// 并发获取斗鱼房间
	let pages = Array.from({length: 100}).map((v, k) => k+1)
	async.mapLimit(pages, 3, async function (page) {
		try {
			// 抓取斗鱼详情页
			let cateUrl = `${targetUrl}/roomlists?page=${page}`
			concurrencyCount++
			console.log("...正在抓取第 "+ page + "页数据，...当前并发数记录：" + concurrencyCount);
			let roomlist = await axios({
				url: cateUrl,
				method: 'post',
				headers: {'X-Requested-With': 'XMLHttpRequest'},
			})
			concurrencyCount--;
			return roomlist.data.result
		} catch (e) 	{
			console.log(e)
			throw e
		}
	}, (err, results) => {
		if (err) {
			err.content = '获取出错'
			console.log(err)
		}
		// 得到最终房间数组
		let roomList = Array.prototype.concat.apply([], results)

		// 保存图片

		cb(roomList)
	})
}