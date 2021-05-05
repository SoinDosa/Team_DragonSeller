const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload_example/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
})
   
var upload = multer({ storage: storage }).single("file")




router.post('/image', (req, res) => {

    // 받아온 정보들을 db에 저장
    upload(req, res, err => {
      if(err) {
        return req.json({ success: false, err})
      }
      return res.json({ success: true, filPath: res.req.file.path, fileName: res.req.file.filename})
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


module.exports = router;