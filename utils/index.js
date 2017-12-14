const axios = require('axios')
const fs = require('fs')
const config = require('../config')


/**
 * save image.
 * @param  {String} url 请求图片路径
 * @param  {String} path 保存图片路径
 * @param  {String} name 保存图片名字
 * @return {String} 返回图片最后地址
 */
exports.saveImg = function (url, path, name) {
	let imgFilename = name + url.match(/\.[^.]+$/)[0]
	return axios({
		method: 'get',
		url: url,
		responseType: 'stream'
	})
	.then(function (response) {
		response.data.pipe(fs.createWriteStream(path + imgFilename))

		return (path + imgFilename).match(/(\/public([a-zA-Z0-9\/])+\.)[a-z]+/)[0]
	})
	.catch(e => {
		throw e
	})
}

