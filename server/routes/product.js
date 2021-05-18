const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
})
   
var upload = multer({ storage: storage }).single("file")




router.post('/image', (req, res) => {

  // 받아온 정보들을 db에 저장
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err })
  }
  return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
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

module.exports = router;