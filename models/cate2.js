'use strict'

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Cate2', {
		id: {type: DataTypes.BIGINT, autoIncrement: true, unique: true, primaryKey: true},
		cate1Id: {type: DataTypes.STRING, allowNull: false},
		cate2Id: {type: DataTypes.STRING, allowNull: true},
		count: {type: DataTypes.BIGINT, allowNull: true},
		cate2Name: {type: DataTypes.STRING, allowNull: true},
		icon: {type: DataTypes.STRING, allowNull: true},
		pic: {type: DataTypes.STRING, allowNull: true},
		shortName: {type: DataTypes.STRING, allowNull: false},
		smallIcon: {type: DataTypes.STRING, allowNull: false},
	}, {
		timestamps: true,
		underscored: true,
		paranoid: true,
		freezeTableName: true,
		tableName: 'cate2',
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})
}