const Room = require('../proxy/room')

exports.rank = async (req, res, next) => {
	try {
		let roomTop = await Room.getTopRoom(50)
		res.render('rank', {
			roomTop
		})
	} catch (e) {
		next(e)
	}
}
