const url = require('url')
const axios = require('axios')
const cheerio = require('cheerio')
const async = require('async')

const targetUrl = 'https://m.douyu.com'
const getRoomList = require('./getRoomList')
const getBannerList = require('./getBanner.js')
const getCateList = require('./getCate.js')
const models = require('../models')

const RoomModel = models.Room
const BannerModel = models.Banner
const Cate2Model = models.Cate2
const Cate1Model = models.Cate1

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

    const cateList = await getCateList()
    // 插入类型2
    for (let i = 0; i < cateList.cate2Info.length; i++) {
        let cateInfo = cateList.cate2Info[i]
        Cate2Model.create({
            cate1Id: cateInfo.cate1Id,
            cate2Id: cateInfo.cate2Id,
            count: cateInfo.count,
            cate2Name: cateInfo.cate2Name,
            icon: cateInfo.icon,
            pic: cateInfo.pic,
            shortName: cateInfo.shortName,
            smallIcon: cateInfo.smallIcon,
        })
    }

    // 插入类型1
    for (let i = 0; i < cateList.cate1Info.length; i++) {
        let cateInfo = cateList.cate1Info[i]
        Cate1Model.create({
            cate1Id: cateInfo.cate1Id,
            cate1Name: cateInfo.cate1Name,
            shortName: cateInfo.shortName,
        })
    }
}