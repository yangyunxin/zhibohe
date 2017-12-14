const url = require('url')
const axios = require('axios')
const cheerio = require('cheerio')
const async = require('async')

const targetUrl = 'https://m.douyu.com'
const getRoomList = require('./getRoomList')
const getBannerList = require('./getBanner.js')
const models = require('../models')

const RoomModel = models.Room
const BannerModel = models.Banner
	

module.exports = async function () {
	// 继发插入room数据到数据库
	let roomList = await getRoomList()
	for (let i = 0; i < roomList.length; i++) {
		let room = await RoomModel.create({
			"room_id": roomList[i].room_id,
            "room_name": roomList[i].room_name,
            "owner_uid": roomList[i].owner_uid,
            "nickname": roomList[i].nickname,
            "avatar": roomList[i].avatar,
            "cate1_id": roomList[i].cate1_id,
            "cate2_id": roomList[i].cate2_id,
            "cate3_id": roomList[i].cate3_id,
            "room_src": roomList[i].room_src,
            "isVertical": roomList[i].isVertical,
            "status": roomList[i].status,
            "show_status": roomList[i].show_status,
            "show_time": roomList[i].show_time,
            "show_details": roomList[i].show_details,
            "show_id": roomList[i].show_id,
            "online": roomList[i].online,
            "anchorCity":roomList[i].anchorCity,
            "vertical_src": roomList[i].vertical_src,
		})
	}

	// 插入banner数据到数据库
	const bannerList = await getBannerList()
	for (let i = 0; i < bannerList.length; i++) {
		let banner = await BannerModel.create({
			id: bannerList[i].id,
            title: bannerList[i].title,
            pic_url: bannerList[i].pic_url,
		})
	}
}