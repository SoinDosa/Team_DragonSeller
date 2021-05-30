const express = require('express')
const router = express.Router();

const { Require } = require("../models/Require")
const { auth } = require("../middleware/auth")
const { adminAuth } = require("../middleware/adminAuth")



router.post('/', (req, res) => {
  // 받아온 정보들을 db에 저장
  const require = new Require(req.body)

  require.save((err) => {
    if (err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

router.get('/getRequires', (req, res) => {
  console.log(req.body)
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let findArgs = {};
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let allItem = 0;

  Require.find(findArgs)
  .then((productAll) => {
    return Promise.resolve(allItem = productAll.length)
  })
  .then((result) => {
    Require.find(findArgs)
    .sort([[sortBy, 1]])
    .limit(limit)
    .skip(skip)
    .exec((err, requires) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true, requires, allItem })
    })
  })
  
})
router.post('/getRequireList', (req, res) => {
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let findArgs = {};
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let allItem = 0;

  console.log(req.body)
  for (let key in req.body.filters) {
    if (req.body.filters[key] > 0) {
      console.log("hi")
      if (key === "sortBy") {
        if (req.body.filters[key] === 1) {
          order = -1
        } else {
          order = 1
        }
      }
      else {
        findArgs[key] = req.body.filters[key]
      }
    }
    console.log("findArgs")
    console.log(findArgs)
  }

  Require.find(findArgs)
  .then((productAll) => {
    return Promise.resolve(allItem = productAll.length)
  })
  .then((result) => {
    Require.find(findArgs)
    .sort([[sortBy, 1]])
    .limit(limit)
    .skip(skip)
    .exec((err, requires) => {
      if (err) return res.status(400).json({ success: false, err })
      res.status(200).json({ success: true, requires, allPage: allItem })
    })
  })
})

router.get('/requires_by_id', (req, res) => {

  let requireIds = req.query.id

  Require.find({ _id: requireIds })
    .exec((err, require) => {
      if (err) return res.status(400).send(err)

      return res.status(200).send({ success: true, require })
    })
})

router.post('/addComment', auth ,(req, res) =>{
  // 카트 올리듯 Product의 comment에 push
  // ㅇㅠ저 중복을 검사하기 위해서는 foreach로 유저 아이디를 전부 탐색하면 될 것 같다.
  Product.findOneAndUpdate(
    { _id: req.body.productId },
    {
      $push: {
        comment: {
          id: req.body.productId,
          comment : req.body.comment,
          star: req.body.star,
          chuchan: req.body.chuchan,
          delivery: req.body.delivery,
          date: Date.now()
        }
      }
    },
    { new: true },
    (err) => {
      if (err) return res.status(400).json({ success: false, err })
      else return res.status(200).json({ success: true })
    }
  )
  
})

router.post('/adminComment', (req, res) => {
  console.log(req.body.requireId)
  Require.findOneAndUpdate(
    { _id: req.body.requireId },
    {
      $push: {
        comment: {
          id: req.body.requireId,
          comment: req.body.comment,
          date: Date.now()
        }
      }
    },
    { new: true },
    (err) => {
      if (err) return res.status(400).json({ success: false, err })
      else return res.status(200).json({ success: true })
    }
  )

})

module.exports = router;
