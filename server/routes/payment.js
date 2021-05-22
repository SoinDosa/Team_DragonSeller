const https = require('https')
const express = require('express')
const router = express.Router();
require('dotenv').config()



//이후 결제 관련 API
router.get('/pay/success', (req, res) => {
    console.log(req.query.pg_token)
	res.send('Payment Success!')
})
router.get('/pay/cancel', (req, res) => {
        res.send('Payment Canceled... -_-;;')
})
router.get('/pay/fail', (req, res) => {
        res.send('Payment Failed... T_T')
})


//Put your Admin Key here.
const admin_key = process.env.KAKAO_KEY

//Using qs for parameters.
const qs = require('qs')

//Setting headers.
const options = {
  hostname: 'kapi.kakao.com',
  path: '/v1/payment/ready',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    'Authorization': `KakaoAK ${admin_key}`
  }
}

//Parameters - replace values as you want, **except cid**.
const data = qs.stringify({
	cid: 'TC0ONETIME',
	partner_order_id: '00000001',
	partner_user_id: 'test_user',
	item_name: 'Team_Dragon_Seller',
	quantity: 1,
	total_amount: 10000,
	tax_free_amount: 10000,
	approval_url: 'localhost:5000/pay/success',
	cancel_url: 'localhost:5000/pay/cancel',
	fail_url: 'localhost:5000/pay/cancel'
})

//Request
const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', d => {
	  process.stdout.write(d)
	  const json = JSON.parse(d)
	  router.get('/pay', (req, res) => {
		//Redirect to QR Code.
		  res.redirect(`${json.next_redirect_pc_url}`)
	  })
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()

module.exports = router;

