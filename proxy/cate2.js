const models = require('../models')
const Cate2Model = models.Cate2

exports.getCates = async function () {
	let cate2 = await Cate2Model.findAll()
	return cate2
}