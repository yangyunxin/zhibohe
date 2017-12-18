const Room = require('../proxy/room')
const Cate1 = require('../proxy/cate1')
const Cate2 = require('../proxy/cate2')

exports.list = async (req, res, next) => {
	try {
		let shortName = req.params.id
		let cateRooms = await Room.getCateRoom('shortName', shortName, 8)
		let cate1 = await Cate1.getCates()
		let cate2 = await Cate2.getCates()
		console.log(cateRooms)

		res.render('list', {
			cateRooms,
			cate1,
			cate2
		})
	} catch (e) {
		next(e)
	}
}
