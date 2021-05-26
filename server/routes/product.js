const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const { Product } = require('../models/Product');
require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const { auth } = require("../middleware/auth")

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
// TODO : 코멘트용 라우터
router.post('/addComment', auth ,(req, res) =>{
  // 카트 올리듯 Product의 comment에 push
  Product.findOneAndUpdate(
    { _id: req.body.productId },
    {
      // 이곳 넣는게 제대로 안된다
      $push: {
        comment: {
          id: req.body.productId,
          star: req.body.star,
          chuchan: req.body.chuchan,
          delivery: req.body.delivery,
          date: Date.now()
        }
      }
    },
  )
  return res.status(200).json({ success: true })
})

// 상세 페이지용
router.get('/products_by_id', (req, res) => {


  let type = req.query.type
  let productIds = req.query.id
  // Product 아이디를 이용해 같은 상품의 정보를 가져온다

  if (type === "array") {
    let ids = req.query.id.split(',')
    productIds = ids.map(item => {
        return item
    })
  }


  Product.find({ _id: productIds })
  .populate('writer')
  .exec((err, product) => {
    if(err) return res.status(400).send(err)
    return res.status(200).send({ success: true, product })
  })
})

router.get('/getNewProducts', (req, res) => {
  Product.find()
  .sort({'_id': -1})
  .limit(4)
  .exec((err,products) => {
    if(err) return res.status(400).json({success: false, err})
    res.status(200).json({success:true, products})
  })
})

router.post('/deleteProduct', (req, res) => {
	let productId = req.body._id

	Product.deleteOne({_id: productId})
	.exec((err, productId) => {
		if(err) return res.status(400).json({ success: false, err })
		return res.status(200).json({ success: true, productId})
	})
})


router.post('/getProducts' ,(req, res) => {

  //mongoDB condition 말하는 것
    let order = -1;
    let sorting =  "_id";
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
        }else if(key==='sortBy'){
          if(req.body.filters[key][0]===1){
            sorting = "_id"
            order = -1
          }else if(req.body.filters[key][0]===2){
            sorting = "price"
            order = 1
          }else if(req.body.filters[key][0]===3){
            sorting = "price"
            order = -1
          }
        }else{
          findArgs[key] = req.body.filters[key]
        }
      }
    }

    // data fetch할때 order, ~대로 sorting, 띄우는 수 제한, skip
    if(term){
      Product.find(findArgs)
      .find({'title': {'$regex':term,'$options': 'i'}})
      .then((productAll) => {
        return Promise.resolve(allItem = productAll.length)
      })
      .then((result)=>{
        Product.find(findArgs)
        .find({'title': {'$regex':term,'$options': 'i'}})
        .populate("Writer")
        .sort([[sorting, order]])
        .limit(limit)
        .skip(skip)
        .exec((err,products) => {
          if(err) return res.status(400).json({success: false, err})
          res.status(200).json({success:true, products, allPage:allItem ,postSize: products.length})
        })
      })
        // db.inventory.find( { status: { $in: [ "A", "D" ] } } )

      // Product.find(findArgs)
      //   .find({'title': {'$regex':term,'$options': 'i'}})
      //   .populate("Writer")
      //   .sort([[sorting, order]])
      //   .limit(limit)
      //   .skip(skip)
      //   .exec((err,products) => {
      //     if(err) return res.status(400).json({success: false, err})
      //     res.status(200).json({success:true, products, allPage: allItem ,postSize: products.length})
      //   })
    }else{
      Product.find(findArgs)
      .then((productAll) => {
          return Promise.resolve(allItem = productAll.length)
      }) 
      .then((result)=>{
        Product.find(findArgs)
        .populate("Writer")
        .sort([[sorting, order]])
        .limit(limit)
        .skip(skip)
        .exec((err,products) => {
          if(err) return res.status(400).json({success: false, err})
          res.status(200).json({success:true, products, allPage:allItem ,postSize: products.length})
        })
      }) 
    }
  })

module.exports = router;