const express = require('express')
const router = express.Router();
const multer = require('multer');

const { BannerPost } = require("../models/BannerPost")
const { auth } = require("../middleware/auth")
const { adminAuth } = require("../middleware/adminAuth")

var storage = multer.diskStorage({
	destination: function (req, file, cb){
		cb(null, 'banner_uploads/')
	},
	filename : function(req, file, cb){
		cb(null, `${Date.now()}_${file.originalname}`)
	}
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {
	upload(req, res, (err) => {
		if(err) {
			return req.json({success: false, err})
		}
		return res.json({
			success:true,
			filePath: res.req.file.path,
			fileName : res.req.file.filename
		})
	})
})

router.post('/', (req, res) => {
	const bannerPost = new BannerPost(req.body)

	bannerPost.save((err) => {
		if(err) return res.status(400).json({ success: false, err})

		return res.status(200).json({success:true})
	})
})


module.exports = router;