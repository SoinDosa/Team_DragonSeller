const express = require('express');
const router = express.Router();
const { Coupon } = require("../models/Coupon");
const multer = require('multer');
const multerS3 = require('multer-s3');
const { auth } = require("../middleware/auth");
const { adminAuth } = require("../middleware/adminAuth");

router.post('/', (req, res) => {
	const coupon = new Coupon(req.body)

	coupon.save((err) => {
		if(err) return res.status(400).json({ success: false, err})

		return res.status(200).json({success:true})
	})
})

router.post('/deleteCoupon', (req, res) => {
	let couponId = req.body._id

	Coupon.deleteOne({_id: couponId})
	.exec((err, coupon) => {
		if(err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, couponId})
	})
})

router.get('/getCoupon', (req, res) => {
	let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
	let findArgs = {};
	Coupon.find(findArgs)
		  .sort([[sortBy, 1]])
		  .exec((err,coupons) => {
			if(err) return res.status(400).json({success: false, err})
			res.status(200).json({success:true, coupons})
	})
})

module.exports = router;