const Banner = require('../proxy/banner')
const Room = require('../proxy/room')

exports.index = async (req, res, next) => {
	try {
		// TODO 目前基发 改成并发
		let bannerList = await Banner.getBanner()

		let roomTop = await Room.getTopRoom(10)

		res.render('index', { 
			bannerList,
			roomTop
		});
	} catch (e) {
		// 统一捕获 router错误
		console.log(e)
		next(e)
	}
}