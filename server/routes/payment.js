const express = require('express')
const router = express.Router();
const { Payment } = require("../models/Payment")


router.post('/deletePayment', (req, res) => {
	console.log(req.body)
	let paymentId = req.body[req.body.length-4]
	console.log(paymentId)

	Payment.deleteOne({_id: paymentId})
	.exec((err, payment) => {
		if(err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, paymentId})
	})
})

router.post('/delivery', (req,res) => {
	console.log(req.body[3])
	Payment.findByIdAndUpdate({_id:req.body[3]},{delivery:1},(err)=> {
		if(err) return res.status(400).json({success:false,err})
		return res.status(200).json({success:true})
	})
})
router.post('/deliveryComplete', (req,res) => {
	Payment.findByIdAndUpdate({_id:req.body[3]},{delivery:2},(err)=> {
		if(err) return res.status(400).json({success:false,err})
		return res.status(200).json({success:true})
	})
})
router.post('/confirm', (req,res) => {
	Payment.findByIdAndUpdate({_id:req.body[3]},{delivery:3},(err)=> {
		if(err) return res.status(400).json({success:false,err})
		return res.status(200).json({success:true})
	})
})
router.post('/getPayment', (req, res) => {
	let sorting = req.body.sortBy ? req.body.sortBy : "_id";
	let order = -1;
	let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
	let findArgs = {};
	let datas=[]
	let term = req.body.searchTerm;
	let allItem=0
	// console.log(req.body)
	for(let key in req.body.filters){
		// console.log(req.body)
		// console.log(req.body.filters[key])
		//key: category와 price -> Product data에 이거 필요한듯.
		if(req.body.filters[key].length > 0){
		  if(key==='sortBy'){
			//console.log("hi")
			if(req.body.filters[key][0]===1){
			  sorting = "_id"
			  order = -1
			}else if(req.body.filters[key][0]===2){
			  sorting = "name"
			  order = 1
			}else if(req.body.filters[key][0]===3){
			  sorting = "name"
			  order = -1
			}
		  }else{
			findArgs[key] = req.body.filters[key]
		  }
		}
	  }
	Payment.find(findArgs)
	.then((productAll) => {
		return Promise.resolve(allItem = productAll.length)
	}).then((result)=>{
			Payment.find(findArgs)
			.limit(limit)
			.skip(skip)
		    .exec((err,payments) => {
			if(err) return res.status(400).json({success: false, err})
			//console.log(payments)
			
			//환불은 어떻게?
			payments.map(variable => {
				datas.push([variable.user,variable.data[0].address,variable.product,variable._id, variable.buytime.toString(),variable.delivery, variable.totalPrice])

			})
			res.status(200).json({success:true, datas, allPage: allItem, postSize: datas.length})
		})
	})
	
})

module.exports = router;