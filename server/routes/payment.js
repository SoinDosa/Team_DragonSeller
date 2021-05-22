const express = require('express')
const router = express.Router();
const { Payment } = require("../models/Payment")

router.post('/deletePayment', (req, res) => {
	const payment = new Payment
	let paymentId = req.query._id

	console.log(req.query._id)
	Payment.findOne({_id: paymentId})
	.exec((err, payment) => {
		if(err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, paymentId})
	})
})
router.get('/getPayment', (req, res) => {
	let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
	let findArgs = {};
	Payment.find(findArgs)
		  .sort([[sortBy, 1]])
		  .exec((err,payments) => {
			if(err) return res.status(400).json({success: false, err})
			res.status(200).json({success:true, payments})
	})
})
module.exports = router;