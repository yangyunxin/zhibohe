const url = require('url')
const axios = require('axios')
const cheerio = require('cheerio')
const async = require('async')

const targetUrl = 'https://m.douyu.com'

module.exports = async function () {
	// 获取斗鱼分类列表, 斗鱼首页是ajax请求后的页面，因此返回数据是json
	let cateResult = await axios.get(`${targetUrl}/category?type=`)
	let cates = cateResult.data

	return cates
}