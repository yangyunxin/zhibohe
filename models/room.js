'use strict'

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Room', {
    	id: {type: DataTypes.BIGINT, autoIncrement: true, unique: true},
    	room_id: {type: DataTypes.STRING, allowNull: false, unique: true, primaryKey: true,},
        room_name: {type: DataTypes.STRING, allowNull: false},
        owner_uid: {type: DataTypes.STRING, allowNull: false},
        nickname: {type: DataTypes.STRING, allowNull: false},
        avatar: {type: DataTypes.STRING, allowNull: false},
        cate1_id: {type: DataTypes.STRING, allowNull: false},
        cate2_id: {type: DataTypes.STRING, allowNull: false},
        cate3_id: {type: DataTypes.STRING, allowNull: false},
        room_src: {type: DataTypes.STRING, allowNull: false},
        isVertical: {type: DataTypes.STRING, allowNull: false},
        status: {type: DataTypes.STRING, allowNull: false},
        show_status: {type: DataTypes.STRING, allowNull: false},
        show_time: {type: DataTypes.STRING, allowNull: false},
        show_details: {type: DataTypes.STRING, allowNull: false},
        show_id: {type: DataTypes.STRING, allowNull: false},
        online: {type: DataTypes.STRING, allowNull: false},
        anchorCity: {type: DataTypes.STRING, allowNull: true},
        vertical_src: {type: DataTypes.STRING, allowNull: false}
	}, {
		timestamps: true,
		underscored: true,
		paranoid: true,
		freezeTableName: true,
		tableName: 'room',
		charset: 'utf8',
		collate: 'utf8_general_ci'
	})
}