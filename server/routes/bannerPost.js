const express = require('express')
const router = express.Router();
const { BannerPost } = require("../models/BannerPost")

const { auth } = require("../middleware/auth")
const { adminAuth } = require("../middleware/adminAuth")

router.post('/', adminAuth, (req,res) => { // 배너
	const bannerPost = new BannerPost(req.body)

	bannerPost.save((err, bannerInfo) => {
		if(err) return res.status(400).json({success: false, err}) // 에러 발생

		return res.status(200).json({
			success: true, bannerInfo
		})
	})
})

router.post('/banners', (req, res) => {
	// Banner 컬렉션에 있는 모든 이미지 정보 가져오기
	BannerPost.find()
	  .exec((err, bannerInfo) => {
		if(err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, bannerInfo})
	  })
})

router.get('/getBanners', (req, res) => {
	let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
	let findArgs = {};
	BannerPost.find(findArgs)
		  .sort([[sortBy, 1]])
		  .exec((err,banners) => {
			if(err) return res.status(400).json({success: false, err})
			res.status(200).json({success:true, banners})
	})
})

module.exports = router;