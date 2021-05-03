const express = require('express')
const router = express.Router();
const { BannerPost } = require("../models/BannerPost")

const { auth } = require("../middleware/auth")
const { adminAuth } = require("../middleware/adminAuth")

router.post('/banner_upload', adminAuth, (req,res) => { // 배너
	const bannerPost = new BannerPost(req.body)

	banner.save((err, bannerInfo) => {
		if(err) return res.json({success: false, err}) // 에러 발생

		return res.status(200).json({
			success: true
		})
	})
})


module.exports = router;