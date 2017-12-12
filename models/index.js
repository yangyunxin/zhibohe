const Sequelize = require('sequelize')

const sequelize = new Sequelize('douyu', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	operatorsAliases: false
})

const Room = sequelize.import('./room.js')

// 同步模型到数据库中
// sequelize.sync()

module.exports = {
	Room
}