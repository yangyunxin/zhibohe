const axios = require('axios')
const fs = require('fs')
const config = require('../config')

function saveImg (url, path, name) {
	let imgFilename = name + url.match(/\.[^.]+$/)[0]
	axios({
		method: 'get',
		url: url,
		responseType: 'stream'
	})
	.then(function (response) {
		response.data.pipe(fs.createWriteStream(path + imgFilename))

		return path + imgFilename
	})
	.catch(e => {
		throw e
	})
}

let savePath = config.root + '/upload/avatar/';


saveImg('https://apic.douyucdn.cn/upload/avatar/026/72/76/52_avatar_small.jpg', savePath, 'test')