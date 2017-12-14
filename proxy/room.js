const models = require('../models')
const RoomModel = models.Room

/**
 * 获取排行数据
 * @param { number } find的筛选的几条数据
 * @return array 房间数组
 */
exports.getTopRoom = async function (num) {
	let roomTop = await RoomModel.findAll({
		attributes: ['online', 'room_id', 'nickname', 'avatar'],
		limit: num,
		// order: ['online', 'DESC']
	})
	return roomTop
}