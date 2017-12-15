'use strict'

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Cate1', {
		id: {type: DataTypes.BIGINT, autoIncrement: true, unique: true, primaryKey: true},
		cate1Id: {type: DataTypes.STRING, allowNull: false},
		cate1Name: {type: DataTypes.STRING, allowNull: true},
		shortName: {type: DataTypes.STRING, allowNull: false},
	}, {
		timestamps: true,
		underscored: true,
		paranoid: true,
		freezeTableName: true,
		tableName: 'cate1',
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})
}