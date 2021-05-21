const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');


const { Product } = require('../models/Product');

require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: 'public-read',
    key: function(req, file, cb) {
      cb(null, Date.now().toString()+file.originalname)
    }
  })
}).single("file")

router.post('/image', (req, res) =>{
    // 받아온 정보들을 db에 저장
  uploadS3(req, res, (err) => {
    if (err) {
      console.log(err)
      return res.json({ success: false, err })
    }
    return res.json({ success: true, filePath: res.req.file.key, fileName: res.req.file.filename })
  })
})

router.post('/', (req, res) => {

  // 받아온 정보들을 db에 저장
  const product = new Product(req.body)

  product.save((err) => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

router.post('/products', (req, res) => {
  // product 컬렉션에 있는 모든 상품 정보 가져오기
  Product.find()
    .populate("writer")
    .exec((err, productInfo) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true, productInfo})
    })
})

// 상세 페이지용
router.get('/products_by_id', (req, res) => {


  let type = req.query.type
  let productId = req.query.id
  // Product 아이디를 이용해 같은 상품의 정보를 가져온다

  Product.find({ _id: productId })
  .populate('writer')
  .exec((err, product) => {
    if(err) return res.status(400).send(err)
    return res.status(200).send({ success: true, product })
  })
})


// 상세 페이지용
router.get('/products_by_id', (req, res) => {


  let type = req.query.type
  let productIds = req.query.id
  
  if(type === "array") {
    // 여러 아이디 분리하기
    let ids = req.query.id.split(',');

    productIds = ids.map(item => {
      return item
    })
  }

  Product.find({ _id: {$in: productIds} })
  .populate('writer')
  .exec((err, product) => {
    if(err) return res.status(400).send(err)
    return res.status(200).json({ success: true, product })
  })
})

router.post('/getProducts' ,(req, res) => {

  //mongoDB condition 말하는 것
    let order = req.body.order ? req.body.order: "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
  
  // data fetch할때 order, ~대로 sorting, 띄우는 수 제한, skip
    Product.find()
      //.populate("Writer")
      .sort([[sortBy, order]])
      .limit(limit)
      .skip(skip)
      .exec((err,products) => {
        if(err) return res.status(400).json({success: false, err})
        res.status(200).json({success:true, products, postSize: products.length})
      })
  })
  
  router.post('/getProducts' ,(req, res) => {

    //mongoDB condition 말하는 것
      let order = req.body.order ? req.body.order: "desc";
      let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
      let limit = req.body.limit ? parseInt(req.body.limit) : 100;
      let skip = parseInt(req.body.skip);
      let allItem = 0;
      let findArgs = {};
      let term = req.body.searchTerm;
      
    //여기 고쳐야함.
      for(let key in req.body.filters){
        //key: category와 price -> Product data에 이거 필요한듯.
        if(req.body.filters[key].length > 0){
          if(key==="price"){
            findArgs[key] = {
              //greater than less than
              $gte: req.body.filters[key][0],
              $lte: req.body.filters[key][1]
            }
          }else{
            findArgs[key] = req.body.filters[key]
          }
        }
      }
  
      // data fetch할때 order, ~대로 sorting, 띄우는 수 제한, skip
      if(term){
        Product.find(findArgs)
          .find({$text: {$search: term}})
          .exec((err,products) => {
            allItem = products.length;
          })
  
        Product.find(findArgs)
          .find({$text: {$search: term}})
          .populate("Writer")
          .sort([[sortBy, order]])
          .limit(limit)
          .skip(skip)
          .exec((err,products) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({success:true, products, allPage: allItem ,postSize: products.length})
          })
      }else{
        Product.find(findArgs)
          .exec((err,products) => {
            allItem = products.length;
          })
        Product.find(findArgs)
          .populate("Writer")
          .sort([[sortBy, order]])
          .limit(limit)
          .skip(skip)
          .exec((err,products) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({success:true, products, allPage:allItem ,postSize: products.length})
          })
      }
    })

  router.get('/getNewProducts', (req, res) => {
    Product.find()
    .sort({'_id': 1})
    .limit(5)
    .exec((err,products) => {
      if(err) return res.status(400).json({success: false, err})
      res.status(200).json({success:true, products})
    })
  })
module.exports = router;