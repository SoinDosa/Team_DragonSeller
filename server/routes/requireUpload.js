const express = require('express')
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');

const { Require } = require("../models/Require")
const { auth } = require("../middleware/auth")
const { adminAuth } = require("../middleware/adminAuth")

require('dotenv').config()
const fs = require('fs')



router.post('/', (req, res) => {
    // 받아온 정보들을 db에 저장
    const require = new Require(req.body)
  
    require.save((err) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true })
    })
  })

module.exports = router;