const models = require('../models')
const BannerModel = models.Banner

/**
 * 获取首页banner
 */
exports.getBanner = async function () {
	let bannerList = await BannerModel.findAll({attributes: ['id', 'pic_url']})
	return bannerList

	
}