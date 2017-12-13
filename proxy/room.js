const models = require('../models')
const RoomModel = models.Room

/**
 * 获取首页banner
 * @param { number } find的筛选的几条数据
 */
exports.getTopRoom = async function (num) {
	let roomTop = await RoomModel.findAll({
		attributes: ['online', 'room_id', 'nickname'],
		limit: num
	})
	return roomTop
}