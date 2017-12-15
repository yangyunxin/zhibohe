const models = require('../models')
const Cate1Model = models.Cate1

exports.getCates = async function () {
	let cate1 = await Cate1Model.findAll()
	return cate1
}