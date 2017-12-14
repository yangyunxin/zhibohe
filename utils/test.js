const utils = require('./index')
const config = require('../config')

;(async function () {
	let savePath = config.root + '/upload/avatar/';
	let avatarUrl = 'https://apic.douyucdn.cn/upload/avanew/face/201711/14/09/0e225e90ca2f8e8166f0a9c496cd00be_small.jpg'
	let q = await utils.saveImg(avatarUrl, savePath, 'test')
	console.log(q)

})()
