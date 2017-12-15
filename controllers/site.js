const Banner = require('../proxy/banner')
const Room = require('../proxy/room')
const Cate1 = require('../proxy/cate1')
const Cate2 = require('../proxy/cate2')

exports.index = async (req, res, next) => {
	try {
		// TODO 目前基发 改成并发
		let bannerList = await Banner.getBanner()
		let roomTop = await Room.getTopRoom(10)
		let cate1 = await Cate1.getCates()
		let cate2 = await Cate2.getCates()

		let mixList = []
		// TODO怎么关联查询 cate2_id  in【'123','333','33'】 order by cate2_id  返回的是个二维数组， 并且各个值的记录挨着排的

		// 获取最热数据 
		let hotRooms = await Room.getCateRoom('cate2_id', '174', 4)
		console.log(hotRooms)
		mixList.push({
			tagName: cate2.find((n) => n.cate2Id === '174').cate2Name,
			data: hotRooms
		})

		// 获取正在直播
		let nowRooms = await Room.getCateRoom('cate2_id', '270', 4)
		console.log(nowRooms)
		mixList.push({
			tagName: cate2.find((n) => n.cate2Id === '270').cate2Name,
			data: nowRooms
		})

		// 获取颜值
		let yzRooms = await Room.getCateRoom('cate1_id', '8', 4)
		console.log(yzRooms)
		mixList.push({
			tagName: cate1.find((n) => n.cate1Id === '8').cate1Name,
			data: yzRooms
		})

		// 获取王者荣耀
		let wzryRooms = await Room.getCateRoom('cate1_id', '14', 4)
		console.log(wzryRooms)
		mixList.push({
			tagName: cate1.find((n) => n.cate1Id === '14').cate1Name,
			data: wzryRooms
		})

		console.log(mixList)
		res.render('index', { 
			bannerList,
			roomTop,
			cate1,
			cate2,
			mixList
		});
	} catch (e) {
		// 统一捕获 router错误
		console.log(e)
		next(e)
	}
}