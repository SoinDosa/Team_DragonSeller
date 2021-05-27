const express = require('express');
const router = express.Router();
const { Coupon } = require("../models/Coupon");
const multer = require('multer');
const multerS3 = require('multer-s3');
const { auth } = require("../middleware/auth");
const { adminAuth } = require("../middleware/adminAuth");

require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
 