const url = require('url')
const axios = require('axios')
const cheerio = require('cheerio')
const async = require('async')

const targetUrl = 'https://m.douyu.com'

// 获取斗鱼banner数据
module.exports = async function getHomeData () {
	let homeUrl = `${targetUrl}/index/getHomeData`

	let homeData = await axios({
		url: homeUrl,
		type: 'get',
		headers: {'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json'},
	})
	let bannerList = homeData.data.banner

	return await bannerList
}
