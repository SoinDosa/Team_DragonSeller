require('dotenv').config();

const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    const paymentKey = process.env.KAKAO_KEY
    res.json({success:true, paymentKey})
})

module.exports = router;