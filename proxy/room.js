const models = require('../models')
const RoomModel = models.Room

/**
 * 获取排行数据
 * @param { number } find的筛选的几条数据
 * @return array 房间数组
 */
exports.getTopRoom = async function (num) {
	let roomTop = await RoomModel.findAll({
		attributes: ['online', 'room_id', 'nickname', 'avatar', 'status'],
		limit: num,
		order: [['online', 'DESC']]
	})
	return roomTop
}

/**
 * 获取分类数据
 * @param { string } find的查询条件
 * @param { string } find的查询条件名字
 * @param { number } find的筛选的几条数据
 * @return array 房间数组
 */
exports.getCateRoom = async function (type, typename, num) {
	let condition = {}
	condition[type] = typename
	console.log(condition)
	let rooms = await RoomModel.findAll({
		limit: num,
		where: condition
	})
	return rooms
}