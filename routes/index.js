var express = require('express');
var router = express.Router();

const Banner = require('../proxy/banner')
const Room = require('../proxy/room')

/* GET home page. */
router.get('/', function(req, res, next) {
	(async () => {
		// TODO 目前基发 改成并发
		let bannerList = Banner.getBanner()

		let roomTop = Room.getTopRoom(10)

		return {
			bannerList,
			roomTop
		}
	})()
	.then(data => {
		const { bannerList, roomTop } = data
  		res.render('index', { 
  			bannerList,
  			roomTop
  		});
	})
	.catch(e => {
		// 统一捕获 router错误
		console.log(e)
		next(e)
	})
});

module.exports = router;
