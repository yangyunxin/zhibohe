const url = require('url')
const axios = require('axios')
const cheerio = require('cheerio')
const async = require('async')
const utils = require('../utils')
const config = require('../config')

const targetUrl = config.targetUrl
let concurrencyCount = 0; // 当前并发数记录

// TODO 怎么返回并发后的数据 bluebird or async library
module.exports = async function () {
	// 获取[1...100]数组
	let pages = Array.from({length: 100}).map((v, k) => k+1)

	// promise包裹async，使其返回promise对象
	// 并发获取斗鱼房间
	let resultQ = new Promise((resolve, reject) => {
		async.mapLimit(pages, 3, async function (page) {
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
			
		}, (err, results) => {
			if (err) {
				err.content = '获取出错'
				reject(err)
			} else {
				// 得到最终房间数组
				resolve(Array.prototype.concat.apply([], results))
			}
		})
	})
	let roomList = await resultQ

	// 并发下载图片
	let roomListQ = new Promise((resolve, reject) => {
		async.mapLimit(roomList, 3, async function (room) {
			// 保存头像
			let savePath = config.root + '/public/upload/avatar/';
			let avatarUrl = 'https://apic.douyucdn.cn/upload/' + room.avatar + '_small.jpg'
			let resultUrl = await utils.saveImg(avatarUrl, savePath, room.room_id)

			console.log(resultUrl)
			room.avatar = resultUrl

			return room
		}, (err, results) => {
			if (err) {
				err.content = '获取出错'
				reject(err)
			} else {
				resolve(results)
			}
		})
	})
	return await roomListQ
}