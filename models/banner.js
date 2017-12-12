'use strict'

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('Banner', {
		id: {type: DataTypes.BIGINT, unique: true, primaryKey: true},
		pic_url: {type: DataTypes.STRING, allowNull: false}
	}, {
		timestamps: true,
		underscored: true,
		paranoid: true,
		freezeTableName: true,
		tableName: 'banner',
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})
}